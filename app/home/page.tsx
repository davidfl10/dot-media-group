"use client";
import { SlideTabs } from '@/components/slide-tabs';
import TextType from '@/components/TextType';
import CardSwap, { Card } from "@/components/CardSwap";
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

function HomePage() {
    const { theme } = useTheme();


    return (
        <div className={`flex w-full h-fit flex-col items-center justify-center ${theme === "black" ? 'bg-black' : 'bg-white'} `}>
            <section className={`min-h-screen max-w-6xl flex flex-col items-center gap-y-32 ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}>
                <div className='mt-10 h-[20%]'>
                    <SlideTabs />
                </div>
                <TextType
                    text={["Welcome to DOT MEDIA GROUP", "Let's start collaborate", "Build the future together"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    className={`font-main text-8xl text-center`}
                    showCursor={true}
                    cursorCharacter="_"
                />
            </section>


            <div className={`min-h-screen max-w-6xl flex flex-wrap items-center justify-around ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'}`}>
                <div>
                    <h2 className='text-4xl font-main mb-6'>Our Services</h2>
                </div>
                <CardSwap
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={false}
                >
                    <Card>
                        <Link href="/services/consulting" className='font-secondary'>
                            <h3 className='p-2'>Consulting</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/digital-marketing" className='font-secondary'>
                            <h3 className='p-2'>Digital Marketing</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/it-solutions" className='font-secondary'>
                            <h3 className='p-2'>IT Solutions</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/ads-management" className='font-secondary'>
                            <h3 className='p-2'>Ads Management</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                </CardSwap>
            </div>
        </div>
    )
}

export default HomePage;