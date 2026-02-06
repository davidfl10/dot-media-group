"use client";

import Script from "next/script";
import { useEffect } from "react";
import { LiquidButton } from "./liquid-glass-button";

export default function ServiceCard() {
    return (
        <div className="relative h-[400px] w-full max-w-[680px] overflow-hidden rounded-3xl border border-neutral-800 bg-black/70 backdrop-blur-2xl">

            {/* WebGL Background */}
            <div
                data-us-project="7787C0Plrx2oN72o1s7O"
                className="absolute inset-0 -z-10"
                data-us-lazyload="true"
                data-us-production="true"
            />

            {/* Unicorn Studio Script */}
            <Script
                src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // @ts-ignore
                    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                        // @ts-ignore
                        window.UnicornStudio.init();
                    }
                }}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">

                <h3 className="font-fraunces text-3xl">Consulting</h3>

                <div className="space-y-4 lg:flex">
                    <p className="font-jakarta max-w-md text-sm text-white/80 leading-relaxed">
                        We orchestrate full-spectrum social ecosystems. Strategic planning,
                        magnetic content creation, and active engagement to transform
                        passive audiences into loyal brand communities.
                    </p>

                    <LiquidButton className="mt-6 w-full lg:w-fit rounded-full px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/10 transition">
                        LEARN MORE
                    </LiquidButton>
                </div>

            </div>
        </div>
    );
}
