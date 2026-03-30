"use client";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { getPartners, Partner } from "@/lib/notion";
import { useLoading } from "@/context/LoadingContext";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/lib/useTranslation";
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
import BrutariaBardar from "@/public/partners/brutaria-bardar.png";

export default function Home() {
  const t = useTranslation("home");

  const width = useWindowWidth();
  const heroAnimationId = width && width > 850 ? "7mGxoWXPFg6nE8JRQwCd" : "Jmd7m6TTBUpICNVq4mLJ";

  const services = useServicesInformation().services;

  const { registerLoading, startLoading } = useLoading();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [imageLogos, setImageLogos] = useState<any[]>([
    { src: BrutariaBardar, width: 120, height: 60, alt: "Brutaria Bardar1" },
    { src: BrutariaBardar, width: 120, height: 60, alt: "Brutaria Bardar2" },
    { src: BrutariaBardar, width: 120, height: 60, alt: "Brutaria Bardar3" }
  ]);

  // Register the data fetch with the global loader — runs synchronously on render
  // so the overlay stays visible until partners are resolved.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const partnersPromise = useMemo(() => {
    const p = getPartners();
    registerLoading(p);
    return p;
  }, []);

  useEffect(() => {
    partnersPromise.then((fetchedPartners) => {
      setImageLogos(
        fetchedPartners
          .filter((p) => p.logo)
          .map((p) => ({ src: p.logo, width: 120, height: 60, alt: p.name }))
      );
      setPartners(fetchedPartners);
    });
  }, [partnersPromise]);

  // On every mount (including client-side navigation back to this page),
  // re-show the loading overlay and wait 1.8 s for Unicorn Studio WebGL
  // assets to finish downloading and rendering before revealing the page.
  useLayoutEffect(() => {
    startLoading();
    const unicornReady = new Promise<void>((resolve) => {
      // @ts-ignore
      if (window.UnicornStudio) {
        // Script already in memory — destroy stale instances, re-init, then
        // wait for assets to render before releasing the overlay.
        // @ts-ignore
        window.UnicornStudio.destroy?.();
        // @ts-ignore
        window.UnicornStudio.init();
        setTimeout(resolve, 1800);
      } else {
        // First page load — onLoad on <Script> calls init().
        // Resolve immediately; the partners data-fetch promise alone
        // controls how long the overlay stays on first load.
        resolve();
      }
    });
    registerLoading(unicornReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex w-screen min-h-screen flex-col justify-center items-center overflow-hidden">
      <section
        className={`bg-center bg-no-repeat bg-contain z-10 h-screen w-screen max-w-[1608px] flex flex-col items-center justify-between gap-y-16`}
        // style={{ backgroundImage: `url(${logoSrc})` }}
      >
        <div
          data-us-project={heroAnimationId}
          className="absolute inset-0 -z-10 w-full h-full"
          data-us-lazyload="true"
          data-us-production="true"
          data-us-scale="0.90"
          data-us-dpi="1"
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

        <div className='mt-6 h-[10%]'>
          <Navbar />
        </div>

        <div className="h-[85%] w-full max-w-[1608px] px-4 lg:px-10 flex flex-col items-center lg:items-start justify-around gap-6 text-center">
          <h3 className="hidden md:block max-w-[40%] self-stretch text-neutral-500 text-start font-jakarta text-lg font-normal leading-8 tracking-[-0.36px]">
            {t.heroDescriptionDesktop}
          </h3>
          <h3 className="md:hidden" />
          <div className="flex flex-col items-end lg:items-start justify-center lg:justify-start">
            <h1 className="text-center lg:text-start self-stretch font-fraunces text-[40px] md:text-[80px] lg:text-[120px] limitedHeight:text-[75px] limitedHeight:leading-20 font-normal leading-11 md:leading-20 lg:leading-32 tracking-[-0.8px] lg:tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              {t.heroHeading1}
            </h1>
            <h1 className="relative lg:ml-10 font-fraunces-italic text-[40px] md:text-[75px] lg:text-[120px] limitedHeight:text-[75px] limitedHeight:leading-24 font-normal leading-11 md:leading-24 lg:leading-36 tracking-[-0.8px] lg:tracking-[-2.8px] bg-gradient-to-t from-[#535353] to-white bg-clip-text text-transparent">
              {t.heroHeading2}
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-14 h-16 pb-1.5 items-center gap-1.5">
          <span className="text-neutral-50/60 font-jakarta text-xs font-medium uppercase leading-5 tracking-[1.2px]">{t.scrollLabel}</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-white/10"></div>
        </div>

      </section>



      <section className="min-h-screen w-screen max-w-[1008px]">
        <ScrollReveal
          baseOpacity={0.3}
          enableBlur
          baseRotation={2}
          blurStrength={9}
          scrubSpeed={5}
          containerClassName="min-h-screen w-full flex flex-col items-center justify-around gap-7 px-3 pt-5 lg:p-0 lg:gap-14"
        >
          {width && width < 1000 && (
            <p>{t.heroDescriptionMobile1}</p>
          )}
          {width && width < 1000 && (
            <p>{t.heroDescriptionMobile2}</p>
          )}
          <p>{t.reveal1}</p>
          <p>{t.reveal2}</p>
          <p>{t.reveal3}</p>
          <p>{t.reveal4}</p>
          <p>{t.reveal5}</p>
          <p>{t.reveal6}</p>
        </ScrollReveal>
      </section>

      <section className="lg:h-[80vh] h-auto w-screen max-w-[1608px] flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 p-5 mt-20">
        <div className="lg:h-full h-[45%] max-w-screen flex flex-col items-start justify-center gap-6 p-10">
          <p className="text-[#EED5B2] font-jakarta text-xs font-normal leading-3.5 tracking-[4.8px] uppercase">{t.servicesLabel}</p>
          <div className="lg:max-w-[320px] flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-fraunces text-white font-light text-[32px] leading-8">{t.servicesHeading1}</span>
            <span className="font-fraunces-italic text-white font-light text-[32px] leading-8">{t.servicesHeading2}</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-[16px] leading-6 tracking-[-0.32px]">
            {t.servicesDescription}
          </p>
        </div>

        <div className="lg:max-w-[1148px] w-screen lg:h-full h-[45%] flex flex-wrap items-center justify-center mx-auto p-10 pr-0 lg:pr-10">
          {/* Load Unicorn Studio once here, after all ServiceCards are in the DOM */}
          <Script
            src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
            strategy="afterInteractive"
            onLoad={() => {
              // @ts-ignore
              window.UnicornStudio?.init();
            }}
          />
          <Swiper
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1.12, spaceBetween: 12, slidesOffsetBefore: 2, slidesOffsetAfter: 20 },
              480: { slidesPerView: 1.15, spaceBetween: 12, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
              640: { slidesPerView: 1.15, spaceBetween: 14, slidesOffsetBefore: 24, slidesOffsetAfter: 24 },
              1024: { slidesPerView: 1.5, spaceBetween: 18, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
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
          <p className="text-[#EED5B2] font-jakarta text-xs font-normal leading-3.5 tracking-[4.8px] uppercase ">{t.partnersLabel}</p>
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-fraunces text-white font-light text-[32px] leading-8">{t.partnersHeading1}</span>
            <span className="font-fraunces-italic text-[#6B7280] font-light text-[32px] leading-8">{t.partnersHeading2}</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-[16px] leading-6 tracking-[-0.32px]">
            {t.partnersDescription}
          </p>
        </div>
      </section>
      <LogoCloud logos={imageLogos} />

      <section className="lg:h-[80vh] h-screen w-screen max-w-screen flex flex-col items-center justify-center mt-10">
        {(() => {
          const activePartner = partners.slice(0, 5)[carouselIndex];
          return (
            <div className="flex w-full items-center justify-center lg:justify-between lg:px-20 mb-8">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="font-jakarta text-xs text-[#6B7280] font-normal leading-4 tracking-[1.2px] uppercase">
                  {activePartner?.service ?? "—"}
                </p>
                <p className="font-fraunces text-[28px] text-white font-light leading-[33.6px] tracking-[-0.56px]">
                  {activePartner?.name ?? "—"}
                </p>
              </div>
              {width && width > 850 && (
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="font-jakarta text-xs text-[#6B7280] font-normal leading-4 tracking-[1.2px] uppercase">{t.partnersYearLabel}</p>
                  <p className="font-fraunces text-[28px] text-white font-light leading-[33.6px] tracking-[-0.56px]">
                    {activePartner?.year ?? "—"}
                  </p>
                </div>
              )}
            </div>
          );
        })()}
        <CoverflowCarousel
          items={partners.slice(0, 5).map((p) => ({
            videoSrc: p.mainVideo ?? "/partners/brutariabardar/video1.mp4",
            title: p.category ?? p.name,
            alt: p.name,
          }))}
          initialSlide={2}
          onActiveIndexChange={setCarouselIndex}
        />
      </section>

      <section id="project-request" className="relative min-h-screen w-screen flex flex-col items-center justify-center mt-10 py-10">

        {/* {width && width > 850 && (
            <>
              <div
                data-us-project="GxA3xsXp539xHAR5y0Qp"
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
              />
            </>
          )} */}

        <div className="h-[20%] max-w-[800px] flex flex-col items-center justify-center gap-6 p-10 mt-[10%]">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-4 gap-y-2">
            <span className="font-fraunces text-white text-center font-light text-[40px] lg:text-[70px] flex items-center justify-between gap-4">{t.ctaLine1} <span className="font-fraunces-italic text-right">{t.ctaLine1Italic}</span> </span>
            <span className="font-fraunces-italic text-white lg:text-left font-light text-[40px] lg:text-[70px]">{t.ctaLine2}</span>
          </div>

          <p className="text-[#787885] font-jakarta font-normal text-center text-[16px] lg:text-[20px] leading-6 tracking-[-0.32px]">
            {t.ctaDescription}
          </p>
        </div>
        <ProjectForm />
      </section>

      <Footer />

    </main>
  );
}
