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
  product?: string;
  productDescription?: string;
  challenge?: string;
  visualIdentity?: string;
  ourApproach?: string;
  clientVoice?: string;
  clientVoiceName?: string;
  clientVoiceRole?: string;
  clientVoiceAvatar?: string | null;
  creativeDirectorWords?: string;
  [key: string]: any;
}

export function toPartnerSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const partners = await getPartners();
  return partners.find((p) => toPartnerSlug(p.name) === slug) ?? null;
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