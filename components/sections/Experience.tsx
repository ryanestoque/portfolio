"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";

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
        className="hidden lg:block relative py-32 md:py-40 overflow-hidden"
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
              <h2 className="font-heading text-[clamp(3rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl">
                Experiences that shaped{" "}
                <span className="font-normal">my craft.</span>
              </h2>
            </div>
          </div>

          {/* ── Two-Column Layout ─────────────────── */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Sticky Image */}
            <div className="col-span-5">
              <div
                ref={imageContainerRef}
                className="experience-image-container sticky top-32"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface">
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
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right: Experience List */}
            <div className="col-span-7">
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
                    <div className="relative z-10 flex items-start justify-between gap-6 py-7 px-5">
                      {/* Left: Role + Description */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg xl:text-xl font-medium text-text-primary mb-1.5 flex items-center gap-3">
                          {exp.role}
                          {exp.certificate && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openCertificate(exp.certificate!, exp.company);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase border border-border text-text-tertiary hover:text-text-primary hover:border-accent/40 transition-all duration-300"
                              aria-label={`View ${exp.company} certificate`}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M12 18v-6" />
                                <path d="M9 15l3 3 3-3" />
                              </svg>
                              Cert
                            </button>
                          )}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary font-normal line-clamp-2">
                          {exp.description}
                        </p>
                      </div>

                      {/* Right: Company + Date */}
                      <div className="flex-shrink-0 text-right">
                        <span className="font-heading text-base xl:text-lg font-semibold text-text-primary block">
                          {exp.company}
                        </span>
                        <span className="text-xs tracking-wider uppercase text-text-tertiary mt-1 block">
                          {exp.dateRange}
                        </span>
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
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading text-lg font-medium text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="text-xs tracking-wider uppercase text-text-tertiary flex-shrink-0 pt-1">
                      {exp.dateRange}
                    </span>
                  </div>

                  <span className="font-heading text-sm font-semibold text-text-primary block mb-3">
                    {exp.company}
                  </span>

                  <p className="text-sm leading-relaxed text-text-secondary font-normal mb-4">
                    {exp.description}
                  </p>

                  {exp.certificate && (
                    <button
                      onClick={() =>
                        openCertificate(exp.certificate!, exp.company)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border border-border text-text-secondary hover:text-text-primary hover:border-accent/40 transition-all duration-300"
                      aria-label={`View ${exp.company} certificate`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 18v-6" />
                        <path d="M9 15l3 3 3-3" />
                      </svg>
                      View Certificate
                    </button>
                  )}
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
