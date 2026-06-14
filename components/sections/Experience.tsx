"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

/* ──────────────────────────────────────────────── */
/*  Desktop Experience Section                      */
/* ──────────────────────────────────────────────── */
function DesktopExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const activeIndex = hoveredIndex ?? 0;
  const activeExperience = experiences[activeIndex];

  /* ── GSAP ScrollTrigger Stagger ──────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image container
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Rows stagger
      const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.fromTo(
        rows,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rows[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

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
          <div ref={headerRef}>
            <div className="flex items-center gap-3 mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
                04
              </span>
              <div className="w-12 h-[1px] bg-border" />
              <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
                ROAD TO MASTERY
              </span>
            </div>

            <div className="mb-20">
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl">
                <span className="font-normal">Enrolled</span> in experiences.
              </h2>
            </div>
          </div>

          {/* ── Tooltip ───────────────────────────── */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                className="fixed pointer-events-none z-[100] max-w-sm bg-surface-el/90 backdrop-blur-md border border-border/50 p-4 shadow-2xl"
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
                ref={imageContainerRef}
                className="experience-image-container relative aspect-square w-full overflow-hidden border border-border bg-foreground"
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
                    ref={(el) => {
                      rowsRef.current[i] = el;
                    }}
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
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  const openCertificate = (src: string, company: string) => {
    setLightbox({ open: true, src, alt: `${company} Certificate` });
  };

  return (
    <>
      <section
        className="lg:hidden relative py-32 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Section Label */}
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
              04
            </span>
            <div className="w-12 h-[1px] bg-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">
              ROAD TO MASTERY
            </span>
          </motion.div>

          <motion.h2
            className="font-heading text-[clamp(3rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
          >
            Experiences that shaped{" "}
            <span className="font-normal">my craft.</span>
          </motion.h2>

          {/* Experience Cards */}
          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="border border-border bg-surface overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {exp.company}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-heading text-sm font-medium text-text-secondary">
                        {exp.role}
                      </span>
                      <span className="text-sm tracking-wide text-text-secondary flex-shrink-0">
                        {exp.dateRange}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!exp.certificateAvailable) return;
                      if (exp.certificate) openCertificate(exp.certificate, exp.company);
                    }}
                    disabled={!exp.certificateAvailable}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                      exp.certificateAvailable
                        ? "border-border text-text-secondary hover:text-text-primary hover:border-accent/40 cursor-pointer"
                        : "border-border/50 text-text-secondary/50 cursor-not-allowed"
                    }`}
                    aria-label={exp.certificateAvailable ? `View ${exp.company} certificate` : "Certificate not yet available"}
                  >
                    <FileText className="w-5 h-5" />
                    {exp.certificateAvailable ? "View Certificate" : "Not Available"}
                  </button>
                </div>
              </motion.div>
            ))}
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
