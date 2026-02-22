"use client";
import React, {
    useEffect,
    useRef,
    useMemo,
    ReactNode,
    RefObject
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    lineStagger?: number;
    wordStagger?: number;
    rotationEnd?: string;
    wordAnimationEnd?: string;
    containerClassName?: string;
    textClassName?: string;
    scrubSpeed?: number | boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    lineStagger = 0.35,
    wordStagger = 0.05,
    rotationEnd = "bottom bottom",
    wordAnimationEnd = "bottom bottom",
    containerClassName = "",
    textClassName = "",
    scrubSpeed = true
}) => {
    const containerRef = useRef<HTMLDivElement>(null);


    const splitText = useMemo(() => {
        const childrenArray = React.Children.toArray(children);

        return childrenArray.map((child, lineIndex) => {
            if (
                React.isValidElement<{ children: string }>(child) &&
                typeof child.props.children === "string"
            ) {
                const words = child.props.children.split(/(\s+)/);

                return (
                    <span className="line block overflow-hidden" key={lineIndex}>
                        <span className="line-inner inline-block">
                            {words.map((word: any, wordIndex: any) => {
                                if (/^\s+$/.test(word)) return word;
                                return (
                                    <span className="word inline-block" key={wordIndex}>
                                        {word}
                                    </span>
                                );
                            })}
                        </span>
                    </span>
                );
            }

            // fallback if child is not simple text
            return (
                <span className="line block overflow-hidden" key={lineIndex}>
                    <span className="line-inner inline-block">{child}</span>
                </span>
            );
        });
    }, [children]);


    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef?.current ?? window;

        const lines = el.querySelectorAll<HTMLElement>(".line-inner");
        const words = el.querySelectorAll<HTMLElement>(".word");

        // 1. Create a master timeline and PIN the container
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scroller,
                pin: true, // Locks the section in place!
                start: "center center", // Pins when the center of the element hits the center of the screen
                end: "+=10%", // The "trap" distance. Increase to "+=200%" to make the scroll feel slower/longer.
                scrub: scrubSpeed,
            }
        });

        // 2. Add all animations to the timeline. 
        // The "0" at the end of each line ensures they all start at the exact same time.

        // ROTATION (whole block)
        tl.fromTo(
            el,
            { rotate: baseRotation, transformOrigin: "0% 50%" },
            { rotate: 0, ease: "none" },
            0
        );

        // LINE SLIDE UP (paragraph by paragraph)
        tl.fromTo(
            lines,
            { yPercent: 100 },
            { yPercent: 0, ease: "power2.out", stagger: lineStagger },
            0
        );

        // WORD OPACITY + BLUR
        tl.fromTo(
            words,
            {
                opacity: baseOpacity,
                filter: enableBlur ? `blur(${blurStrength}px)` : "none",
                willChange: "opacity, filter"
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                ease: "none",
                stagger: { each: wordStagger }
            },
            0
        );

        // CLEANUP
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            tl.kill();
        };
    }, [
        children,
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        blurStrength,
        lineStagger,
        wordStagger,
        scrubSpeed
    ]);

    return (
        <div ref={containerRef} className={`my-5 mx-0 ${containerClassName}`}>
            <div className={`text-center text-neutral-50 self-stretch font-fraunces text-2xl lg:text-5xl leading-7 lg:leading-14 font-light tracking-[-0.48px] lg:tracking-[-0.96px] ${textClassName} ${containerClassName}`}>{splitText}</div>
        </div>
    );
};

export default ScrollReveal;
