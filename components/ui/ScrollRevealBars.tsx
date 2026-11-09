"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollRevealBarsProps {
  children: React.ReactNode;
  className?: string;
  numberOfBars?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}

export const ScrollRevealBars: React.FC<ScrollRevealBarsProps> = ({
  children,
  className,
  numberOfBars = 1,
  duration = 0.8,
  stagger = 0.1,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bars = barsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (bars.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Initial state: bars cover the element
        gsap.set(bars, { scaleX: 1, transformOrigin: "right" });

        // Animation to reveal
        gsap.to(bars, {
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
          },
          scaleX: 0,
          duration,
          stagger,
          delay,
          ease: "power4.inOut",
        });
      }, container);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(bars, { scaleX: 0 });
    });

    return () => mm.revert();
  }, [duration, stagger, delay, numberOfBars]);

  return (
    <span ref={containerRef} className={cn("relative overflow-hidden inline-block", className)}>
      {children}
      {/* Absolute overlay for the bars */}
      <span
        className="absolute inset-0 flex flex-col pointer-events-none z-10 motion-reduce:hidden [[data-no-js]_&]:hidden"
        aria-hidden="true"
      >
        {Array.from({ length: numberOfBars }).map((_, index) => (
          <span
            key={index}
            ref={(el) => {
              barsRef.current[index] = el;
            }}
            className="flex-1 bg-foreground w-full origin-right"
          />
        ))}
      </span>
      <noscript>
        <style>{`.motion-reduce\\:hidden { display: none !important; }`}</style>
      </noscript>
    </span>
  );
};
