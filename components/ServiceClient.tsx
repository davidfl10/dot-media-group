"use client";

import { useTheme } from "@/context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import ElectricBorder from "@/components/ElectricBorder";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type Package = { name: string; price: string; features: string[] };

export default function ServiceClient({
  slug,
  packages,
}: {
  slug: string;
  packages: Package[];
}) {
  const { theme } = useTheme();
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isDark = theme === "black";

  return (
    <div
      className={`flex w-full min-h-screen flex-col items-center justify-center ${isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <section className="w-full max-w-6xl flex flex-col items-center gap-y-8">

        <h1 className="text-4xl font-semibold font-main">{title}</h1>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          // loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
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
                  className={`w-56 h-72 rounded-xl bg-[#0B5724] px-4 py-3 text-black shadow-lg ${isDark ? "bg-[#0B5724] text-white" : ""
                    }`}
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
