"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/useTranslation";
// icons
import Email from "@/public/icons/email.svg";
import Call from "@/public/icons/call.svg";
import Whatsapp from "@/public/icons/whatsapp.svg";
import Instagram from "@/public/icons/instagram-larger.svg";
import Facebook from "@/public/icons/facebook-larger.svg";
import LinkedIn from "@/public/icons/linkedIn.svg";
import Twitter from "@/public/icons/X-twitter.svg";
import Link from "next/link";


const ContactPage = () => {
    const t = useTranslation("contact");
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    const mainIcons = [
        { name: "Email",     icon: Email,     value: "office@dot-media-group.com", label: t.emailLabel },
        { name: "Call",      icon: Call,      value: "+373 (60) 111-222",          label: t.callLabel },
        { name: "WhatsApp", icon: Whatsapp,  value: "+373 (60) 111-222",          label: t.whatsappLabel },
    ]

    const socialIcons = [
        { name: "Instagram", icon: Instagram, link: "https://www.instagram.com/dotmg.eu/" },
        { name: "Facebook", icon: Facebook, link: "https://www.instagram.com/dotmg.eu/" },
        { name: "LinkedIn", icon: LinkedIn, link: "https://www.instagram.com/dotmg.eu/" },
        { name: "Twitter", icon: Twitter, link: "https://www.instagram.com/dotmg.eu/" }
    ]

    return (
        <>
            <section
                ref={heroRef}
                className="relative h-screen w-screen flex flex-col items-center justify-between text-center px-6 bg-linear-to-b from-black to-[#0C0C0C]"
            >
                <div className='mt-6 h-[10%]'>
                    <Navbar />
                </div>

                <div className="flex flex-col items-center justify-center gap-5 h-[80%] w-screen">
                    <div className="h-[40%] px-3 lg:h-[55%] flex flex-col items-center justify-center gap-5 max-w-[800px]">
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="font-fraunces text-[clamp(56px,10vw,140px)] leading-[0.92] font-normal tracking-[-2px]"
                        >
                            <span className="font-fraunces-italic text-white">{t.heroHeading1}</span>
                            <br />
                            <span className="bg-linear-to-b from-white to-[#535353] bg-clip-text text-transparent ml-20 lg:ml-32">{t.heroHeading2}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="font-jakarta max-w-[460px] text-[13px] md:text-[14px] text-white/40 leading-relaxed font-light"
                        >
                            {t.heroDescription}
                        </motion.p>
                    </div>

                    <div className="flex w-full md:w-[80%] flex-wrap justify-center items-center gap-3">
                        {mainIcons.map((icon, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.6 }}
                                className={`flex flex-col items-center justify-center ${mainIcons[index].name === "Email" ? "w-[70%]" : "w-[47%]"}  md:w-[250px] lg:w-[370px] gap-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.10)_100%)] border border-white/10 rounded-[20px] px-3 py-5 lg:px-5 lg:py-10 cursor-pointer hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.15)_100%)] transition-colors duration-300`}
                            >
                                <div className="flex items-center justify-center w-11 h-11 p-3 mb-2 rounded-full border border-white/10 bg-white/5">
                                    <Image src={mainIcons[index].icon} alt={mainIcons[index].name} width={mainIcons[index].name === "Email" ? 20 : 28} height={mainIcons[index].name === "Email" ? 20 : 28} />
                                </div>
                                <span className="text-white/40 uppercase font-jakarta text-xs font-medium">{mainIcons[index].label}</span>
                                <span className={`text-[#E0DFDF] font-jakarta text-[16px] font-medium`}>{mainIcons[index].value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 pb-0.5">
                    <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">{t.scrollLabel}</span>
                    <div className="w-px h-8 bg-linear-to-b from-white/60 to-white/10"></div>

                    {/* Glow line */}
                    <div className="relative w-[80vw] mt-2">
                        {/* Spreading light bloom above the line */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[40%] h-16 bg-white/10 blur-2xl rounded-full" />
                        {/* Wider softer bloom */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-white/5 blur-3xl rounded-full" />
                        {/* The sharp line */}
                        <div className="relative h-0.5 bg-linear-to-r from-transparent via-white/50 to-transparent" />
                        {/* Glow under the line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-4 bg-white/15 blur-xl rounded-full" />
                    </div>
                </div>
            </section>

            <section
                className="relative h-[70vh] w-screen flex flex-col items-center justify-center gap-5 text-center px-3 bg-linear-to-b from-black to-[#0C0C0C]"
            >
                <span className="text-xs md:text-sm tracking-[4.8px] uppercase text-[#EED5B2] font-jakarta font-normal">
                    {t.socialTagline}
                </span>
                <div className="flex gap-3">
                    <h2 className="font-fraunces text-[clamp(32px,4vw,48px)] text-white font-normal leading-[1.05] tracking-[-1px]">
                        {t.socialHeading1}
                    </h2>
                    <h2 className="font-fraunces-italic text-[clamp(32px,4vw,48px)] text-white font-light leading-[1.05] tracking-[-1px]">
                        {t.socialHeading2}
                    </h2>
                </div>
                <p className="text-white/50 font-jakarta font-light text-[16px] md:text-[18px] leading-relaxed max-w-[480px]">
                    {t.socialDescription}
                </p>
                <div className="flex w-full md:w-[80%] flex-wrap justify-center items-center gap-3 mt-5">
                    {socialIcons.map((icon, index) => (
                        <Link href={socialIcons[index].link} key={index} className="w-[48%] md:w-[190px] lg:w-60" target="_blank">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.6 }}
                                className={`flex flex-col items-center justify-center gap-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.10)_100%)] border border-white/10 rounded-[20px] px-4 py-12 lg:px-5 lg:py-10 cursor-pointer hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.15)_100%)] transition-colors duration-300`}
                            >
                                <Image src={socialIcons[index].icon} alt={socialIcons[index].name} width={24} height={24} />
                                <span className="text-white/40 font-jakarta text-xs font-medium">{socialIcons[index].name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="w-screen">
                <Footer />
            </div>
        </>
    )
}

export default ContactPage;