"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { FileText, ChevronDown } from "lucide-react";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

/* ──────────────────────────────────────────────── */
/*  Desktop Experience Section                      */
/* ──────────────────────────────────────────────── */
function DesktopExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const activeIndex = hoveredIndex ?? 0;
  const activeExperience = experiences[activeIndex];

  const openCertificate = (src: string, company: string) => {
    setLightbox({ open: true, src, alt: `${company} Certificate` });
  };

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
              <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">
                03
              </span>
              <div className="w-12 h-[1px] bg-accent/50" />
              <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">
                ROAD TO MASTERY
              </span>
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
                className="fixed pointer-events-none z-[100] max-w-sm bg-surface-el/90 backdrop-blur-md border border-border p-4 shadow-2xl"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y + 20
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
                className="experience-image-container relative aspect-square w-full overflow-hidden border border-border bg-surface-elevated"
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
              onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
            >
              <div className="border-t border-border">
                {experiences.map((exp, i) => (
                  <div
                    key={exp.id}
                    className="experience-row"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      opacity:
                        hoveredIndex !== null && hoveredIndex !== i ? 0.35 : 1,
                    }}
                  >
                    {/* Background Fill */}
                    <div
                      className="experience-row-bg"
                      style={{
                        transform:
                          hoveredIndex === i ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />

                    {/* Row Content */}
                    <div className="relative z-10 flex items-center justify-between gap-6 py-7 px-5">
                      {/* Left Column: Company, Role, and Date */}
                      <div className="flex-1 min-w-0 flex items-center justify-between pr-4">
                        <div className="flex flex-col">
                          <span className="font-heading text-lg xl:text-xl font-semibold text-text-primary block">
                            {exp.company}
                          </span>
                          <span className="font-heading text-sm xl:text-base font-medium text-text-secondary mt-1 block">
                            {exp.role}
                          </span>
                        </div>
                        <span className="text-sm tracking-wide text-text-tertiary whitespace-nowrap ml-6">
                          {exp.dateRange}
                        </span>
                      </div>
                      {/* Right Column: Certificate Button */}
                      <div className="flex-shrink-0 min-w-[80px] flex justify-end relative group">
                        <button
                          onClick={(e) => {
                            if (!exp.certificateAvailable) return;
                            e.stopPropagation();
                            if (exp.certificate) openCertificate(exp.certificate, exp.company);
                          }}
                          disabled={!exp.certificateAvailable}
                          className={`inline-flex items-center gap-1.5 px-2 py-2 border transition-all duration-300 ${
                            exp.certificateAvailable 
                              ? "border-border text-text-tertiary hover:text-text-primary hover:border-accent/40 cursor-pointer"
                              : "border-border/50 text-text-tertiary/50 cursor-not-allowed"
                          }`}
                          aria-label={exp.certificateAvailable ? `View ${exp.company} certificate` : "Certificate not yet available"}
                        >
                          <FileText className="w-5 h-5" />
                        </button>

                        {/* Tooltip */}
                        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-background border border-border text-xs tracking-wider text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                          {exp.certificateAvailable ? "View certificate" : "Certificate not yet available"}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
                  </div>
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

/* ──────────────────────────────────────────────── */
/*  Mobile Experience Section                       */
/* ──────────────────────────────────────────────── */
function MobileExperience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const openCertificate = (src: string, company: string) => {
    setLightbox({ open: true, src, alt: `${company} Certificate` });
  };

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section
        className="lg:hidden relative py-32 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
              04
            </span>
            <div className="w-12 h-[1px] bg-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
              ROAD TO MASTERY
            </span>
          </div>

          <div className="mb-14">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient flex flex-col items-start">
              <ScrollRevealBars duration={1} delay={0}>
                <span><span className="font-normal">Enrolled</span> in</span>
              </ScrollRevealBars>
              <ScrollRevealBars duration={1} delay={0.15}>
                <span>experiences.</span>
              </ScrollRevealBars>
            </h2>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col border-t border-border">
            {experiences.map((exp, i) => {
              const isExpanded = expandedId === exp.id;

              return (
                <div
                  key={exp.id}
                  className="border-b border-border bg-surface overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(exp.id)}
                    className="w-full flex items-center justify-between py-6 px-4 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="font-heading text-lg font-semibold text-text-primary">
                        {exp.company}
                      </span>
                      <span className="font-heading text-sm font-medium text-text-secondary">
                        {exp.role}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className="flex-shrink-0 text-text-tertiary"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      >
                        <div className="pb-6 px-4">
                          {/* Image at top */}
                          <div className="relative aspect-video w-full overflow-hidden mb-6 bg-border/20 rounded-sm">
                            <Image
                              src={exp.image}
                              alt={exp.company}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>

                          {/* Date Range & Description */}
                          <div className="flex flex-col gap-4 mb-6">
                            <span className="text-sm tracking-wide text-primary font-medium">
                              {exp.dateRange}
                            </span>
                            <p className="text-sm text-text-secondary leading-relaxed">
                              {exp.description}
                            </p>
                          </div>

                          {/* Certificate Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!exp.certificateAvailable) return;
                              if (exp.certificate) openCertificate(exp.certificate, exp.company);
                            }}
                            disabled={!exp.certificateAvailable}
                            className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider border transition-all duration-300 ${
                              exp.certificateAvailable
                                ? "border-border text-text-secondary hover:text-text-primary hover:border-accent/40 cursor-pointer"
                                : "border-border/50 text-text-secondary/50 cursor-not-allowed"
                            }`}
                            aria-label={exp.certificateAvailable ? `View ${exp.company} certificate` : "Certificate not yet available"}
                          >
                            <FileText className="w-4 h-4" />
                            {exp.certificateAvailable ? "View certificate" : "Certifcate not yet available"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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

/* ──────────────────────────────────────────────── */
/*  Export                                          */
/* ──────────────────────────────────────────────── */
export default function Experience() {
  return (
    <div id="experience">
      <DesktopExperience />
      <MobileExperience />
    </div>
  );
}
