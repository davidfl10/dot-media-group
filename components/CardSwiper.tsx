import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Link from 'next/link';

// Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

const slides = [
    { id: 1, text: "Consulting", href: "consulting", color: "bg-[#662221]" },
    { id: 2, text: "Digital Marketing", href: "digital-marketing", color: "bg-[#041A2F]" },
    { id: 3, text: "IT Solutions", href: "it-solutions", color: "bg-[#2A382B]" },
    { id: 4, text: "Ads Management", href: "ads-management", color: "bg-[#31271E]" },
];

const CardSwiper = () => {
    return (
        <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="w-full h-full"
        >
            {slides.map((slide) => (
                <SwiperSlide
                    key={slide.id}
                >
                    <Link href={`/services/${slide.href}`} className={`${slide.color} w-full h-full rounded-2xl font-secondary flex items-center justify-center text-center p-4 shadow-lg`}>
                        {slide.text}
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CardSwiper;
