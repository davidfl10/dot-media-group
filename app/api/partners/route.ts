/**
 * app/api/partners/route.ts
 *
 * Fetches all partner records from the Notion Partners database.
 *
 * Internal integration auth (per Notion docs): just send the integration
 * secret as "Authorization: Bearer <token>" on every request. No OAuth,
 * no redirects, no token refresh — the secret never expires.
 *
 * Make sure the Partners database has been shared with your integration
 * inside Notion (••• → Connections → Add a connection).
 */

import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_SECRET!;
const DATABASE_ID  = process.env.NOTION_PARTNERS_DATABASE_ID!;

function extractFileUrls(files: any[]): string[] {
  if (!Array.isArray(files)) return [];
  return files
    .map((f) => (f.type === "external" ? f.external?.url : f.file?.url))
    .filter(Boolean);
}

function extractText(richText: any[]): string {
  if (!Array.isArray(richText)) return "";
  return richText.map((t) => t.plain_text).join("");
}

export async function GET() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json(
      { error: "NOTION_SECRET or NOTION_PARTNERS_DATABASE_ID is not set in .env" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [{ timestamp: "created_time", direction: "ascending" }],
      }),
      next: { revalidate: 60 }, // ISR — re-fetch at most every 60 s
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();

  const partners = data.results.map((page: any) => {
    const props = page.properties;

    // "Text" field holds a JSON string — parse it to get budget, duration, etc.
    let textData: Record<string, any> = {};
    const rawText = extractText(props.Text?.rich_text ?? []);
    if (rawText) {
      try { textData = JSON.parse(rawText); }
      catch { textData = { raw: rawText }; }
    }

    return {
      id:               page.id,
      createdTime:      page.created_time,
      name:             extractText(props.Name?.title ?? []),
      logo:             extractFileUrls(props.Logo?.files ?? [])[0] ?? null,
      mainVideo:        extractFileUrls(props.Main_Video?.files ?? [])[0] ?? null,
      photos:           extractFileUrls(props.Photos?.files ?? []),
      additionalVideos: extractFileUrls(props.Additional_videos?.files ?? []),
      category:         extractText(props.Category?.rich_text ?? []),
      year:             extractText(props.Year?.rich_text ?? []),
      budget:                  textData.budget   ?? extractText(props.Budget?.rich_text   ?? []),
      duration:                 textData.duration  ?? extractText(props.Duration?.rich_text  ?? []),
      product:                  extractText(props.Product?.rich_text               ?? []),
      productDescription:       extractText(props.Product_Description?.rich_text   ?? []),
      challenge:                extractText(props.Challenge?.rich_text             ?? []),
      visualIdentity:           extractText(props.Visual_Identity?.rich_text       ?? []),
      ourApproach:              extractText(props.Our_Approach?.rich_text          ?? []),
      clientVoice:              extractText(props.Client_Voice?.rich_text             ?? []),
      clientVoiceName:          extractText(props.Client_Voice_Name?.rich_text        ?? []),
      clientVoiceRole:          extractText(props.Client_Voice_Role?.rich_text        ?? []),
      clientVoiceAvatar:        extractFileUrls(props.Client_Voice_Avatar?.files      ?? [])[0] ?? null,
      creativeDirectorWords:    extractText(props.Creative_Director_Words?.rich_text  ?? []),
    };
  });

  return NextResponse.json({ partners });
}