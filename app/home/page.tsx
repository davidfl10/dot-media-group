"use client";
import { useTheme } from '@/context/ThemeContext';
import Script from "next/script";
// components
import { SlideTabs } from '@/components/slide-tabs';
import TextType from '@/components/TextType';
import CardSwiper from '@/components/CardSwiper';
import ProjectForm from '@/components/ProjectForm';

function HomePage() {
    const { theme } = useTheme();

    return (
        <div className={`flex w-full h-fit flex-col items-center justify-center ${theme === "black" ? 'bg-black' : 'bg-white'} `}>
            <section className={`relative z-10 h-screen w-full flex flex-col items-center gap-y-32 overflow-hidden ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}>
                <div
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
                />


                <div className='mt-10 h-[20%]'>
                    <SlideTabs />
                </div>
            </section>



            <section className={`min-h-screen max-w-6xl flex flex-col items-center justify-center ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}>
                <div>
                    <h2 className='text-4xl font-main mb-6'>Getting Started</h2>
                </div>
                <ProjectForm />
            </section>
        </div>
    )
}

export default HomePage;