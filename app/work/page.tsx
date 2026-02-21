"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { getPartners, Partner } from "@/lib/notion";
//components
import { LiquidButton } from "@/components/liquid-glass-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// icons
import playIcon from "@/public/icons/play-icon.svg";



function ProjectCard({ partner, index, className, variant }: {
    partner: Partner;
    index: number;
    className?: string;
    variant?: "large" | "small" | "wide";
}) {
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
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.1 }}
            className={`w-full h-full ${className || ""}`}
        >
            <Link href="#" className="w-full h-full block">
                <div
                    className="relative overflow-hidden rounded-[20px] border border-[#32323B]
                        bg-gradient-to-b from-transparent via-black/40 to-black/60
                        group cursor-pointer w-full h-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src={partner.mainVideo}
                        muted
                        loop
                        playsInline
                        className={`
                            absolute inset-0 w-full h-full object-cover
                            transition-transform duration-700 group-hover:scale-105
                            ${index % 2 === 0 ? 'origin-top-left' : 'origin-top-right'}
                        `}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {partner.year && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="text-[11px] text-white/60 tracking-[1.5px] font-light bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                                {partner.year}
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
                        {partner.category && (
                            <p className="text-[10px] md:text-[11px] tracking-[2px] uppercase text-white/50 mb-2 font-light">
                                {partner.category}
                            </p>
                        )}
                        <h3 className="font-serif text-white text-[22px] md:text-[32px] lg:text-[38px] leading-[1.05] font-light tracking-[-0.5px]">
                            {partner.name}
                        </h3>

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
        <>
            {/* ── Hero ── */}
            < section
                ref={heroRef}
                className="relative h-screen w-screen flex flex-col items-center justify-between text-center px-6 bg-gradient-to-b from-black to-[#0C0C0C]"
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
                        <span className="text-white/90 ml-20 lg:ml-32">Works</span>
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

                <div className="flex flex-col items-center gap-1.5 pb-0.5">
                    <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/60 to-white/10"></div>

                    {/* Glow line */}
                    <div className="relative w-[80vw] mt-2">
                        {/* Spreading light bloom above the line */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[40%] h-16 bg-white/10 blur-2xl rounded-full" />
                        {/* Wider softer bloom */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-white/5 blur-3xl rounded-full" />
                        {/* The sharp line */}
                        <div className="relative h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        {/* Glow under the line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-4 bg-white/15 blur-xl rounded-full" />
                    </div>
                </div>
            </ section>

            <main className="min-h-screen max-w-[1608px] mx-auto text-white selection:bg-white selection:text-black">
                {/* ── Projects Grid ── */}
                <section className="w-full mt-10 px-4 md:px-8 lg:px-12 pb-24">
                    <div className="max-w-[1200px] mx-auto space-y-6">
                        {Array.from({ length: Math.ceil(partners.length / 6) }).map((_, groupIndex) => {
                            const base = groupIndex * 6;
                            const c = (i: number) => partners[base + i];

                            return (
                                <div key={groupIndex} className="space-y-6">

                                    {/* Row 1: Large left (h-[620px]) + Small right (h-[480px], offset down) */}
                                    {c(0) && (
                                        <div className="flex flex-col lg:flex-row items-start gap-5">
                                            <div className="w-full h-[500px] lg:w-[55%] lg:h-[620px]">
                                                {c(0) && <ProjectCard partner={c(0)} index={base + 0} variant="large" />}
                                            </div>
                                            <div className="w-full h-[500px] lg:w-[45%] lg:h-[480px] lg:mt-[80px]">
                                                {c(1) && <ProjectCard partner={c(1)} index={base + 1} variant="small" />}
                                            </div>
                                        </div>
                                    )}

                                    {/* Row 2: 70% width, h-[500px], centered */}
                                    {c(2) && (
                                        <div className="w-full h-[500px] lg:w-[80%] lg:h-[676px] mx-auto">
                                            <ProjectCard partner={c(2)} index={base + 2} variant="wide" />
                                        </div>
                                    )}

                                    {/* Row 3: Small left (h-[480px]) + Large right (h-[620px], offset down) */}
                                    {c(3) && (
                                        <div className="flex flex-col lg:flex-row items-start gap-5">
                                            <div className="w-full h-[500px] lg:w-[45%] lg:h-[540px]">
                                                {c(3) && <ProjectCard partner={c(3)} index={base + 3} variant="small" />}
                                            </div>
                                            <div className="w-full h-[500px] lg:w-[55%] lg:h-[680px] lg:mt-[80px]">
                                                {c(4) && <ProjectCard partner={c(4)} index={base + 4} variant="large" />}
                                            </div>
                                        </div>
                                    )}

                                    {/* Row 4: 85% width, h-[500px], centered */}
                                    {c(5) && (
                                        <div className="w-full h-[500px] lg:w-[90%] lg:h-[676px] mx-auto">
                                            <ProjectCard partner={c(5)} index={base + 5} variant="wide" />
                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}