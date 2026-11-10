"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { experiences, type Experience } from "@/lib/experience-data";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { FileText, ChevronDown } from "lucide-react";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

export default function MobileExperience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  }>({ open: false, src: "", alt: "", title: "", subtitle: "" });
  const prefersReducedMotion = useReducedMotion();

  const openCertificate = (exp: Experience) => {
    if (!exp.certificate) return;
    setLightbox({
      open: true,
      src: exp.certificate,
      alt: `${exp.company} Certificate`,
      title: exp.company,
      subtitle: `${exp.role} · ${exp.dateRange}`,
    });
  };

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section
        aria-labelledby="mobile-experience-heading"
        className="lg:hidden relative py-32 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Section Label */}
          <div className="mb-12">
            <SectionHeader number="III" label="ROAD TO MASTERY" />
          </div>

          <div className="mb-14">
            <h2
              id="mobile-experience-heading"
              className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient flex flex-col items-start"
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

          {/* Accordion List */}
          <div className="flex flex-col border-t border-border">
            {experiences.map((exp) => {
              const isExpanded = expandedId === exp.id;
              const triggerId = `mobile-exp-trigger-${exp.id}`;
              const panelId = `mobile-exp-panel-${exp.id}`;

              return (
                <div
                  key={exp.id}
                  className="border-b border-border bg-surface overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(exp.id)}
                    className="w-full flex items-center justify-between py-6 px-4 text-left transition-colors hover:bg-accent-dim focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                  >
                    <div className="flex flex-col gap-1 pr-4 min-w-0">
                      <span className="font-heading text-lg font-semibold text-text-primary">
                        {exp.company}
                      </span>
                      <span className="font-heading text-sm font-medium text-text-secondary">
                        {exp.role}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="flex-shrink-0 text-text-tertiary"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={
                          prefersReducedMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.4,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      >
                        <div className="pb-6 px-4">
                          {/* Image at top — square corners + 1px Rule 30 border */}
                          <div className="relative aspect-square w-full overflow-hidden mb-6 border border-border bg-accent-dim">
                            <Image
                              src={exp.image}
                              alt={exp.imageAlt}
                              fill
                              className="object-cover"
                              style={{
                                objectPosition: exp.imagePosition || "center",
                              }}
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>

                          {/* Date Range & Description */}
                          <div className="flex flex-col gap-4 mb-6">
                            <span className="text-sm tracking-wide text-text-tertiary font-medium">
                              {exp.dateRange}
                            </span>
                            <p className="text-sm text-text-secondary leading-relaxed">
                              {exp.description}
                            </p>
                          </div>

                          {/* Certificate Button */}
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!exp.certificateAvailable) return;
                              openCertificate(exp);
                            }}
                            disabled={!exp.certificateAvailable}
                            className="w-full"
                            aria-label={
                              exp.certificateAvailable
                                ? `View ${exp.company} certificate`
                                : `${exp.company} — certificate not yet available`
                            }
                            icon={<FileText className="w-4 h-4" aria-hidden="true" />}
                          >
                            {exp.certificateAvailable
                              ? "View certificate"
                              : "Certificate not yet available"}
                          </Button>
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
        title={lightbox.title}
        subtitle={lightbox.subtitle}
        onClose={() => setLightbox((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
