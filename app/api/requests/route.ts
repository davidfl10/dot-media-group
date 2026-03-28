import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_SECRET!;
const DATABASE_ID = process.env.NOTION_REQUESTS_DATABASE_ID!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://dotmg.eu",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const EMAIL_REGEX = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RequestPayload = {
  solution: string;
  service: string;
  package: string;
  details: string;
  email: string;
};

type RateLimitBucket = {
  count: number;
  windowStart: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __requestsRateLimitStore?: Map<string, RateLimitBucket>;
};

const rateLimitStore =
  globalForRateLimit.__requestsRateLimitStore ?? new Map<string, RateLimitBucket>();

if (!globalForRateLimit.__requestsRateLimitStore) {
  globalForRateLimit.__requestsRateLimitStore = rateLimitStore;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ipFromForwarded = forwarded?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ip = ipFromForwarded || realIp || "unknown-ip";
  return ip;
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < 200) return;

  for (const [key, bucket] of rateLimitStore.entries()) {
    if (now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(clientKey: string): RateLimitResult {
  const now = Date.now();
  cleanupRateLimitStore(now);

  const existing = rateLimitStore.get(clientKey);

  if (!existing || now - existing.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientKey, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000)
    );

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  rateLimitStore.set(clientKey, existing);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - existing.count,
    retryAfterSeconds: 0,
  };
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function richText(content: string) {
  if (!content) return [];
  return [{ text: { content: content.slice(0, 2000) } }];
}

function buildNotionProperties(payload: RequestPayload) {
  return {
    Domain: {
      rich_text: richText(payload.solution),
    },
    Service: {
      rich_text: richText(payload.service),
    },
    Package: {
      rich_text: richText(payload.package),
    },
    Email: {
      title: [{ text: { content: payload.email.slice(0, 2000) } }],
    },
    Comments: {
      rich_text: richText(payload.details),
    },
  };
}

async function createPage(payload: RequestPayload) {
  return fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties: buildNotionProperties(payload),
    }),
  });
}

export async function POST(request: Request) {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json(
      { error: "NOTION_SECRET or NOTION_REQUESTS_DATABASE_ID is not set in .env" },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          ...CORS_HEADERS,
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Window": String(Math.floor(RATE_LIMIT_WINDOW_MS / 1000)),
        },
      }
    );
  }

  let body: Partial<RequestPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const payload: RequestPayload = {
    solution: asText(body.solution),
    service: asText(body.service),
    package: asText(body.package),
    details: asText(body.details),
    email: asText(body.email),
  };

  if (!payload.solution || !payload.service || !payload.package || !payload.email) {
    return NextResponse.json(
      { error: "Missing required fields: solution, service, package, email" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const notionRes = await createPage(payload);

  if (!notionRes.ok) {
    let err: unknown = null;
    try {
      err = await notionRes.json();
    } catch {
      err = { message: "Failed to create request in Notion" };
    }

    const errorPayload =
      typeof err === "object" && err !== null
        ? err
        : { message: "Failed to create request in Notion" };

    return NextResponse.json({ error: errorPayload }, { status: notionRes.status, headers: CORS_HEADERS });
  }

  const created = await notionRes.json();

  return NextResponse.json(
    { ok: true, id: created.id },
    {
      status: 201,
      headers: {
        ...CORS_HEADERS,
        "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Window": String(Math.floor(RATE_LIMIT_WINDOW_MS / 1000)),
      },
    }
  );
}
