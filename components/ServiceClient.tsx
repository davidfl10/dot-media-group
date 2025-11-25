"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Pagination } from "swiper/modules";
// import ElectricBorder from "@/components/ElectricBorder";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// video

type Package = { name: string; price: string; features: string[] };

export default function ServiceClient({
  slug,
  color,
  packages,
}: {
  slug: string;
  color: string;
  packages: Package[];
}) {
  const { theme } = useTheme();
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isDark = theme === "black";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const videoSrc = slug === "consulting" ? "/videos/red.mp4"
    : slug == "digital-marketing" ? "/videos/blue.mp4"
      : slug == "it-solutions" ? "/videos/green.mp4" : "/videos/umber.mp4";

  console.log(videoSrc);

  return (
    <div
      className={`relative flex w-full min-h-screen flex-col items-center justify-center ${isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
    >

      <section className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-y-8">
        <video
          autoPlay
          className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-10"
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="text-4xl font-semibold font-main">{title}</h1>

        {/* custom pagination */}
        <div className="w-full mt-6 flex flex-col items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {packages.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  // guard: Swiper instance might be null briefly
                  if (!swiperRef.current) return;
                  swiperRef.current.slideTo(i);
                  setCurrentIndex(i);
                }}
                className={`px-3 py-1 rounded-full text-xs font-secondary transition-colors ${i === currentIndex
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDark
                    ? "bg-zinc-800 text-white/80"
                    : "bg-gray-200 text-black"
                  }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          // built-in Swiper pagination (optional, can remove if using only custom)
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
        >
          {packages.map((p) => (
            <SwiperSlide key={p.name} className="font-main">
              {/* <ElectricBorder
                color="#13E857"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              > */}
              <div
                className={`w-56 h-72 rounded-xl px-4 py-3 text-black shadow-lg ${isDark ? "text-white" : ""
                  }`}
                style={{ backgroundColor: color }}
              >
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <div className="text-sm opacity-80 mb-2">{p.price}</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              {/* </ElectricBorder> */}
            </SwiperSlide>
          ))}
        </Swiper>


      </section>
    </div>
  );
}
