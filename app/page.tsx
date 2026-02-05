"use client";
import { useEffect, useState } from "react";
import Ballpit from "@/components/Ballpit";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/context/ThemeContext";
import { LiquidButton } from "@/components/liquid-glass-button";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export default function Home() {
  const { theme } = useTheme();
  const logoSrc = theme === "black" ? "/logo/black.png" : "/logo/white.png";

  return (
    <main
      className={`flex w-full min-h-screen flex-col justify-center items-center`}
    >
      <section
        className={`bg-center bg-no-repeat bg-contain z-10 h-screen w-full max-w-[1608px] flex flex-col items-center justify-between gap-y-16 ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}
        style={{ backgroundImage: `url(${logoSrc})` }}
      >
        {/* <div
                    data-us-project="NYOE7AACt1mZfgTuFSXp"
                    className="absolute inset-0 -z-10 w-full h-full"
                    data-us-lazyload="true"
                    data-us-production="true"
                    data-us-fps="30"
                    data-us-scale="0.75"
                />

                <Script
                    src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.4/dist/unicornStudio.umd.js"
                    strategy="afterInteractive"
                    onLoad={() => {
                        // @ts-ignore
                        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                            // @ts-ignore
                            window.UnicornStudio.init();
                        }
                    }}
                /> */}

        <div className='mt-6 h-[10%]'>
          <Navbar />
        </div>

        <div className="h-[85%] w-full max-w-[1608px] px-10 flex flex-col items-start justify-around gap-6 text-center">
          <h3 className="max-w-[40%] self-stretch text-neutral-500 text-start font-jakarta text-lg font-normal leading-8 tracking-[-0.36px]">DOT Media Group is a premier global digital agency shaping the future of online presence. We fuse strategy, design, and innovation to create brands that define their industries.</h3>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-start self-stretch font-fraunces text-[135px] font-normal leading-32 tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              We redefine
            </h1>
            <h1 className="relative ml-10 font-fraunces-italic text-[135px] font-normal leading-32 tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              digital expression
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-14 h-16 pb-1.5 items-center gap-1.5">
          <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-white/10"></div>
        </div>

      </section>



      <section className="h-screen w-full max-w-[1608px] flex flex-col items-center">

      </section>

    </main>

  );
}
