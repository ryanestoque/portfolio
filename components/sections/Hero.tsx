"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

function AbstractVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-full lg:h-full">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/images/hero/ryan-the-hacker.webp"
            alt="Ryan Estoque"
            fill
            className="object-cover" style={{ objectPosition: "center 60%" }}
            priority
          />
        </div>

        <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-l-2 border-accent" />
        <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-r-2 border-accent" />
        <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-l-2 border-accent" />
        <div className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-r-2 border-accent" />
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const headingLine1 = "Ryan";
  const headingLine2 = "Estoque";

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[100px] lg:pt-[0px] pb-24 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-0 lg:min-h-[calc(100vh-72px)] w-full">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-last mt-4 lg:mt-0">
            <motion.div
              data-hero="location"
              className="flex items-center justify-center lg:justify-start gap-3 mb-8 lg:mb-12"
            >
              <svg className="w-4 h-4 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-xs tracking-[0.3em] uppercase text-text-secondary font-normal">
                Davao City, Philippines
              </span>
            </motion.div>

            <motion.div
              className="overflow-hidden"
            >
              <motion.h1 className="font-heading font-semibold leading-[1] tracking-tight flex flex-col sm:flex-row lg:flex-col justify-center lg:justify-start items-center lg:items-start sm:gap-4 lg:gap-0">
                <span className="block overflow-hidden">
                    <motion.span
                      data-hero="firstname"
                      className="block text-[clamp(5rem,10vw,9rem)] text-gradient"
                    >
                      {headingLine1}
                    </motion.span>
                </span>

                {/* Line 2 */}
                <span className="block overflow-hidden">
                    <motion.span
                      data-hero="lastname"
                      className="block text-[clamp(5rem,10vw,9rem)] text-gradient"
                    >
                      {headingLine2}
                    </motion.span>
                </span>
              </motion.h1>
            </motion.div>

            <motion.h6
              data-hero="role"
              className="mt-3 lg:mt-4 text-xl leading-relaxed text-text-primary font-normal flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <span className="w-6 lg:w-8 h-[1px] bg-text-primary block rounded-full"></span>
              <span>Full Stack Developer</span>
              <span className="w-6 h-[1px] bg-text-primary block rounded-full lg:hidden"></span>
            </motion.h6>

            <motion.div data-hero="cta" className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 lg:mt-10">
              <a
                href="https://github.com/ryanestoque"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 text-xs font-medium uppercase tracking-wider bg-accent text-background overflow-hidden transition-all duration-300 hover:opacity-80"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
                {/* <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg> */}
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 text-xs font-medium uppercase tracking-wider border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>View CV</span>
                {/* <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-300" /> */}
              </a>
            </motion.div>
          </div>

          <motion.div
            data-hero="image"
            className="flex items-center justify-center relative order-first shrink-0"
          >
            <div className="relative w-full max-w-[240px] max-h-[240px] sm:max-w-[280px] sm:max-h-[280px] lg:max-w-none lg:max-h-none lg:w-[clamp(400px,40vw,580px)] lg:h-[clamp(400px,40vw,580px)] aspect-square">
              <AbstractVisual />
            </div>
          </motion.div>
        </div>
      </div>

      {/* <ScrollIndicator /> */}
    </section>
  );
}
