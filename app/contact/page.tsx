"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
// components
import Navbar from "@/components/Navbar";
// icons
import Email from "@/public/icons/email.svg";
import Call from "@/public/icons/call.svg";
import Whatsapp from "@/public/icons/whatsapp.svg";


const ContactPage = () => {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    const mainIcons = [
        { name: "Email", icon: Email, value: "office@dot-media-group.com" },
        { name: "Call", icon: Call, value: "+373 (60) 111-222" },
        { name: "WhatsApp", icon: Whatsapp, value: "+373 (60) 111-222" }
    ]

    return (
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
                        <span className="font-fraunces-italic text-white">Get In</span>
                        <br />
                        <span className="bg-linear-to-b from-white to-[#535353] bg-clip-text text-transparent ml-20 lg:ml-32">Touch</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="font-jakarta max-w-[460px] text-[13px] md:text-[14px] text-white/40 leading-relaxed font-light"
                    >
                        We are always looking for new challenges and opportunities to collaborate. Let's create something exceptional together.
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
                            <span className="text-white/40 uppercase font-jakarta text-xs font-medium">{mainIcons[index].name} Us</span>
                            <span className={`text-[#E0DFDF] font-jakarta text-[16px] font-medium`}>{mainIcons[index].value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 pb-0.5">
                <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
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
    )
}

export default ContactPage;