import type { Metadata } from "next";
import { getPartnerBySlug, getPartners, toPartnerSlug } from "@/lib/notion";
import ProjectPageClient from "./ProjectPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: "Project Not Found",
    };
  }

  const description = partner.productDescription
    ? partner.productDescription.slice(0, 160)
    : `${partner.name} — a ${partner.category ?? "creative"} project by DOT Media Group.`;

  return {
    title: partner.name,
    description,
    openGraph: {
      title: `${partner.name} | DOT Media Group`,
      description,
      url: `https://dotmg.eu/work/${slug}`,
      type: "article",
      ...(partner.photos[0] && {
        images: [{ url: partner.photos[0], alt: partner.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${partner.name} | DOT Media Group`,
      description,
      ...(partner.photos[0] && {
        images: [partner.photos[0]],
      }),
    },
    alternates: {
      canonical: `https://dotmg.eu/work/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const partners = await getPartners();
    return partners.map((p) => ({ slug: toPartnerSlug(p.name) }));
  } catch {
    return [];
  }
}

export default function ProjectPage() {
  return <ProjectPageClient />;
}
