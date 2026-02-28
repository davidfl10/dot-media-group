"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getPartners, toPartnerSlug, Partner } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

/* ── helpers ── */
function StatCol({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-[10px] tracking-[2px] uppercase text-white/30 font-light font-jakarta">
                {label}
            </span>
            <span className="text-sm md:text-base text-white/80 font-light font-jakarta leading-snug">
                {value}
            </span>
        </div>
    );
}

/* ── page ── */
export default function ProjectPage() {
    const params = useParams<{ slug: string }>();
    const [partner, setPartner] = useState<Partner | null | undefined>(undefined);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        getPartners().then((all) => {
            const found = all.find((p) => toPartnerSlug(p.name) === params.slug) ?? null;
            setPartner(found);
        });
    }, [params.slug]);

    useEffect(() => {
        if (partner && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [partner]);

    if (partner === undefined) {
        // Loading state
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-px h-16 bg-linear-to-b from-white/0 via-white/40 to-white/0 animate-pulse" />
            </div>
        );
    }

    if (partner === null) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center selection:bg-white selection:text-black">
                <div className="flex justify-center pt-6 px-6">
                    <Navbar />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
                    <span className="text-white/30 font-jakarta text-[10px] tracking-[2px] uppercase">404</span>
                    <h1 className="font-fraunces text-[clamp(36px,6vw,72px)] font-light tracking-[-1.5px] leading-[0.95]">
                        Project not found
                    </h1>
                    <p className="text-white/40 font-jakarta text-sm font-light max-w-[320px] leading-relaxed">
                        This project doesn&apos;t exist or may have been removed.
                    </p>
                    <Link
                        href="/work"
                        className="mt-2 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-xs tracking-[1.5px] uppercase font-jakarta font-light group"
                    >
                        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
                        Back to Works
                    </Link>
                </div>
                <div className="flex justify-center w-full">
                    <Footer />
                </div>
            </div>
        );
    }

    const stats = [
        { label: "Budget", value: partner.budget },
        { label: "Duration", value: partner.duration },
        { label: "Client", value: partner.client || partner.name },
        { label: "Services", value: partner.category },
    ].filter((s) => s.value);

    return (
        <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">

            {/* ──────────────────────────────────────────── HERO ── */}
            <section className="relative h-screen w-full overflow-hidden flex flex-col">
                {/* Video background */}
                {partner.mainVideo && (
                    <video
                        ref={videoRef}
                        src={partner.mainVideo}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Scrim */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/50" />

                {/* ── Top bar ── */}
                {/* Navbar centered — hidden on mobile since StaggeredMenu is fixed */}
                <div className="relative z-20 flex justify-center pt-6 px-6">
                    <Navbar />
                </div>

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative mt-[15%] lg:mt-0 z-20 px-6 md:px-10 lg:px-14 pt-4 md:pt-3"
                >
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-xs tracking-[1.5px] uppercase font-jakarta font-light group"
                    >
                        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
                        All Works
                    </Link>
                </motion.div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* ── Bottom content ── */}
                <div className="relative z-10 px-6 md:px-10 lg:px-14 pb-4">
                    {/* Category + year */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        {partner.category && (
                            <span className="text-[10px] tracking-[2px] uppercase text-white/50 font-jakarta font-light bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                {partner.category}
                            </span>
                        )}
                        {partner.year && (
                            <span className="text-[10px] tracking-[2px] uppercase text-white/50 font-jakarta font-light bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                {partner.year}
                            </span>
                        )}
                    </motion.div>

                    {/* Project name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="font-fraunces text-[clamp(42px,8vw,96px)] leading-[0.92] font-light tracking-[-2px] text-white"
                    >
                        {partner.name}
                    </motion.h1>
                </div>

                {/* Scroll indicator — centered */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative z-10 flex flex-col items-center gap-1.5 pb-8"
                >
                    <span className="text-white/40 font-jakarta text-[10px] font-light uppercase tracking-[1.5px]">Scroll</span>
                    <div className="w-px h-6 bg-linear-to-b from-white/50 to-white/10" />
                </motion.div>
            </section>

            {/* ──────────────────────────────────────────── STATS ── */}
            {stats.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-b border-[#1F1F27] px-6 md:px-10 lg:px-14 py-8 md:py-10"
                >
                    <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x md:divide-[#1F1F27]">
                        {stats.map((s, i) => (
                            <div key={i} className={i > 0 ? "md:pl-8 lg:pl-12" : ""}>
                                <StatCol label={s.label} value={s.value} />
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ──────────────────────────────────────────── EDITORIAL ── */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">

                {/* Description block */}
                {partner.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-20 md:mb-28"
                    >
                        <div className="lg:w-[38%] shrink-0">
                            <h2 className="font-fraunces text-[clamp(28px,4vw,48px)] font-light leading-[1.05] tracking-[-1px]">
                                Defining the{" "}
                                <em className="font-fraunces-italic not-italic">{partner.name}.</em>
                            </h2>
                        </div>
                        <div className="lg:w-[62%]">
                            <p className="text-white/50 font-jakarta font-light text-[14px] md:text-[15px] leading-relaxed">
                                {partner.description}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Challenge block */}
                {partner.challenge && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col lg:flex-row gap-10 lg:gap-20 border-t border-[#1F1F27] pt-16"
                    >
                        <div className="lg:w-[38%] shrink-0">
                            <span className="text-[10px] tracking-[2px] uppercase text-white/30 font-jakarta font-light">
                                The Challenge
                            </span>
                        </div>
                        <div className="lg:w-[62%]">
                            <p className="text-white/50 font-jakarta font-light text-[14px] md:text-[15px] leading-relaxed">
                                {partner.challenge}
                            </p>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* ──────────────────────────────────────────── PHOTOS ── */}
            {partner.photos.length > 0 && (
                <section className="px-6 md:px-10 lg:px-14 pb-20">
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                        {partner.photos.map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative overflow-hidden rounded-2xl bg-[#111] h-[300px] md:h-[480px] ${i === 0 && partner.photos.length % 2 !== 0 ? "md:col-span-2" : ""}`}
                            >
                                <Image
                                    src={src}
                                    alt={`${partner.name} — photo ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ──────────────────────────────────────────── ADDITIONAL VIDEOS ── */}
            {partner.additionalVideos.length > 0 && (
                <section className="px-6 md:px-10 lg:px-14 pb-20">
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                        {partner.additionalVideos.map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className={`overflow-hidden rounded-2xl bg-[#111] ${i === 0 && partner.additionalVideos.length % 2 !== 0 ? "md:col-span-2" : ""}`}
                            >
                                <video
                                    src={src}
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                    className="w-full h-[300px] md:h-[480px] object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ──────────────────────────────────────────── FOOTER ── */}
            <div className="flex justify-center w-full">
                <Footer />
            </div>
        </div>
    );
}
