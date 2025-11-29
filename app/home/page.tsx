"use client";
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
// components
import { SlideTabs } from '@/components/slide-tabs';
import TextType from '@/components/TextType';
import CardSwiper from '@/components/CardSwiper';
import ProjectForm from '@/components/ProjectForm';

function HomePage() {
    const { theme } = useTheme();

    return (
        <div className={`flex w-full h-fit flex-col items-center justify-center ${theme === "black" ? 'bg-black' : 'bg-white'} `}>
            <section className={`relative z-10 h-screen w-full flex flex-col items-center gap-y-32 ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}>
                <Image
                    src="/videos/ivory.gif"
                    width={500}
                    height={500}
                    className='absolute object-contain w-full h-full overflow-hidden -z-10'
                    alt="Picture of the author"
                />

                <div className='mt-10 h-[20%]'>
                    <SlideTabs />
                </div>

                <TextType
                    text={["Welcome to DOT MEDIA GROUP", "Let's start collaborating", "Build the future together"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    className={`font-main text-8xl text-center p-4 max-w-6xl`}
                    showCursor={true}
                    cursorCharacter="_"
                />
            </section>


            <div className={`min-h-screen max-w-6xl flex flex-wrap items-center justify-center gap-20 ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'}`}>
                <div>
                    <h2 className='text-4xl font-main mb-6'>Our Services</h2>
                </div>
                <div className='w-60 h-80'>
                    <CardSwiper />
                </div>
                {/* <CardSwap
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={false}
                >
                    <Card>
                        <Link href="/services/consulting" className='font-secondary'>
                            <h3 className='p-2 bg-[#0B5724] rounded-t-xl'>Consulting</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/digital-marketing" className='font-secondary'>
                            <h3 className='p-2 bg-[#0B5724] rounded-t-xl'>Digital Marketing</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/it-solutions" className='font-secondary'>
                            <h3 className='p-2 bg-[#0B5724] rounded-t-xl'>IT Solutions</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link href="/services/ads-management" className='font-secondary'>
                            <h3 className='p-2 bg-[#0B5724] rounded-t-xl'>Ads Management</h3>
                            <div className='w-full bg-white h-0.5'></div>
                            <p className='p-2'>Your content here</p>
                        </Link>
                    </Card>
                </CardSwap> */}
            </div>

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