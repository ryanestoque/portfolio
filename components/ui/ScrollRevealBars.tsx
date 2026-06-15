"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure plugin is registered again just in case
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Initial state: bars cover the element
      gsap.set(barsRef.current, { scaleX: 1, transformOrigin: "right" });

      // Animation to reveal
      gsap.to(barsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Trigger when top of container hits 85% of viewport
        },
        scaleX: 0,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [duration, stagger]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden inline-block", className)}>
      {children}
      {/* Absolute overlay for the bars */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-10" aria-hidden="true">
        {Array.from({ length: numberOfBars }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              barsRef.current[index] = el;
            }}
            className="flex-1 bg-foreground w-full origin-right"
          />
        ))}
      </div>
    </div>
  );
};
