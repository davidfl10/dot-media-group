"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { servicePackages } from "@/lib/servicePackages";
import useWindowWidth from "@/lib/useWindowWidth";

import "swiper/css";
import "swiper/css/free-mode";

const DOMAIN_KEYS = Object.keys(servicePackages["en"]);

export default function ServiceClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const width = useWindowWidth();
  const isMobile = !!width && width < 1050;
  // Swiper refs
  const domainSwiperRef = useRef<SwiperType | null>(null);
  const descSwiperRef = useRef<SwiperType | null>(null);
  const serviceSwiperRef = useRef<SwiperType | null>(null);
  const serviceDescSwiperRef = useRef<SwiperType | null>(null);
  const packageSwiperRef = useRef<SwiperType | null>(null);

  const searchParams = useSearchParams();

  // active Domain index
  const domainParam = parseInt(searchParams.get("domain") || "0");

  const [activeDomain, setActiveDomain] = useState(
    domainParam >= 0 && domainParam < DOMAIN_KEYS.length ? domainParam : 0
  );

  // Sync swiper to initial domain on mount
  useEffect(() => {
    if (domainParam > 0) {
      domainSwiperRef.current?.slideTo(domainParam);
      descSwiperRef.current?.slideTo(domainParam);
    }
  }, []);

  // Active indices
  const [activeService, setActiveService] = useState(0);
  const [activePackage, setActivePackage] = useState(0);

  const lang = "en";
  const domainKey = useMemo(() => DOMAIN_KEYS[activeDomain], [activeDomain]);
  const service = useMemo(() => servicePackages[lang][domainKey], [domainKey]);
  const serviceEntries = useMemo(() => Object.entries(service.services), [service]);
  const activeServiceData = serviceEntries[activeService][1];
  const buttonWidth = isMobile ? 60 : 100 / serviceEntries.length - 0.5;

  const handleDomainChange = (i: number) => {
    setActiveDomain(i);
    setActiveService(0);
    setActivePackage(0);
    descSwiperRef.current?.slideTo(i);
    serviceSwiperRef.current?.slideTo(0);
    packageSwiperRef.current?.slideTo(0);
  };

  const handleServiceChange = (i: number) => {
    setActiveService(i);
    setActivePackage(0);
    serviceDescSwiperRef.current?.slideTo(i);
    packageSwiperRef.current?.slideTo(0);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative h-screen w-screen flex flex-col items-center justify-between text-center px-6"
        style={{ background: `linear-gradient(to bottom, #000, ${service.heroBg})` }}
      >
        <div className="mt-6 h-[10%]">
          <Navbar />
        </div>

        <div className="h-[85%] flex flex-col items-center justify-center gap-6 max-w-[800px]">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-fraunces text-[clamp(52px,10vw,110px)] leading-[0.92] font-light tracking-[-2px] mb-8"
          >
            <span className="font-fraunces-italic text-white">Our</span>
            <br />
            <motion.span
              key={domainKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to bottom, #fff, ${service.mainBg})` }}
            >
              Services
            </motion.span>
          </motion.h1>

          <motion.p
            key={`desc-${domainKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-jakarta max-w-[560px] text-[15px] md:text-[16px] leading-7 font-normal"
            style={{ color: service.secondaryBg }}
          >
            We operate at the intersection of data and desire. Our suite of services is designed to elevate every aspect of your digital presence, explicitly tailored for those who demand excellence.
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-1.5 pb-0.5">
          <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
          <div className="w-px h-8 bg-linear-to-b from-white/60 to-white/10" />
          <div className="relative w-[80vw] mt-2">
            <div className="absolute -top-8 w-full h-4 blur-3xl rounded-full opacity-20" style={{ backgroundColor: "white" }} />
            <div className="absolute -top-8 w-full h-12 blur-xl lg:blur-xl rounded-full" style={{ backgroundColor: service.secondaryBg }} />
            <div className="relative h-0.5 lg:h-px bg-linear-to-r from-transparent via-white to-transparent" />
            <div className="absolute top-0 w-full h-1 blur-xl rounded-full" style={{ backgroundColor: "white", opacity: 0.15 }} />
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="h-fit max-w-[1200px] flex flex-col items-center justify-center mx-auto px-6 lg:px-12 text-white">

        {/* ── Slider 1: Domain selector ── */}
        <div className="mt-20 flex flex-col items-center justify-center">
          <Swiper
            modules={width && width < 1000 ? [] : [FreeMode]}
            centeredSlides={width && width < 1000 ? true : false}
            slidesPerView="auto"
            spaceBetween={8}
            onSwiper={(s) => (domainSwiperRef.current = s)}
            onSlideChange={(s) => handleDomainChange(s.realIndex)}
            className="rounded-full border border-white/10 bg-stone-950"
          >
            {DOMAIN_KEYS.map((key, i) => {
              const d = servicePackages[lang][key];
              return (
                <SwiperSlide key={key} style={{ width: "auto" }}>
                  <button
                    onClick={() => {
                      handleDomainChange(i);
                      domainSwiperRef.current?.slideTo(i);
                    }}
                    className={`px-3 py-3 lg:px-6 text-xs lg:text-sm rounded-full font-jakarta tracking-[1.5px] uppercase hover:cursor-pointer transition-all duration-200 whitespace-nowrap ${i === activeDomain
                      ? "bg-white text-black border-white"
                      : "hover:bg-white/10 bg-transparent"
                      }`}
                    style={i !== activeDomain ? { color: service.secondaryBgLight, opacity: 1 } : {}}
                  >
                    {d.name}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <Swiper
          slidesPerView={1}
          onSwiper={(s) => (descSwiperRef.current = s)}
          onSlideChange={(s) => {
            handleDomainChange(s.realIndex);
            domainSwiperRef.current?.slideTo(s.realIndex);
          }}
          className="w-full max-w-[980px] my-8 lg:my-[60px]"
        >
          {DOMAIN_KEYS.map((key) => {
            const d = servicePackages[lang][key];
            return (
              <SwiperSlide key={key}>
                <div className="flex flex-col items-start lg:items-center lg:justify-center gap-4 px-4 text-center">
                  <h1 className="text-white text-left lg:text-center font-fraunces font-normal text-[32px] lg:text-[64px]">
                    {d.name}
                  </h1>
                  <p
                    className="text-[16px] text-left lg:text-center font-normal font-jakarta leading-relaxed"
                    style={{ color: d.secondaryBgLight }}
                  >
                    {d.description}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </main>

      <div className="h-fit w-[90%] mx-auto flex flex-col items-start p-3 lg:p-10 mb-8 rounded-[20px] border border-white/10"
        style={{
          background: `radial-gradient(135.36% 70.71% at 50% 50%, ${service.cardBg} 0%, rgba(0,0,0,0.60) 100%)`,
          backdropFilter: "blur(26px)",
        }}>

        {/* ── Slider 2: Sub-service selector ── */}
        <AnimatePresence mode="wait">

          <motion.div
            key={domainKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-12 w-full"
          >
            <Swiper
              modules={[FreeMode]}
              centeredSlides={isMobile}
              freeMode
              slidesPerView="auto"
              spaceBetween={8}
              onSwiper={(s) => (serviceSwiperRef.current = s)}
              className="w-full"
            >
              {serviceEntries.map(([name], i) => {
                return (
                  <SwiperSlide key={name} style={{ width: `${buttonWidth}%`, display: "flex", justifyContent: "space-between" }}>
                    <button
                      onClick={() => {
                        handleServiceChange(i);
                        serviceSwiperRef.current?.slideTo(i);
                      }}
                      className={`w-full bg-white/5 p-4 rounded-xl bacdrop-blur-[6px] cursor-pointer border border-white/20 text-xs lg:text-sm font-jakarta text-white tracking-[1.5px] uppercase transition-all duration-200 ${i === activeService
                        ? "bg-white/30"
                        : "hover:bg-white/10"
                        }`}
                      style={i === activeService ? { background: service.cardBg, opacity: 0.8 } : {}}
                    >
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs">0{i + 1}</span>
                        <p className="h-fit text-center">{name}</p>
                      </div>
                    </button>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Sub-service title + description */}
        <Swiper
          slidesPerView={1}
          onSwiper={(s) => (serviceDescSwiperRef.current = s)}
          onSlideChange={(s) => {
            handleServiceChange(s.realIndex);
            serviceSwiperRef.current?.slideTo(s.realIndex);
          }}
          className="w-full mb-12"
        >
          {serviceEntries.map(([name, data]) => (
            <SwiperSlide key={name}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-fraunces text-[28px] lg:text-[56px] text-white font-normal tracking-[-1px] mb-4">
                  {name}
                </h2>
                <p
                  className="font-jakarta text-[14px] md:text-[15px] leading-relaxed max-w-[640px]"
                  style={{ color: service.secondaryBg }}
                >
                  {data.description}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Slider 3: Packages ── */}
        <div className="mb-6 w-full">
          <p className="font-fraunces text-[24px] lg:text-[48px] font-normal text-white mb-6">Available Packages</p>
          <Swiper
            centeredSlides={isMobile}
            slidesPerView="auto"
            spaceBetween={16}
            onSwiper={(s) => (packageSwiperRef.current = s)}
            onSlideChange={(s) => setActivePackage(s.realIndex)}
            className="w-full lg:w-[90%] max-w-h-[800px] h-fit"
          >
            {activeServiceData.packages.map((pkg, i) => (
              <SwiperSlide
                key={pkg.name}
                style={{ width: "auto" }}
                onClick={() => {
                  setActivePackage(i);
                  packageSwiperRef.current?.slideTo(i);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`h-full w-[320px] lg:w-[500px] flex flex-col rounded-[20px] bg-white/5 border border-white/10 p-5 lg:p-6 gap-2 cursor-pointer transition-all duration-300`}
                >
                  {/* Package header */}
                  <div className="flex flex-col gap-1 pb-4">
                    <span
                      className="font-jakarta text-[20px] lg:text-[36px] tracking-[2px]"
                      style={{ color: service.secondaryBg }}
                    >
                      {pkg.name}
                    </span>
                    <p
                      className="font-fraunces text-sm font-normal mb-2"
                      style={{ color: service.secondaryBgLight }}
                    >
                      {pkg.price}
                    </p>
                    <p className="font-jakarta text-[14px] text-white/50 leading-snug">{pkg.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {pkg.features.map((feature) => (
                      <li key={feature.name} className={`${feature.enable !== undefined && feature.enable !== true ? 'blur-[2px]' : ''} flex flex-col gap-0.5`}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: service.secondaryBg }}
                          />
                          <span className="font-jakarta text-[13px] text-white/90 font-medium">
                            {feature.name}
                          </span>
                        </div>
                        <p className="font-jakarta text-[12px] text-white/40 leading-relaxed pl-3">
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      <div className="w-fit mx-auto">
        <Footer />
      </div>
    </>
  );
}