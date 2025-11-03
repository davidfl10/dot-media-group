"use client";
import { useEffect, useState } from "react";
import Ballpit from "@/components/Ballpit";
import { SlideTabs } from "@/components/slide-tabs";
import TextType from "@/components/TextType";
import Image from "next/image";

export default function Home() {
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
    <div className="flex h-fit flex-col items-center justify-center font-sans bg-[#2b3745]">
      <main
        className="flex relative min-h-screen w-full max-w-6xl flex-col items-center justify-center bg-[url(/logo.jpeg)] bg-center bg-no-repeat bg-contain"
      >
        <div className="absolute top-5">
          <SlideTabs />
        </div>
        <Ballpit
          count={count}
          gravity={0.6}
          friction={0.9}
          wallBounce={0.95}
          followCursor={false}
          colors={["#3d85c6", "#FAEBD7", "#2b3745"]}
          lightIntensity={0.8}
        />
      </main>

      <section className="min-h-screen w-full flex items-center justify-center text-[#f4efe3]">
        <TextType
          text={["Welcome to DOT Media Group", "Let's start collaborate", "Build the future together"]}
          typingSpeed={75}
          pauseDuration={1500}
          className="text-8xl"
          showCursor={true}
          cursorCharacter="_"
        />
      </section>

    </div>
  );
}
