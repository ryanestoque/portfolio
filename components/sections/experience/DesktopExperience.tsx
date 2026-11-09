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
  const [hasInteracted, setHasInteracted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tooltipX = useTransform(mouseX, (x) => x + 20);
  const tooltipY = useTransform(mouseY, (y) => y + 20);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pointerRef = useRef<{ x: number; y: number; hasPosition: boolean }>({
    x: 0,
    y: 0,
    hasPosition: false,
  });

  const activateRow = useCallback((idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex((prev) => (prev === idx ? prev : idx));
    setActiveIndex((prev) => {
      if (prev !== idx) setHasInteracted(true);
      return idx;
    });
  }, []);

  const clearHoveredRow = useCallback(() => {
    setHoveredIndex((prev) => (prev === null ? prev : null));
    setActiveIndex((prev) => {
      if (prev !== 0) setHasInteracted(true);
      return 0;
    });
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const syncRowUnderCursor = () => {
      rafId = null;
      if (!pointerRef.current.hasPosition) return;

      // Skip hit-testing if the section itself is completely off-screen
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          clearHoveredRow();
          return;
        }
      }

      const el = document.elementFromPoint(
        pointerRef.current.x,
        pointerRef.current.y
      );
      const rowEl = el?.closest<HTMLElement>("[data-exp-index]");

      if (rowEl) {
        const idx = Number(rowEl.dataset.expIndex);
        if (!Number.isNaN(idx)) {
          activateRow(idx);
        }
      } else {
        clearHoveredRow();
      }
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.hasPosition = true;
    };

    const onWindowWheel = (e: WheelEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.hasPosition = true;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (rafId === null) {
        rafId = requestAnimationFrame(syncRowUnderCursor);
      }
    };

    const handleScroll = () => {
      if (!pointerRef.current.hasPosition) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(syncRowUnderCursor);
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });
    window.addEventListener("wheel", onWindowWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("wheel", onWindowWheel);
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activateRow, clearHoveredRow, mouseX, mouseY]);

  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const openCertificate = useCallback((src: string, company: string) => {
    setLightbox({ open: true, src, alt: `${company} Certificate` });
  }, []);

  const handleMouseEnterRow = useCallback(
    (i: number) => {
      activateRow(i);
    },
    [activateRow]
  );

  const handleMouseLeaveRow = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (pointerRef.current.hasPosition) {
        const el = document.elementFromPoint(
          pointerRef.current.x,
          pointerRef.current.y
        );
        const rowEl = el?.closest<HTMLElement>("[data-exp-index]");
        if (rowEl) {
          const idx = Number(rowEl.dataset.expIndex);
          if (!Number.isNaN(idx)) {
            activateRow(idx);
            return;
          }
        }
      }
      clearHoveredRow();
    }, 50);
  }, [activateRow, clearHoveredRow]);

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

          {/* ── Tooltip (GPU-composited via transform x/y) ── */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] will-change-transform"
            style={{
              x: tooltipX,
              y: tooltipY,
            }}
          >
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  className="max-w-sm bg-surface-elevated border border-border p-4 shadow-2xl"
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
          </motion.div>

          {/* ── Two-Column Layout ─────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: Sticky Image Container (Aspect Square) */}
            <div className="hidden lg:block sticky top-32 w-full">
              <div
                className="experience-image-container relative aspect-square w-full overflow-hidden border border-border bg-accent"
                data-cursor="target"
              >
                {experiences.map((exp, i) => {
                  const isActive = i === activeIndex;

                  return (
                    <motion.div
                      key={exp.id}
                      className="absolute inset-0 will-change-[clip-path]"
                      initial={{
                        clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                        zIndex: i === 0 ? 2 : 1,
                      }}
                      animate={
                        isActive
                          ? {
                              clipPath: hasInteracted
                                ? ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
                                : "inset(0% 0% 0% 0%)",
                              zIndex: 2,
                            }
                          : {
                              clipPath: "inset(0% 0% 100% 0%)",
                              zIndex: 1,
                            }
                      }
                      transition={{ duration: 0.6, ease }}
                    >
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        fill
                        priority={i === 0}
                        loading="eager"
                        decoding="sync"
                        onLoad={(e) => {
                          e.currentTarget.decode?.().catch(() => {});
                        }}
                        className="object-cover"
                        style={{ objectPosition: exp.imagePosition || "center" }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  );
                })}

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Experience List */}
            <div
              className="relative w-full"
              onMouseMove={(e) => {
                pointerRef.current.x = e.clientX;
                pointerRef.current.y = e.clientY;
                pointerRef.current.hasPosition = true;
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);

                const target = e.target as HTMLElement | null;
                const rowEl = target?.closest?.("[data-exp-index]") as HTMLElement | null;
                if (rowEl) {
                  const idx = Number(rowEl.dataset.expIndex);
                  if (!Number.isNaN(idx)) {
                    activateRow(idx);
                  }
                }
              }}
              onMouseEnter={(e) => {
                pointerRef.current.x = e.clientX;
                pointerRef.current.y = e.clientY;
                pointerRef.current.hasPosition = true;
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
                    isHovered={hoveredIndex === i}
                    isDimmed={hoveredIndex !== null && hoveredIndex !== i}
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
