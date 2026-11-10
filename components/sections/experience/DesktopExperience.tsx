"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { experiences, type Experience } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import { ease } from "@/lib/animations";
import DesktopExperienceRow from "./DesktopExperienceRow";

const TOOLTIP_WIDTH = 384; // max-w-sm (24rem)
const TOOLTIP_ESTIMATED_HEIGHT = 148;
const TOOLTIP_OFFSET = 20;
const VIEWPORT_PADDING = 16;

export default function DesktopExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [shouldEagerLoad, setShouldEagerLoad] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tooltipX = useTransform(mouseX, (x) => {
    if (typeof window === "undefined") return x + TOOLTIP_OFFSET;
    const maxX = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING;
    if (x + TOOLTIP_OFFSET > maxX) {
      return Math.max(VIEWPORT_PADDING, x - TOOLTIP_WIDTH - TOOLTIP_OFFSET);
    }
    return x + TOOLTIP_OFFSET;
  });

  const tooltipY = useTransform(mouseY, (y) => {
    if (typeof window === "undefined") return y + TOOLTIP_OFFSET;
    const maxY =
      window.innerHeight - TOOLTIP_ESTIMATED_HEIGHT - VIEWPORT_PADDING;
    if (y + TOOLTIP_OFFSET > maxY) {
      return Math.max(
        VIEWPORT_PADDING,
        y - TOOLTIP_ESTIMATED_HEIGHT - TOOLTIP_OFFSET
      );
    }
    return y + TOOLTIP_OFFSET;
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pointerRef = useRef<{ x: number; y: number; hasPosition: boolean }>({
    x: 0,
    y: 0,
    hasPosition: false,
  });

  const activateRow = useCallback((idx: number, fromKeyboard = false) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsKeyboardFocused(fromKeyboard);
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
    setIsKeyboardFocused(false);
    setIsBtnHovered(false);
  }, []);

  // Preload desktop experience images only when on desktop (>= 1024px) and approaching the section
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (!desktopMedia.matches) return;
      if (observer) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldEagerLoad(true);
            observer?.disconnect();
            observer = null;
          }
        },
        { rootMargin: "600px 0px" }
      );
      observer.observe(sectionEl);
    };

    setupObserver();
    desktopMedia.addEventListener("change", setupObserver);

    return () => {
      desktopMedia.removeEventListener("change", setupObserver);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    let rafId: number | null = null;

    const syncRowUnderCursor = () => {
      rafId = null;
      if (
        !desktopMedia.matches ||
        !pointerRef.current.hasPosition ||
        lightboxOpenRef.current
      ) {
        return;
      }

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
          activateRow(idx, false);
        }
      } else {
        clearHoveredRow();
      }
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      if (!desktopMedia.matches) return;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.hasPosition = true;
    };

    const onWindowWheel = (e: WheelEvent) => {
      if (!desktopMedia.matches) return;
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
      if (!desktopMedia.matches || !pointerRef.current.hasPosition) return;
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
    title: string;
    subtitle: string;
  }>({ open: false, src: "", alt: "", title: "", subtitle: "" });
  const lightboxOpenRef = useRef(false);
  lightboxOpenRef.current = lightbox.open;

  const openCertificate = useCallback((exp: Experience) => {
    if (!exp.certificate) return;
    setLightbox({
      open: true,
      src: exp.certificate,
      alt: `${exp.company} Certificate`,
      title: exp.company,
      subtitle: `${exp.role} · ${exp.dateRange}`,
    });
  }, []);

  const handleMouseEnterRow = useCallback(
    (i: number) => {
      activateRow(i, false);
    },
    [activateRow]
  );

  const handleFocusRow = useCallback(
    (i: number) => {
      activateRow(i, true);
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
            activateRow(idx, false);
            return;
          }
        }
      }
      clearHoveredRow();
    }, 50);
  }, [activateRow, clearHoveredRow]);

  const showFloatingTooltip =
    hoveredIndex !== null && !isBtnHovered && !isKeyboardFocused;

  return (
    <>
      <section
        ref={sectionRef}
        aria-labelledby="desktop-experience-heading"
        className="hidden lg:block relative py-32 md:py-40"
      >
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* ── Section Header ────────────────────── */}
          <div>
            <div className="mb-16">
              <SectionHeader number="III" label="ROAD TO MASTERY" />
            </div>

            <div className="mb-20">
              <h2
                id="desktop-experience-heading"
                className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl flex flex-col items-start"
              >
                <ScrollRevealBars duration={1} delay={0}>
                  <span>
                    <span className="font-normal">Enrolled</span> in
                  </span>
                </ScrollRevealBars>
                <ScrollRevealBars duration={1} delay={0.15}>
                  <span>experiences.</span>
                </ScrollRevealBars>
              </h2>
            </div>
          </div>

          {/* ── Tooltip (GPU-composited via transform x/y, clamped to viewport) ── */}
          <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{
              x: tooltipX,
              y: tooltipY,
            }}
          >
            <AnimatePresence>
              {showFloatingTooltip && hoveredIndex !== null && (
                <motion.div
                  className="max-w-sm bg-surface-elevated border border-border p-4 shadow-2xl"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 10, scale: 0.95 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: 10, scale: 0.95 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
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
            {/* Left: Sticky Image Container (Aspect Square, Flat Blueprint Frame) */}
            <div className="hidden lg:block sticky top-32 w-full">
              <div
                className="relative aspect-square w-full overflow-hidden border border-border bg-accent"
                data-cursor="target"
              >
                {experiences.map((exp, i) => {
                  const isActive = i === activeIndex;

                  return (
                    <motion.div
                      key={exp.id}
                      className={`absolute inset-0 ${
                        isActive ? "will-change-[clip-path]" : ""
                      }`}
                      initial={{
                        clipPath:
                          i === 0
                            ? "inset(0% 0% 0% 0%)"
                            : "inset(0% 0% 100% 0%)",
                        zIndex: i === 0 ? 2 : 1,
                      }}
                      animate={
                        isActive
                          ? {
                              clipPath:
                                hasInteracted && !prefersReducedMotion
                                  ? [
                                      "inset(100% 0% 0% 0%)",
                                      "inset(0% 0% 0% 0%)",
                                    ]
                                  : "inset(0% 0% 0% 0%)",
                              zIndex: 2,
                            }
                          : {
                              clipPath: "inset(0% 0% 100% 0%)",
                              zIndex: 1,
                            }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.6,
                        ease,
                      }}
                    >
                      <Image
                        src={exp.image}
                        alt={exp.imageAlt}
                        fill
                        loading={shouldEagerLoad ? "eager" : "lazy"}
                        className="object-cover"
                        style={{
                          objectPosition: exp.imagePosition || "center",
                        }}
                        sizes="(max-width: 1024px) 1px, 50vw"
                      />
                    </motion.div>
                  );
                })}

                {/* Keyboard-focus docked description panel */}
                <AnimatePresence>
                  {isKeyboardFocused && hoveredIndex !== null && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        prefersReducedMotion ? undefined : { opacity: 0, y: 8 }
                      }
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      className="absolute bottom-0 inset-x-0 z-20 bg-surface-elevated border-t border-border p-5"
                    >
                      <p className="text-sm text-text-primary leading-relaxed">
                        {experiences[hoveredIndex].description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                const rowEl = target?.closest?.(
                  "[data-exp-index]"
                ) as HTMLElement | null;
                if (rowEl) {
                  const idx = Number(rowEl.dataset.expIndex);
                  if (!Number.isNaN(idx)) {
                    activateRow(idx, false);
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
                    onFocusRow={handleFocusRow}
                    onBlurRow={clearHoveredRow}
                    onBtnHoverChange={setIsBtnHovered}
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
        title={lightbox.title}
        subtitle={lightbox.subtitle}
        onClose={() => setLightbox((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
