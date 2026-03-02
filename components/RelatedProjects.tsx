"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Partner } from "@/lib/notion";
import { toPartnerSlug } from "@/lib/notion";
import useWindowWidth from "@/lib/useWindowWidth";
// icons
import ArrowRight from "@/public/icons/arrow-right.svg";

import "swiper/css";
import "swiper/css/free-mode";

interface RelatedProjectsProps {
  /** Small label above the heading (e.g. "Related Work", "Explore More") */
  title: string;
  /** Heading text (e.g. "Completed Projects", "Other Projects") */
  subtitle: string;
  /** Filter partners whose `category` matches this domain */
  domain: string;
  /** Optional further filter by `service` field */
  service?: string;
  /** Background colour / gradient for the section */
  background?: string;
  /** Slug of the current project to exclude from the list */
  excludeSlug?: string;
}

export default function RelatedProjects({
  title,
  subtitle,
  domain,
  service,
  background = "transparent",
  excludeSlug,
}: RelatedProjectsProps) {
  const [projects, setProjects] = useState<Partner[]>([]);
  const width = useWindowWidth();
  const isMobile = !width || width < 768;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/partners");
        if (!res.ok) return;
        const data = await res.json();
        const all: Partner[] = data.partners ?? [];

        const filtered = all.filter((p) => {
          // Domain filter (case-insensitive includes)
          const matchesDomain =
            !domain ||
            (p.category ?? "").toLowerCase().includes(domain.toLowerCase());

          // Optional service filter
          const matchesService =
            !service ||
            (p.service ?? "").toLowerCase().includes(service.toLowerCase());

          // Exclude current project
          const notSelf = !excludeSlug || toPartnerSlug(p.name) !== excludeSlug;

          return matchesDomain && matchesService && notSelf && p.photos.length > 0;
        });

        setProjects(filtered);
      } catch {
        /* silently fail */
      }
    }
    load();
  }, [domain, service, excludeSlug]);

  if (projects.length === 0) return null;

  return (
    <section
      className="w-full py-16 lg:py-24"
      style={{ background }}
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="block text-white/40 font-jakarta text-[14px] tracking-[2px] uppercase mb-2">
              {title}
            </span>
            <h2 className="text-white font-fraunces text-[24px] lg:text-[48px] font-normal leading-tight">
              {subtitle}
            </h2>
          </div>

          <Link
            href="/work"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/70 font-jakarta text-xs tracking-[1.5px] uppercase hover:bg-white/5 transition-colors no-underline"
          >
            View all work
            <Image src={ArrowRight} alt="Arrow right" width={14} height={14} />
          </Link>
        </div>

        {/* Cards Swiper */}
        <Swiper
          modules={[FreeMode]}
          freeMode={!isMobile}
          centeredSlides={false}
          slidesPerView="auto"
          spaceBetween={isMobile ? 12 : 20}
          className="w-full"
        >
          {projects.map((p) => (
            <SwiperSlide key={p.id} style={{ width: "auto" }}>
              <Link
                href={`/work/${toPartnerSlug(p.name)}`}
                className="group block no-underline"
              >
                <div className="relative w-[200px] md:w-[300px] lg:w-[500px] aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.photos[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 200px, 500px"
                  />
                  {/* Subtle bottom gradient for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="mt-3">
                  {p.category && (
                    <span className="block text-white/30 font-jakarta text-[12px] tracking-[1.5px] uppercase mb-1">
                      {p.category}
                    </span>
                  )}
                  <span className="block text-white font-fraunces text-[20px] lg:text-[32px] font-normal">
                    {p.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile CTA */}
        <div className="lg:hidden flex w-full mt-8">
          <Link
            href="/work"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/70 font-jakarta text-xs tracking-[1.5px] uppercase hover:bg-white/5 transition-colors no-underline"
          >
            View all work
            <Image src={ArrowRight} alt="Arrow right" width={14} height={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
