"use client";

import React, { useRef, useState } from "react";
import useWindowWidth from "@/lib/useWindowWidth";
import Image from "next/image";
import Link from "next/link";
import { LiquidButton } from "../liquid-glass-button";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
// icons
import playIcon from "@/public/icons/play-icon.svg";
import arrowRight from "@/public/icons/arrow-right.svg";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type CoverflowItem = {
    imageSrc: React.ComponentProps<typeof Image>["src"];
    title: string;
    alt?: string;
};

type CoverflowCarouselProps = {
    items: CoverflowItem[];
    /** matches your .swiper width/padding behavior */
    className?: string;
    /** optional wrapper (centered like body in your HTML/CSS) */
    wrapperClassName?: string;
    /** initial slide index (default 2 as in your script.js) */
    initialSlide?: number;
};

export default function CoverflowCarousel({
    items,
    className = "",
    wrapperClassName = "",
    initialSlide = 2
}: CoverflowCarouselProps) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(initialSlide);

    const imgWidth = 300;

    return (
        <div
            className={[
                // matches body: center + black bg + white text + hidden overflow
                "min-h-[70%] w-full items-center justify-center overflow-x-hidden bg-black text-white",
                wrapperClassName
            ].join(" ")}
        >
            <Swiper
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={["relative flex flex-col h-full w-full items-center justify-center py-[50px] ", className].join(" ")}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                speed={600}
                initialSlide={initialSlide}
                breakpoints={{
                    640: {
                        slidesPerView: "auto",
                        effect: "coverflow",
                        spaceBetween: 0
                    }
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                // same behavior: click a slide -> focus it
                onClick={(swiper) => {
                    if (typeof swiper.clickedIndex === "number" && swiper.clickedIndex >= 0) {
                        swiper.slideTo(swiper.clickedIndex);
                    }
                }}
                // pagination positioning handled by absolute div below
                style={{} as React.CSSProperties}
            >
                {items.map((item, idx) => (
                    <SwiperSlide key={idx} className="relative w-auto! h-fit lg:h-[80%] flex items-center justify-center">
                        {/* slide shell: width 320px, aspect 3/4, radius 14, border 1px yellow */}
                        <div className="relative w-[85vw] max-w-[332px] lg:max-w-[820px] lg:max-h-[560px] aspect-3/4 lg:aspect-auto rounded-[20px] mx-auto border border-[#32323B] bg-gradient-to-b from-transparent via-black/41 to-black/48">
                            <Image
                                src={item.imageSrc}
                                width={imgWidth}
                                height={240}
                                alt={item.alt ?? item.title}
                                className={`block h-full w-full select-none object-cover rounded-[20px] ${idx === activeIndex ? "blur-0" : "blur-[6px]"
                                    } transition-all duration-300`}
                                draggable={false}
                            />

                            {idx === activeIndex && (
                                <div
                                    className="absolute left-1/2 -bottom-2.5 w-max -translate-x-1/2 -translate-y-[20%] flex flex-col items-center justify-center gap-5 mb-5"
                                >
                                    <span className="text-white text-[32px] leading-8 tracking-[-0.64px] font-fraunces text-center font-light">{item.title}</span>
                                    <Link href="#">
                                        <LiquidButton className="w-full lg:w-fit rounded-full px-4 py-3">
                                            <div className="w-full lg:w-fit flex flex-row items-center justify-center gap-3 ">
                                                <p className="tracking-[1.4px] text-sm text-white/90 hover:bg-white/10 transition">VIEW PROJECT</p>
                                                <Image src={playIcon} alt="Play Icon" width={24} height={24} />
                                            </div>
                                        </LiquidButton>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-pagination"></div>


                {/* <div className="w-full lg:mt-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-5">
                    {width && width >= 1024 ? (
                        <>
                            <button
                                className={`flex items-center justify-center duration-350 w-1/2 lg:w-fit bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] rounded-full border border-[#E2E8F02E] p-2 lg:px-3 transition text-neutral-400`}
                            >
                                <p className="font-jakarta ml-2 text-xs leading-3 font-normal uppercase tracking-[1.2px]">All projects</p>
                                <Image src={arrowRight} alt="Back" width={14} height={14} />
                            </button>
                            <div className="swiper-pagination w-full" />
                            <span className="text-neutral-600 text-center font-jakarta text-sm font-normal leading-5 tracking-[2.8px]">01/05</span>
                        </>
                    ) : (
                        <>
                            <div className="swiper-pagination w-full" />
                            <span className="text-neutral-600 text-center font-jakarta text-sm font-normal leading-5 tracking-[2.8px]">01/05</span>
                            <button
                                className={`flex items-center justify-center duration-350 w-1/2 lg:w-fit bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] rounded-full border border-[#E2E8F02E] p-2 lg:px-3 transition text-neutral-400`}
                            >
                                <p className="font-jakarta ml-2 text-xs leading-3 font-normal uppercase tracking-[1.2px]">All projects</p>
                                <Image src={arrowRight} alt="Back" width={14} height={14} />
                            </button>
                        </>
                    )}
                </div> */}

            </Swiper >


            {/* Global styles to preserve the exact CSS selectors you had:
          - .swiper-slide-active .title bottom/box-shadow change
          - pagination bullet sizes/colors/active shape
          These mirror style.css 1:1. */}
            < style jsx global > {`

        /* Pagination bullets (matches your style.css) */
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #FFFFFF33;
          border-radius: 50%;
          transition: all 0.3s ease-in-out;
          opacity: 1; /* keep consistent look */
        }

        .swiper-pagination-bullet-active {
          width: 32px;
          background-color: white;
          border-radius: 14px;
        }
      `}</style>
        </div >
    );
}
