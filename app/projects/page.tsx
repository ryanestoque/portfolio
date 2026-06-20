"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { projects } from "@/lib/projects-data";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/layout/Contact";
import { Button } from "@/components/ui/button";

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

      <main ref={ref}>
        <section className="relative py-32 overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient max-w-2xl">
                All works I have crafted
              </h1>
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
                    data-cursor="project"
                  >
                    {/* Image Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${project.darkImage ? 'dark:hidden' : ''}`}
                      />
                      {project.darkImage && (
                        <Image
                          src={project.darkImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 hidden dark:block"
                        />
                      )}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 lg:p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="font-heading text-xl lg:text-2xl font-medium text-text-primary group-hover:text-accent transition-colors duration-500">
                          {project.title}
                        </h2>
                        <span className="text-[11px] tracking-wider uppercase text-text-tertiary flex-shrink-0 pt-1.5">
                          {project.year}
                        </span>
                      </div>

                      <p className="text-sm lg:text-base leading-relaxed text-text-secondary mb-5 font-normal line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="font-normal text-xs tracking-wide px-4 py-2 border border-border text-text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="font-normal text-xs tracking-wide px-4 py-2 border border-border text-text-secondary">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </TransitionLink>
                </motion.div>
              ))}
            </div>


            <motion.div
              className="flex justify-center mt-16"
              custom={projects.length + 3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Button
                href="/"
                data-cursor="target"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                }
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Contact />
    </>
  );
}
