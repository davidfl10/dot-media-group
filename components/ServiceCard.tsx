"use client";

import Script from "next/script";
import { LiquidButton } from "./liquid-glass-button";
import Link from "next/link";

type ServiceCardProps = {
    projectId: string;
    serviceName: string;
    serviceDescription: string;
    link: string;
}

export default function ServiceCard({ projectId, serviceName, serviceDescription, link }: ServiceCardProps) {

    return (
        <div className="relative h-[400px] w-full max-w-[680px] overflow-hidden rounded-3xl border border-neutral-800 bg-black/70 backdrop-blur-2xl">

            {/* WebGL Background */}
            <div
                data-us-project={projectId}
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
            {/* <div className="absolute inset-0 bg-black/40" /> */}

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">

                <h3 className="font-fraunces text-3xl">{serviceName}</h3>

                <div className="space-y-4 lg:flex">
                    <p className="font-jakarta max-w-md text-sm text-white/80 leading-relaxed">
                        {serviceDescription}
                    </p>

                    <Link href={link}>
                        <LiquidButton className="mt-6 w-full lg:w-fit rounded-full px-6 py-3 text-sm tracking-wide text-white/90 hover:bg-white/10 transition">
                            LEARN MORE
                        </LiquidButton>
                    </Link>
                </div>

            </div>
        </div>
    );
}
