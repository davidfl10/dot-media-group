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
                            {words.map((word : any, wordIndex: any) => {
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

        const scroller =
            scrollContainerRef?.current ?? window;

        // ROTATION (whole block)
        gsap.fromTo(
            el,
            { rotate: baseRotation, transformOrigin: "0% 50%" },
            {
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: "top bottom",
                    end: rotationEnd,
                    scrub: scrubSpeed
                }
            }
        );

        const lines = el.querySelectorAll<HTMLElement>(".line-inner");
        const words = el.querySelectorAll<HTMLElement>(".word");

        // LINE SLIDE UP (paragraph by paragraph)
        gsap.fromTo(
            lines,
            { yPercent: 100 },
            {
                yPercent: 0,
                ease: "power2.out",
                stagger: lineStagger,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: "top bottom-=20%",
                    end: wordAnimationEnd,
                    scrub: scrubSpeed
                }
            }
        );

        // WORD OPACITY + BLUR
        gsap.fromTo(
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
                stagger: {
                    each: wordStagger
                },
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: "top bottom-=20%",
                    end: wordAnimationEnd,
                    scrub: scrubSpeed
                }
            }
        );

        // CLEANUP (only this component’s triggers)
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === el) {
                    trigger.kill();
                }
            });
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
        rotationEnd,
        wordAnimationEnd
    ]);

    return (
        <div ref={containerRef} className={`my-5 mx-0 ${containerClassName}`}>
            <div className={`text-center text-neutral-50 self-stretch font-fraunces text-2xl lg:text-5xl leading-7 lg:leading-14 font-light tracking-[-0.48px] lg:tracking-[-0.96px] ${textClassName} ${containerClassName}`}>{splitText}</div>
        </div>
    );
};

export default ScrollReveal;
