"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getPartners, toPartnerSlug, Partner } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import RelatedProjects from "@/components/RelatedProjects";
// icons
import ArrowBack from "@/public/icons/arrow-back.svg";

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

function EditorialBlock({
    label,
    heading,
    body,
    stacked = false,
}: {
    label?: string;
    heading?: React.ReactNode;
    body: string;
    stacked?: boolean;
}) {
    if (stacked) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
            >
                {label && (
                    <span className="text-sm tracking-[2px] uppercase text-[#EED5B2] font-jakarta font-normal">
                        {label}
                    </span>
                )}
                {heading && (
                    <h2 className="font-fraunces text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] tracking-[-1px]">
                        {heading}
                    </h2>
                )}
                {label === "Visual Identity" && (
                    <h2 className="font-fraunces text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] tracking-[-1px]">
                        Process &amp; Precision
                    </h2>
                )}
                <p className="text-white/50 font-jakarta font-light text-[16px] md:text-[18px] leading-relaxed">
                    {body}
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row gap-10 lg:gap-20"
        >
            <div className="lg:w-[38%] shrink-0">
                {heading ? (
                    <h2 className="font-fraunces text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] tracking-[-1px]">
                        {heading}
                    </h2>
                ) : (
                    <span className="text-sm tracking-[2px] uppercase text-[#EED5B2] font-jakarta font-normal">
                        {label}
                    </span>
                )}
                {label && label === "Visual Identity" && (
                    <h2 className="mt-2 font-fraunces text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] tracking-[-1px]">
                        Process &amp; Precision
                    </h2>
                )}
            </div>
            <div className="lg:w-[62%]">
                <p className="text-white/50 font-jakarta font-light text-[16px] md:text-[20px] leading-relaxed">
                    {body}
                </p>
            </div>
        </motion.div>
    );
}

function ClientVoiceBlock({
    quote,
    name,
    role,
    company,
    avatar,
}: {
    quote: string;
    name?: string;
    role?: string;
    company?: string;
    avatar?: string | null;
}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden py-28 md:py-36 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#000_70%)]"
        >
            {/* Decorative oversized quote marks */}
            <span
                aria-hidden
                className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-fraunces text-[280px] md:text-[380px] leading-none text-white opacity-[0.03]"
            >
                &ldquo;
            </span>

            <div className="relative z-10 flex flex-col items-center gap-10 px-6 md:px-12 lg:px-24 max-w-[900px] mx-auto text-center">

                {/* Label */}
                <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-0.5 flex-1 max-w-[60px] bg-white/20" />
                    <span className="text-sm tracking-[3px] uppercase text-[#EED5B2] font-jakarta font-light">
                        Client Voice
                    </span>
                    <div className="h-0.5 flex-1 max-w-[60px] bg-white/20" />
                </div>

                {/* Quote */}
                <blockquote className="font-fraunces text-[clamp(22px,3.2vw,38px)] font-light leading-[1.3] tracking-[-0.5px] text-white/90">
                    {quote}
                </blockquote>

                {/* Attribution */}
                {(name || avatar) && (
                    <div className="flex flex-col items-center gap-3">
                        {avatar && (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/15">
                                <Image src={avatar} alt={name ?? "Client"} fill className="object-cover" sizes="90px" />
                            </div>
                        )}
                        {name && (
                            <span className="font-fraunces text-white text-[20px] font-light">
                                {name}
                            </span>
                        )}
                        {(role || company) && (
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] tracking-[2px] uppercase text-white/50 font-jakarta font-light">
                                    {[role].join(" \u2022 ")}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <span className="text-[10px] tracking-[2px] uppercase text-white/30 font-jakarta font-light">
                                    {company}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.section>
    );
}

function CreativeDirectorBlock({
    quote,
    backgroundPhoto,
}: {
    quote: string;
    backgroundPhoto?: string | null;
}) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden h-[60vh] flex items-center justify-center"
        >
            {/* Background photo */}
            {backgroundPhoto && (
                <Image
                    src={backgroundPhoto}
                    alt="Creative Director"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
            )}

            {/* Dark scrim */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 px-6 md:px-16 lg:px-16 max-w-[1200px] mx-auto text-center">
                <blockquote className="font-fraunces italic text-[clamp(20px,3vw,56px)] font-light leading-[1.4] tracking-[-0.3px] text-white">
                    &ldquo;{quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-2">
                    <span className="text-xs tracking-[2.5px] uppercase text-white/50 font-jakarta font-light">
                        Creative Director
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-xs tracking-[2.5px] uppercase text-white/30 font-jakarta font-light">
                        Dot Media Group
                    </span>
                </div>
            </div>
        </motion.section>
    );
}

/* ── page ── */
export default function ProjectPage() {
    const params = useParams<{ slug: string }>();
    const [partner, setPartner] = useState<Partner | null | undefined>(undefined);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

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
            <div className="bg-black text-white min-h-screen flex flex-col items-center selection:bg-white selection:text-black">
                <div className="flex justify-center pt-6 px-6">
                    <Navbar />
                </div>
                <div className="mt-[30%] md:mt-10 flex flex-col items-center justify-center gap-6 text-center px-6">
                    <span className="text-white/30 font-jakarta text-[10px] tracking-[2px] uppercase">404</span>
                    <h1 className="font-fraunces text-[clamp(36px,6vw,72px)] font-light tracking-[-1.5px] leading-[0.95]">
                        Project not found
                    </h1>
                    <p className="text-white/40 font-jakarta text-sm font-light max-w-[320px] leading-relaxed">
                        This project doesn&apos;t exist or may have been removed.
                    </p>
                    <Link
                        href="/work"
                        className="mt-2"
                    >
                        <button className="flex items-center justify-center p-3 gap-2 border rounded-full border-white/15 bg-black/25 cursor-pointer hover:bg-white/10 transition-colors duration-200">
                            <Image src={ArrowBack} alt="Back" width={14} height={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                            <p className="text-white/50 text-xs tracking-[1.5px] uppercase font-jakarta font-light">All projects</p>
                        </button>
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
        { label: "Client", value: partner.name },
        { label: "Services", value: partner.service },
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
                        className="mt-2"
                    >
                        <button className="flex items-center justify-center p-3 gap-2 border rounded-full border-white/15 bg-black/25 cursor-pointer hover:bg-black/90 transition-colors duration-200">
                            <Image src={ArrowBack} alt="Back" width={14} height={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                            <p className="text-white/50 text-xs tracking-[1.5px] uppercase font-jakarta font-light">All projects</p>
                        </button>
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
                    className="px-6 md:px-10 lg:px-14 py-8 md:py-10"
                >
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0 ">
                        {stats.map((s, i) => (
                            <div key={i} className={i > 0 ? "md:pl-8 lg:pl-12" : ""}>
                                <StatCol label={s.label} value={s.value} />
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ──────────────────────────────────────────── EDITORIAL ── */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28 space-y-20 md:space-y-28">

                {/* First Part */}
                <div className="flex flex-col gap-20 md:gap-28">
                    {/* Product Description */}
                    {partner.productDescription && (
                        <EditorialBlock
                            heading={<>Defining the <em className="font-fraunces-italic not-italic">{partner.product}.</em></>}
                            body={partner.productDescription}
                        />
                    )}

                    {isMobile ? (
                        <>
                            <motion.div
                                key={0}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 h-[300px] md:h-[520px] lg:h-[820px]"
                            >
                                <Image
                                    src={partner.photos[0]}
                                    alt={`${partner.name} — photo ${1}`}
                                    fill
                                    className="object-cover object-center"
                                    sizes="100vw"
                                />
                            </motion.div>
                            <EditorialBlock label="The Challenge" body={partner.challenge ? partner.challenge : ""} />
                        </>
                    ) : (
                        <>
                            <EditorialBlock label="The Challenge" body={partner.challenge ? partner.challenge : ""} />
                            <motion.div
                                key={0}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 h-[300px] md:h-[520px] lg:h-[720px]"
                            >
                                <Image
                                    src={partner.photos[0]}
                                    alt={`${partner.name} — photo ${1}`}
                                    fill
                                    className="object-cover object-center"
                                    sizes="100vw"
                                />
                            </motion.div>
                        </>
                    )}
                </div>

            </section>

            {/* ────────────────────────── VISUAL IDENTITY — full-bleed image + text ── */}
            {partner.photos[1] && (
                <div className="flex flex-col lg:flex-row w-screen lg:p-20 md:py-28">
                    {/* Image bleeds from the left edge up to ~58vw on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:w-[40vw] lg:shrink-0 lg:rounded-xl h-[280px] md:h-[420px] lg:h-[740px]"
                    >
                        <Image
                            src={partner.photos[1]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                    </motion.div>

                    {/* Text — centred vertically, padded on both sides */}
                    {partner.visualIdentity && (
                        <div className="flex items-center px-6 md:px-10 lg:px-20 xl:px-20 py-10 lg:py-0 lg:w-[45vw]">
                            <EditorialBlock label="Visual Identity" body={partner.visualIdentity} stacked />
                        </div>
                    )}
                </div>
            )}

            {/* ────────────────────────── 2 photos */}
            {partner.photos[2] && partner.photos[3] && (
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 justify-center mb-10 w-screen lg:p-20 md:py-28">
                    {/* Image bleeds from the left edge up to ~58vw on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:w-[35vw] lg:shrink-0 lg:rounded-xl h-[280px] md:h-[420px] lg:h-[700px]"
                    >
                        <Image
                            src={partner.photos[2]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 35vw"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:mt-[7%] lg:w-[35vw] lg:shrink-0 lg:rounded-xl h-[280px] md:h-[420px] lg:h-[700px]"
                    >
                        <Image
                            src={partner.photos[3]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 35vw"
                        />
                    </motion.div>
                </div>
            )}

            {/* Approach Part ___________ text + video */}
            <div className="w-screen flex flex-col gap-20 md:gap-28">
                {/* Our Approach */}
                {partner.ourApproach && (
                    <div className="lg:w-[50%] w-[90%] mx-auto">
                        <EditorialBlock heading="Our Approach" body={partner.ourApproach} stacked />
                    </div>
                )}


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`overflow-hidden`}
                >
                    <video
                        src={partner.additionalVideos.length > 0 ? partner.additionalVideos[0] : partner.mainVideo ?? undefined}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-60 md:h-[420px] lg:h-[720px] object-cover object-center"
                    />
                </motion.div>


            </div>


            {/* Client Voice */}
            {partner.clientVoice && (
                <ClientVoiceBlock
                    quote={partner.clientVoice}
                    name={partner.clientVoiceName}
                    role={partner.clientVoiceRole}
                    company={partner.name}
                    avatar={partner.clientVoiceAvatar}
                />
            )}

            {/* ────────────────────────── 3 photos */}
            {partner.photos[4] && partner.photos[5] && partner.photos[6] && (
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 justify-center mb-10 w-screen lg:p-10 md:py-28">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:w-[28vw] lg:shrink-0 h-[250px] md:h-[380px] lg:h-[530px]"
                    >
                        <Image
                            src={partner.photos[4]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 28vw"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:mt-[7%] lg:w-[28vw] lg:shrink-0 h-[250px] md:h-[380px] lg:h-[530px]"
                    >
                        <Image
                            src={partner.photos[5]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 28vw"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:w-[28vw] lg:shrink-0 h-[250px] md:h-[380px] lg:h-[530px]"
                    >
                        <Image
                            src={partner.photos[6]}
                            alt={`${partner.name} — visual identity`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 28vw"
                        />
                    </motion.div>
                </div>
            )}

            {/* Creative Director Words */}
            {partner.creativeDirectorWords && (
                <CreativeDirectorBlock
                    quote={partner.creativeDirectorWords}
                    backgroundPhoto={partner.photos[0] ?? null}
                />
            )}

            {/* ────────────────── video + overlapping text card ── */}
            {partner.additionalVideos[1] && partner.ourApproach && (
                <div className="relative flex flex-col lg:block mb-30 py-10 lg:py-20">
                    {/* Video — padded from left on desktop, full-width on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative overflow-hidden w-full lg:w-[60%] lg:ml-14 h-[260px] md:h-[480px] lg:h-[760px]"
                    >
                        <video
                            src={partner.additionalVideos[1]}
                            muted
                            loop
                            playsInline
                            autoPlay
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>

                    {/* Text card — below on mobile, overlapping right on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="p-3 absolute max-lg:-bottom-20 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-18 lg:top-1/2 lg:-translate-y-1/2 lg:w-[38%] lg:p-10 w-[80%] mx-auto bg-[#111]/90 backdrop-blur-sm rounded-xl "
                    >
                        <p className="font-jakarta text-[clamp(14px,1.5vw,18px)] leading-[1.6] text-white/80">
                            {partner.ourApproach}
                        </p>
                    </motion.div>
                </div>
            )}

            {/* ──────────────────────────────── 2×2 staggered photo grid ── */}
            {partner.photos[7] && partner.photos[8] && (
                <div className="grid grid-cols-2 gap-1 lg:gap-8 md:p-10 lg:p-20 w-screen h-fit mb-20">
                    {/* Left column */}
                    <div className="flex flex-col gap-1 lg:gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden h-[200px] md:h-[360px] lg:h-[555px]"
                        >
                            <Image src={partner.photos[7]} alt={`${partner.name} — photo 8`} fill className="object-cover object-center" />
                        </motion.div>
                        {partner.photos[9] && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden h-[200px] md:h-[360px] lg:h-[555px]"
                            >
                                <Image src={partner.photos[9]} alt={`${partner.name} — photo 10`} fill className="object-cover object-center" />
                            </motion.div>
                        )}
                    </div>

                    {/* Right column — offset downward on desktop */}
                    <div className="flex flex-col gap-1 lg:gap-8 lg:mt-[5%]">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden h-[200px] md:h-[360px] lg:h-[555px]"
                        >
                            <Image src={partner.photos[8]} alt={`${partner.name} — photo 9`} fill className="object-cover object-center" />
                        </motion.div>
                        {partner.photos[10] && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden h-[200px] md:h-[360px] lg:h-[555px]"
                            >
                                <Image src={partner.photos[10]} alt={`${partner.name} — photo 11`} fill className="object-cover object-center" />
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            <RelatedProjects
                title="Explore more"
                subtitle="Other Projects"
                domain="Digital marketing"
                excludeSlug={params.slug}
            />


            {/* ──────────────────────────────────────────── FOOTER ── */}
            <div className="flex justify-center w-full">
                <Footer />
            </div>
        </div>
    );
}
