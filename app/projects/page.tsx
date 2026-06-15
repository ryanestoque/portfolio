"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { projects } from "@/lib/projects-data";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/layout/Contact";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function ProjectsPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const fadeUp = {
    hidden: { y: 0, opacity: 1 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0,
      },
    }),
  };

  return (
    <>
      <Navbar />

      <main ref={ref} className="pt-[72px]">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            {/* Back Link */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-16"
            >
              <TransitionLink
                href="/"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-text-tertiary hover:text-text-primary transition-colors duration-300 group"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Back to Home</span>
              </TransitionLink>
            </motion.div>

            {/* Header */}
            <motion.div
              className="flex items-center gap-3 mb-16"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary font-medium">03</span>
              <div className="w-8 h-[1px] bg-border" />
              <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary font-medium">Projects</span>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] text-gradient max-w-2xl">
                All projects & explorations.
              </h1>
              <p className="text-[13px] text-text-tertiary max-w-xs">
                A comprehensive collection of my work — from academic projects to personal experiments and client builds.
              </p>
            </motion.div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  custom={i + 3}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <TransitionLink
                    href={`/projects/${project.slug}`}
                    className="group block border border-border bg-surface hover:border-accent/30 transition-all duration-500"
                  >
                    {/* Image Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 lg:p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="font-heading text-xl lg:text-2xl font-medium text-text-primary group-hover:text-accent transition-colors duration-500">
                          {project.title}
                        </h2>
                        <span className="text-[11px] tracking-wider uppercase text-text-tertiary flex-shrink-0 pt-1.5">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-[13px] leading-relaxed text-text-secondary mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] tracking-wider uppercase px-2.5 py-1 border border-border text-text-tertiary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TransitionLink>
                </motion.div>
              ))}
            </div>

            {/* Back to top */}
            <motion.div
              className="editorial-line mt-20"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease }}
              style={{ originX: 0 }}
            />

            <motion.div
              className="flex justify-center mt-16"
              custom={projects.length + 3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <TransitionLink
                href="/"
                className="group inline-flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.2em] border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Back to Home</span>
              </TransitionLink>
            </motion.div>
          </div>
        </section>
      </main>

      <Contact />
    </>
  );
}
