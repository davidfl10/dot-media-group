import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Link from 'next/link';

// Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { useTheme } from "@/context/ThemeContext";


const CardSwiper = () => {
    const { theme } = useTheme();

    const slides = [
        { id: 1, text: "Consulting", href: "consulting", color: theme === "black" ? "bg-[#662221]" : "bg-[#C44D4D]" },
        { id: 2, text: "Digital Marketing", href: "digital-marketing", color: theme === "black" ? "bg-[#041A2F]" : "bg-[#93C6F6]"},
        { id: 3, text: "IT Solutions", href: "it-solutions", color: theme === "black" ? "bg-[#2A382B]" : "bg-[#89CF80]"},
        { id: 4, text: "Ads Management", href: "ads-management", color: theme === "black" ? "bg-[#31271E]" : "bg-[#704343]"},
    ];

    return (
        <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            loop={true}
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
