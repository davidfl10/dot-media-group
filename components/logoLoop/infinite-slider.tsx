'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    speed?: number;
    durationOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    className?: string;
};

export function InfiniteSlider({
    children,
    gap = 16,
    speed = 60,
    durationOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const translation = useMotionValue(0);
    const animationRef = useRef<any>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);

    useEffect(() => {
        if (!contentRef.current) return;

        const size =
            direction === 'horizontal'
                ? contentRef.current.scrollWidth / 6
                : contentRef.current.scrollHeight / 6;

        const controls = animate(translation,
            reverse ? [0, size] : [0, -size],
            {
                ease: 'linear',
                duration: size / speed,
                repeat: Infinity,
                repeatType: 'loop',
            }
        );

        animationRef.current = controls;

        return () => controls.stop();
    }, [direction, reverse, speed]);

    //   const handleHoverStart = () => {
    //     if (!durationOnHover) return;
    //     isHoveredRef.current = true;
    //     animationRef.current?.stop();

    //     if (!contentRef.current) return;

    //     const size = direction === 'horizontal' 
    //       ? contentRef.current.scrollWidth / 2
    //       : contentRef.current.scrollHeight / 2;

    //     const from = reverse ? -size : 0;
    //     const to = reverse ? 0 : -size;
    //     const currentPosition = translation.get();

    //     const animationDuration = size / durationOnHover;

    //     animationRef.current = animate(
    //       translation,
    //       [currentPosition, to],
    //       {
    //         ease: 'linear',
    //         repeat: Infinity,
    //         repeatType: 'loop',
    //         repeatDelay: 0,
    //       }
    //     );
    //   };

    //   const handleHoverEnd = () => {
    //     if (!durationOnHover) return;
    //     isHoveredRef.current = false;
    //     animationRef.current?.stop();

    //     if (!contentRef.current) return;

    //     const size = direction === 'horizontal' 
    //       ? contentRef.current.scrollWidth / 2
    //       : contentRef.current.scrollHeight / 2;

    //     const from = reverse ? -size : 0;
    //     const to = reverse ? 0 : -size;
    //     const currentPosition = translation.get();

    //     const animationDuration = size / speed;

    //     animationRef.current = animate(
    //       translation,
    //       [currentPosition, to],
    //       {
    //         ease: 'linear',
    //         repeat: Infinity,
    //         repeatType: 'loop',
    //         repeatDelay: 0,
    //       }
    //     );
    //   };

    //   const hoverProps = durationOnHover
    //     ? {
    //         onMouseEnter: handleHoverStart,
    //         onMouseLeave: handleHoverEnd,
    //       }
    //     : {};

    return (
        <div className={cn('w-full', className)}>
            <motion.div
                className='flex'
                style={{
                    ...(direction === 'horizontal'
                        ? { x: translation }
                        : { y: translation }),
                    gap: `${gap}px`,
                    flexDirection: direction === 'horizontal' ? 'row' : 'column',
                }}
                ref={contentRef}
            // {...hoverProps}
            >
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}
