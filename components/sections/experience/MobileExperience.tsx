"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/lib/experience-data";
import type { Experience } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { FileText, ChevronDown } from "lucide-react";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";

export default function MobileExperience() {
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
                          <div className="relative aspect-square w-full overflow-hidden mb-6 bg-border/20 rounded-sm">
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
