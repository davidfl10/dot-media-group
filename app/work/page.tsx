"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { LiquidButton } from "@/components/liquid-glass-button";
import playIcon from "@/public/icons/play-icon.svg";
import { getPartners, Partner } from "@/lib/notion";
import Navbar from "@/components/Navbar";

// ─── Single Project Card ──────────────────────────────────────────────────────

function ProjectCard({ partner, index }: { partner: Partner; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    const handleMouseEnter = () => {
        setHovered(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    if (!partner.mainVideo) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className="col-span-1 w-auto! h-fit"
        >
            <Link href="#">
                <div
                    className={`
            relative overflow-hidden rounded-[20px] border border-[#32323B]
            bg-gradient-to-b from-transparent via-black/40 to-black/60
            group cursor-pointer
            aspect-[3/4] md:aspect-[4/5] w-full}
          `}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={partner.mainVideo}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Year badge */}
                    {partner.year && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="text-[11px] text-white/60 tracking-[1.5px] font-light bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                                {partner.year}
                            </span>
                        </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
                        {partner.category && (
                            <p className="text-[10px] md:text-[11px] tracking-[2px] uppercase text-white/50 mb-2 font-light">
                                {partner.category}
                            </p>
                        )}
                        <h3 className="font-serif text-white text-[28px] md:text-[38px] leading-[1.05] font-light tracking-[-0.5px]">
                            {partner.name}
                        </h3>

                        {/* View Project — appears on hover */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="mt-4"
                        >
                            <LiquidButton className="w-full lg:w-fit rounded-full px-4 py-3">
                                <div className="w-full lg:w-fit flex flex-row items-center justify-center gap-3">
                                    <p className="tracking-[1.4px] text-sm text-white/90 hover:bg-white/10 transition">
                                        VIEW PROJECT
                                    </p>
                                    <Image src={playIcon} alt="Play Icon" width={24} height={24} />
                                </div>
                            </LiquidButton>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Work() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    useEffect(() => {
        getPartners().then((partners) => {
        const updatedPartners = partners.map((p) => ({ ...p, mainVideo: p.mainVideo || "/partners/brutariabardar/video1.mp4" }));
        setPartners(updatedPartners);
    });
    }, []);

    return (
        <main className="min-h-screen max-w-[1608px] mx-auto text-white selection:bg-white selection:text-black">

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="relative h-screen flex flex-col items-center justify-between text-center px-6"
            >
                <div className='mt-6 h-[10%]'>
                    <Navbar />
                </div>

                <div className="h-[85%] flex flex-col items-center justify-center gap-6 max-w-[800px]">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="font-fraunces text-[clamp(52px,10vw,110px)] leading-[0.92] font-light tracking-[-2px] mb-8"
                    >
                        <span className="font-fraunces-italic text-white">Selected</span>
                        <br />
                        <span className="text-white/90 ml-12">Works</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="font-jakarta max-w-[460px] text-[13px] md:text-[14px] text-white/40 leading-relaxed font-light"
                    >
                        Explore our curated collection of innovative media projects and creative
                        solutions. Each piece represents a unique blend of technology,
                        storytelling, and visual artistry, crafted to push boundaries and
                        deliver exceptional results.
                    </motion.p>
                </div>

                <div className="flex flex-col w-14 h-16 pb-1.5 items-center gap-1.5">
                    <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/60 to-white/10"></div>
                </div>
            </section>

            {/* ── Projects Grid ── */}
            <section className="min-h-screen w-full mt-10 px-4 md:px-8 lg:px-12 pb-24">
                <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1200px] mx-auto">
                    {partners.map((partner, index) => (
                        <ProjectCard key={partner.id} partner={partner} index={index} />
                    ))}
                </div>
            </section>

        </main>
    );
}