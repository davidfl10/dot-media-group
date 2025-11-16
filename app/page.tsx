"use client";
import { useEffect, useState } from "react";
import Ballpit from "@/components/Ballpit";
import { useTheme } from "@/context/ThemeContext";
import { LiquidButton } from "@/components/liquid-glass-button";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();
  const logoSrc = theme === "black" ? "/logo/black.png" : "/logo/white.png";

  const [count, setCount] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth <= 770 ? 50 : 100
  );

  useEffect(() => {
    const update = () => {
      setCount(window.innerWidth <= 770 ? 50 : 100);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [count]);

  return (
    <div className={`flex h-fit flex-col items-center justify-center ${theme === "black" ? 'bg-black' : 'bg-white'} `}>
      <main
        className={`flex relative min-h-screen w-full flex-col items-center justify-center bg-center bg-no-repeat bg-contain`}
        style={{ backgroundImage: `url(${logoSrc})` }}
      >
        {/* make the Ballpit visually visible but ignore pointer events so buttons stay clickable */}
        <div className="absolute inset-0 z-0 ballpit-wrapper">
          <Ballpit
            count={count}
            gravity={0.3}
            friction={0.9}
            wallBounce={0.95}
            followCursor={false}
            colors={["#0B5724", "#FAEBD7", "#2b3745"]}
            lightIntensity={0.8}
          />
        </div>

        <Link href={'/home'} >
          <LiquidButton
            className="font-secondary absolute top-[25%] left-1/2 -translate-x-1/2 z-50 text-white pointer-events-auto"
            aria-label="Choose your mood"
          >
            Choose your mood
          </LiquidButton>
        </Link>
      </main>

    </div >
  );
}
