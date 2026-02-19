/**
 * lib/notion.ts
 *
 * Client-facing data fetching helpers.
 * Call these from Server Components (pages, layouts) to get Notion data.
 */

export interface Partner {
  id: string;
  createdTime: string;
  name: string;
  logo: string | null;
  mainVideo: string | null;
  photos: string[];
  additionalVideos: string[];
  category?: string;
  year?: string;
  budget?: string;
  duration?: string;
  [key: string]: any;
}

export async function getPartners(): Promise<Partner[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/partners`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Failed to fetch partners: ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  return data.partners as Partner[];
}