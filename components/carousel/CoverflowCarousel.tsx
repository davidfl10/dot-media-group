"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidButton } from "../liquid-glass-button";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
// icons
import playIcon from "@/public/icons/play-icon.svg";
import arrowRight from "@/public/icons/arrow-right.svg";
import backScrollArrow from "@/public/icons/back-scroll-arrow.svg";
import nextScrollArrow from "@/public/icons/next-scroll-arrow.svg";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type CoverflowItem = {
    videoSrc: string;
    title: string;
    alt?: string;
};

type CoverflowCarouselProps = {
    items: CoverflowItem[];
    className?: string;
    wrapperClassName?: string;
    initialSlide?: number;
};

export default function CoverflowCarousel({
    items,
    className = "",
    wrapperClassName = "",
    initialSlide = 2,
}: CoverflowCarouselProps) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(initialSlide);

    // The ONE real pagination div — starts in mobile slot, moved to desktop slot on lg+
    const paginationElRef = useRef<HTMLDivElement>(null);
    // Mobile row container (the immediate parent of paginationElRef on mount)
    const mobileSlotRef = useRef<HTMLDivElement>(null);
    // Desktop slot — empty div that receives the pagination el on lg+
    const desktopSlotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const paginationEl = paginationElRef.current;
        const desktopSlot = desktopSlotRef.current;
        const mobileSlot = mobileSlotRef.current;
        if (!paginationEl || !desktopSlot || !mobileSlot) return;

        const mq = window.matchMedia("(min-width: 1024px)");

        const relocate = (isDesktop: boolean) => {
            if (isDesktop) {
                if (paginationEl.parentElement !== desktopSlot) {
                    desktopSlot.appendChild(paginationEl);
                }
            } else {
                if (paginationEl.parentElement !== mobileSlot) {
                    mobileSlot.appendChild(paginationEl);
                }
            }
            // Re-render bullets in the new location
            if (swiperRef.current) {
                swiperRef.current.pagination.render();
                swiperRef.current.pagination.update();
            }
        };

        // Run immediately on mount
        relocate(mq.matches);

        const handler = (e: MediaQueryListEvent) => relocate(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <div
            className={[
                "w-full h-auto items-center justify-center overflow-x-hidden bg-black text-white",
                wrapperClassName,
            ].join(" ")}
        >
            <Swiper
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={[
                    "relative flex flex-col h-auto w-full items-center justify-center py-[50px]",
                    className,
                ].join(" ")}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                speed={600}
                initialSlide={initialSlide}
                breakpoints={{
                    640: { slidesPerView: "auto", effect: "coverflow", spaceBetween: 0 },
                }}
                coverflowEffect={{ rotate: 0, stretch: 80, depth: 350, modifier: 1, slideShadows: true }}
                pagination={{ el: paginationElRef.current, clickable: true }}
                navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Manually point pagination at the now-rendered DOM node and re-init
                    (swiper.params.pagination as { el: HTMLDivElement | null }).el = paginationElRef.current;
                    swiper.pagination.init();
                    swiper.pagination.render();
                    swiper.pagination.update();
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onClick={(swiper) => {
                    if (typeof swiper.clickedIndex === "number" && swiper.clickedIndex >= 0) {
                        swiper.slideTo(swiper.clickedIndex);
                    }
                }}
            >
                {items.map((item, idx) => (
                    <SwiperSlide key={idx} className="relative w-auto! h-fit flex items-center justify-center">
                        <div className="relative w-[85vw] max-w-[332px] lg:max-w-[820px] aspect-3/4 lg:aspect-video rounded-[20px] mx-auto border border-[#32323B] bg-gradient-to-b from-transparent via-black/41 to-black/48 overflow-hidden">
                            <video
                                ref={(el) => {
                                    if (el) {
                                        if (idx === activeIndex) el.play().catch(() => { });
                                        else el.pause();
                                    }
                                }}
                                src={item.videoSrc}
                                muted
                                loop
                                playsInline
                                className={`block w-full h-full select-none object-cover rounded-[20px] transition-all duration-300 ${idx === activeIndex ? "blur-0" : "blur-[6px]"
                                    }`}
                                draggable={false}
                            />
                            {idx === activeIndex && (
                                <div className="absolute left-1/2 -bottom-2.5 w-max -translate-x-1/2 -translate-y-[20%] flex flex-col items-center justify-center gap-5 mb-5">
                                    <span className="text-white text-[32px] leading-8 tracking-[-0.64px] font-fraunces text-center font-light">
                                        {item.title}
                                    </span>
                                    <Link href="#">
                                        <LiquidButton className="w-full lg:w-fit rounded-full px-4 py-3">
                                            <div className="w-full lg:w-fit flex flex-row items-center justify-center gap-3">
                                                <p className="tracking-[1.4px] text-sm text-white/90 hover:bg-white/10 transition">
                                                    VIEW PROJECT
                                                </p>
                                                <Image src={playIcon} alt="Play Icon" width={24} height={24} />
                                            </div>
                                        </LiquidButton>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/*
             * BOTH rows are always in the DOM — Tailwind CSS (not JS) toggles visibility.
             * This guarantees paginationElRef exists when Swiper initializes on any screen size.
             *
             * The pagination <div> starts in the MOBILE row (ref={paginationElRef}).
             * useEffect moves it into desktopSlotRef on lg+ screens, and back on resize.
             * Swiper re-renders bullets into its new location after each move.
             */}

            {/* ── MOBILE controls ── */}
            <div className="flex lg:hidden w-full flex-col items-center justify-center gap-5 px-4 mt-4">
                {/* mobileSlotRef wraps the nav row so we can re-append the pagination el back here */}
                <div ref={mobileSlotRef} className="flex items-center gap-3">
                    <button className="custom-prev w-fit h-fit p-4 flex items-center justify-center rounded-full border border-[#E2E8F02E] bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] text-white transition">
                        <Image src={backScrollArrow} alt="Back" width={24} height={24} />
                    </button>

                    {/* ✅ The one real pagination div — Swiper injects bullets here */}
                    <div ref={paginationElRef} />

                    <button className="custom-next w-fit h-fit p-4 flex items-center justify-center rounded-full border border-[#E2E8F02E] bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] text-white transition">
                        <Image src={nextScrollArrow} alt="Next" width={24} height={24} />
                    </button>
                </div>

                <span className="text-neutral-600 font-jakarta text-sm tracking-[2.8px]">
                    {String(activeIndex + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
                </span>

                <Link href="/work">
                    <button className="flex items-center gap-1 bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] rounded-full border border-[#E2E8F02E] px-3 py-2 text-neutral-400 transition">
                        <p className="font-jakarta text-xs font-normal uppercase tracking-[1.2px]">All projects</p>
                        <Image src={arrowRight} alt="Arrow" width={14} height={14} />
                    </button>
                </Link>
            </div>

            {/* ── DESKTOP controls ── */}
            <div className="hidden lg:flex w-full items-center justify-between px-20 mt-6">
                <Link href="/work">
                    <button className="flex items-center gap-1 bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] rounded-full border border-[#E2E8F02E] px-3 py-2 text-neutral-400 transition">
                        <p className="font-jakarta text-xs font-normal uppercase tracking-[1.2px]">All projects</p>
                        <Image src={arrowRight} alt="Arrow" width={14} height={14} />
                    </button>
                </Link>

                <div className="flex items-center gap-3">
                    <button className="custom-prev w-fit h-fit p-4 flex items-center justify-center rounded-full border border-[#E2E8F02E] bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] text-white transition">
                        <Image src={backScrollArrow} alt="Back" width={24} height={24} />
                    </button>

                    {/* ✅ Empty slot — useEffect moves paginationElRef here on lg+ */}
                    <div ref={desktopSlotRef} />

                    <button className="custom-next w-fit h-fit p-4 flex items-center justify-center rounded-full border border-[#E2E8F02E] bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] text-white transition">
                        <Image src={nextScrollArrow} alt="Next" width={24} height={24} />
                    </button>
                </div>

                <span className="text-neutral-600 font-jakarta text-sm tracking-[2.8px]">
                    {String(activeIndex + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
                </span>
            </div>

            <style jsx global>{`
                /* Pagination bullets */
                .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background-color: #ffffff33;
                    border-radius: 50%;
                    transition: all 0.3s ease-in-out;
                    opacity: 1;
                    display: inline-block;
                    cursor: pointer;
                }
                .swiper-pagination-bullet-active {
                    width: 32px;
                    background-color: white;
                    border-radius: 14px;
                }

                /* Keep the pagination container inline so bullets sit in a row */
                .swiper-pagination {
                    display: inline-flex !important;
                    align-items: center;
                    gap: 6px;
                    position: static !important;
                    width: auto !important;
                    bottom: auto !important;
                }

                /* Custom nav buttons */
                .custom-prev,
                .custom-next {
                    cursor: pointer;
                }
                .custom-prev.swiper-button-disabled,
                .custom-next.swiper-button-disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}