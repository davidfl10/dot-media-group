import type { MetadataRoute } from "next";
import { getPartners, toPartnerSlug } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dotmg.eu";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const partners = await getPartners();
    projectPages = partners.map((p) => ({
      url: `${baseUrl}/work/${toPartnerSlug(p.name)}`,
      lastModified: new Date(p.createdTime),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If Notion is unreachable, return static pages only
  }

  return [...staticPages, ...projectPages];
}
