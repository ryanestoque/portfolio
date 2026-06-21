"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import { ease } from "@/lib/animations";
import DesktopExperienceRow from "./DesktopExperienceRow";

export default function DesktopExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tooltipX = useTransform(mouseX, (x) => x + 20);
  const tooltipY = useTransform(mouseY, (y) => y + 20);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const activeExperience = experiences[activeIndex];

  const openCertificate = useCallback((src: string, company: string) => {
    setLightbox({ open: true, src, alt: `${company} Certificate` });
  }, []);

  const handleMouseEnterRow = useCallback((i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(i);
    setActiveIndex(i);
  }, []);

  const handleMouseLeaveRow = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 50);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="hidden lg:block relative py-32 md:py-40"
      >
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* ── Section Header ────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-16">
              <SectionHeader number="03" label="ROAD TO MASTERY" />
            </div>

            <div className="mb-20">
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl flex flex-col items-start">
                <ScrollRevealBars duration={1} delay={0}>
                  <span><span className="font-normal">Enrolled</span> in</span>
                </ScrollRevealBars>
                <ScrollRevealBars duration={1} delay={0.15}>
                  <span>experiences.</span>
                </ScrollRevealBars>
              </h2>
            </div>
          </div>

          {/* ── Tooltip ───────────────────────────── */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                className="fixed pointer-events-none z-[100] max-w-sm bg-surface-elevated backdrop-blur-md border border-border p-4 shadow-2xl"
                style={{
                  left: tooltipX,
                  top: tooltipY
                }}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-text-primary leading-relaxed">
                  {experiences[hoveredIndex].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Two-Column Layout ─────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: Sticky Image Container (Aspect Square) */}
            <div className="hidden lg:block sticky top-32 w-full">
              <div
                className="experience-image-container relative aspect-square w-full overflow-hidden border border-border bg-accent"
                data-cursor="target"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExperience.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <Image
                      src={activeExperience.image}
                      alt={activeExperience.company}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Experience List */}
            <div
              className="relative w-full"
              onMouseMove={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
              }}
              onMouseEnter={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
              }}
            >
              <div className="border-t border-border">
                {experiences.map((exp, i) => (
                  <DesktopExperienceRow
                    key={exp.id}
                    exp={exp}
                    i={i}
                    hoveredIndex={hoveredIndex}
                    onMouseEnterRow={handleMouseEnterRow}
                    onMouseLeaveRow={handleMouseLeaveRow}
                    openCertificate={openCertificate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificateLightbox
        isOpen={lightbox.open}
        imageSrc={lightbox.src}
        altText={lightbox.alt}
        onClose={() => setLightbox({ open: false, src: "", alt: "" })}
      />
    </>
  );
}
