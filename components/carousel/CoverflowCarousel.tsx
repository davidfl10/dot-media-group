"use client";

import React, { useRef } from "react";
import useWindowWidth from "@/lib/useWindowWidth";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow, Pagination } from "swiper/modules";

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

    const width = useWindowWidth();
    const imgWidth = 300;

    return (
        <div
            className={[
                // matches body: center + black bg + white text + hidden overflow
                "flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white",
                wrapperClassName
            ].join(" ")}
        >
            <Swiper
                modules={[EffectCoverflow, Pagination]}
                className={["w-full py-[50px]", className].join(" ")}
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
                pagination={{ el: ".swiper-pagination" }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                // same behavior: click a slide -> focus it
                onClick={(swiper) => {
                    if (typeof swiper.clickedIndex === "number" && swiper.clickedIndex >= 0) {
                        swiper.slideTo(swiper.clickedIndex);
                    }
                }}
                // same CSS var behavior: --swiper-pagination-bottom: -2px
                style={
                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ["--swiper-pagination-bottom" as any]: "-2px"
                    } as React.CSSProperties
                }
            >
                {items.map((item, idx) => (
                    <SwiperSlide key={idx} className="w-auto!">
                        {/* slide shell: width 320px, aspect 3/4, radius 14, border 1px yellow */}
                        <div className="relative w-[85vw] max-w-[320px] aspect-3/4 rounded-[14px] mx-auto border border-yellow-400">
                            <Image
                                src={item.imageSrc}
                                width={imgWidth}
                                height={240}
                                alt={item.alt ?? item.title}
                                className="block h-full w-full select-none object-cover rounded-[14px]"
                                draggable={false}
                            />

                            {/* title overlay (same as .title in your CSS) */}
                            <div
                                className={[
                                    "us-title absolute left-1/2 bottom-[5px] w-max -translate-x-1/2 -translate-y-[20%]",
                                    "px-[18px] py-[10px] text-center",
                                    "bg-black/50 rounded-[8px] border-2 border-yellow-400",
                                    "shadow-[0_4px_38px_black] backdrop-blur-[10px]",
                                    "transition-all duration-500 ease-linear"
                                ].join(" ")}
                            >
                                <span className="text-[1.2rem] font-semibold">{item.title}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-pagination" />
            </Swiper>

            {/* Global styles to preserve the exact CSS selectors you had:
          - .swiper-slide-active .title bottom/box-shadow change
          - pagination bullet sizes/colors/active shape
          These mirror style.css 1:1. */}
            <style jsx global>{`
        /* Active slide title behavior (matches .swiper-slide-active .title) */
        .swiper-slide-active .us-title {
          bottom: -10px;
          box-shadow: 0 4px 38px yellow;
        }

        /* Pagination bullets (matches your style.css) */
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background-color: #fff;
          border-radius: 50%;
          transition: all 0.3s ease-in-out;
          opacity: 1; /* keep consistent look */
        }

        .swiper-pagination-bullet-active {
          width: 32px;
          background-color: blue;
          border-radius: 14px;
        }
      `}</style>
        </div>
    );
}
