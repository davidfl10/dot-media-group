"use client";
import { useTheme } from "@/context/ThemeContext";
import useWindowWidth from "@/lib/useWindowWidth";
import useServicesInformation from "@/lib/useServicesInformation";
import Script from "next/script";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// components
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/text/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import { LogoCloud } from "@/components/logoLoop/logo-cloud-3";
import CoverflowCarousel from "@/components/carousel/CoverflowCarousel";
import ProjectForm from "@/components/projectRequest/ProjectForm";
import Footer from "@/components/Footer";
// logos
import Ambianta from "@/public/partners/ambianta.jpg";
import BasarabsDance from "@/public/partners/basarabs-dance.jpg";
import Biscottini from "@/public/partners/biscottini.png";
import BrutariaBardar from "@/public/partners/brutaria-bardar.png";

export default function Home() {
  const { theme } = useTheme();
  const logoSrc = theme === "black" ? "/logo/black.png" : "/logo/white.png";

  const width = useWindowWidth();

  const services = useServicesInformation().services;

  const imageLogos = [
    { src: Ambianta, width: 120, height: 60, alt: "Ambianta" },
    { src: BasarabsDance, width: 120, height: 60, alt: "Basarabs Dance" },
    { src: Biscottini, width: 120, height: 60, alt: "Biscottini" },
    { src: BrutariaBardar, width: 120, height: 60, alt: "Brutaria Bardar" },
  ];

  return (
    <main
      className={`flex w-screen min-h-screen flex-col justify-center items-center overflow-hidden`}
    >
      <section
        className={`bg-center bg-no-repeat bg-contain z-10 h-screen w-screen max-w-[1608px] flex flex-col items-center justify-between gap-y-16 ${theme === "black" ? 'text-[#f4efe3]' : 'text-[#000000]'} `}
        style={{ backgroundImage: `url(${logoSrc})` }}
      >
        {/* <div
          data-us-project="NYOE7AACt1mZfgTuFSXp"
          className="absolute inset-0 -z-10 w-full h-full"
          data-us-lazyload="true"
          data-us-production="true"
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
        /> */}

        <div className='mt-6 h-[10%]'>
          <Navbar />
        </div>

        <div className="h-[85%] w-full max-w-[1608px] px-4 lg:px-10 flex flex-col items-center lg:items-start justify-around gap-6 text-center">
          {
            width && width > 850 ? (
              <h3 className="max-w-[40%] self-stretch text-neutral-500 text-start font-jakarta text-lg font-normal leading-8 tracking-[-0.36px]">
                DOT Media Group is a premier global digital agency shaping the future of online presence. We fuse strategy, design, and innovation to create brands that define their industries.
              </h3>
            ) : (
              <h3></h3>
            )
          }
          <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
            <h1 className="text-center lg:text-start self-stretch font-fraunces text-[40px] md:text-[80px] lg:text-[135px] font-normal leading-11 md:leading-20 lg:leading-32 tracking-[-0.8px] lg:tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              We redefine
            </h1>
            <h1 className="relative lg:ml-10 font-fraunces-italic text-[40px] md:text-[80px] lg:text-[135px] font-normal leading-11 md:leading-20 lg:leading-32 tracking-[-0.8px] lg:tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              digital expression
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-14 h-16 pb-1.5 items-center gap-1.5">
          <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-white/10"></div>
        </div>

      </section>



      <section className="h-screen w-screen max-w-[1008px]">
        <ScrollReveal
          baseOpacity={0.3}
          enableBlur
          baseRotation={2}
          blurStrength={9}
          containerClassName="h-full w-full flex flex-col items-center gap-7 px-3 pt-5 lg:p-0 lg:gap-14"
        >
          <p>
            We are shaping the next generation of digital presence.
          </p>
          <p>
            Not just creators, but thinkers, innovators, and collaborators.
          </p>
          <p>
            Transforming ordinary online noise into strategy, clarity, and growth.
          </p>
          <p>
            We design ecosystems where ideas evolve into influence.
          </p>
          <p>
            Where brands rise beyond frameworks to inspire, engage, and lead.
          </p>
          <p>
            Fueled by ambition. Defined by precision. Built for tomorrow.
          </p>
        </ScrollReveal>
      </section>

      <section className="lg:h-[80vh] h-auto w-screen max-w-[1608px] flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 p-5 mt-20">
        <div className="lg:h-full h-[45%] max-w-screen flex flex-col items-start justify-center gap-6 p-10">
          <p className="text-[#EED5B2] font-jakarta text-xs font-normal leading-3.5 tracking-[4.8px] uppercase">Our expertise</p>
          <div className="lg:max-w-[320px] flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-fraunces text-white font-light text-[32px] leading-8">Engineering</span>
            <span className="font-fraunces-italic text-white font-light text-[32px] leading-8">Influence.</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-[16px] leading-6 tracking-[-0.32px]">
            We operate at the intersection of data and desire. Our suite of services is designed to elevate every aspect of your digital presence, explicitly tailored for those who demand excellence.
          </p>
        </div>

        <div className="lg:max-w-[1148px] w-screen lg:h-full h-[45%] flex flex-wrap items-center justify-center mx-auto p-10 pr-0 lg:pr-10">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={24}
            slidesOffsetAfter={0}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1.15, spaceBetween: 12 },
              480: { slidesPerView: 1.15, spaceBetween: 12 },
              640: { slidesPerView: 1.15, spaceBetween: 14 },
              1024: { slidesPerView: 1.5, spaceBetween: 18, centeredSlidesBounds: false },
            }}
            className="w-full overflow-hidden px-4 py-6 lg:p-10"
          >
            {Object.values(services).map((service) => (
              <SwiperSlide key={service.serviceName} className="overflow-visible">
                <div className={`rounded-[26px] ${service.borderColor}`}>
                  <ServiceCard
                    key={service.serviceName}
                    projectId={service.projectId}
                    serviceName={service.serviceName}
                    serviceDescription={service.serviceDescription}
                    link={service.link}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="lg:h-[30vh] h-auto w-screen max-w-[1608px] flex items-center justify-center flex-wrap lg:flex-nowrap gap-10 p-5 mt-20">
        <div className="lg:h-full h-[45%] max-w-screen flex flex-col items-center justify-center gap-6 p-10">
          <p className="text-[#EED5B2] font-jakarta text-xs font-normal leading-3.5 tracking-[4.8px] uppercase ">Featured work</p>
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-fraunces text-white font-light text-[32px] leading-8">Trusted by brands</span>
            <span className="font-fraunces-italic text-[#6B7280] font-light text-[32px] leading-8">that lead.</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-[16px] leading-6 tracking-[-0.32px]">
            We help the best teams to succeed — from new startups to international companies.
          </p>
        </div>
      </section>
      <LogoCloud logos={imageLogos} />

      <section className="lg:h-[80vh] h-screen w-screen max-w-screen flex flex-col items-center justify-center mt-10">
        <div className="flex w-full items-center justify-center lg:justify-between lg:px-20 mb-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-jakarta text-xs text-[#6B7280] font-normal leading-4 tracking-[1.2px] uppercase">Cinematography</p>
            <p className="font-fraunces text-[28px] text-white font-light leading-[33.6px] tracking-[-0.56px]">Brutaria Bardar</p>
          </div>
          {width && width > 850 && (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-jakarta text-xs text-[#6B7280] font-normal leading-4 tracking-[1.2px] uppercase">Year</p>
              <p className="font-fraunces text-[28px] text-white font-light leading-[33.6px] tracking-[-0.56px]">2025</p>
            </div>
          )}
        </div>
        <CoverflowCarousel
          items={[
            { videoSrc: "/partners/brutariabardar/video-vertical1.mp4", title: "Video Production" },
            { videoSrc: "/partners/brutariabardar/video-vertical1.mp4", title: "Video Production" },
            { videoSrc: "/partners/brutariabardar/video-vertical1.mp4", title: "Video Production" },
            { videoSrc: "/partners/brutariabardar/video-vertical1.mp4", title: "Video Production" },
            { videoSrc: "/partners/brutariabardar/video-vertical1.mp4", title: "Video Production" }
          ]}
          initialSlide={2}
        />    
      </section>

      <section id="project-request" className="relative h-screen w-screen max-w-[1608px] flex flex-col items-center justify-center mt-10">
        {/*
        <div
          data-us-project="ci8EUGRYBriwQrD4dFeV"
          className="absolute inset-0 -z-10"
          data-us-lazyload="true"
          data-us-production="true"
        />

        
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
        />  */}

        <div className="h-[20%] max-w-[800px] flex flex-col items-center justify-center gap-6 p-10 mt-[10%]">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-4 gap-y-2">
            <span className="font-fraunces text-white text-center font-light text-[40px] lg:text-[70px] flex items-center justify-between gap-4">Let's build <span className="font-fraunces-italic text-right">the</span> </span>
            <span className="font-fraunces-italic text-white lg:text-left font-light text-[40px] lg:text-[70px]">impossible.</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-center text-[16px] lg:text-[20px] leading-6 tracking-[-0.32px]">
            You have a vision — We have  the creative firepower to realize it. Tell us about your project, and let's define the future of your brand.
          </p>
        </div>
        <ProjectForm />
      </section>

      <Footer />

    </main>

  );
}
