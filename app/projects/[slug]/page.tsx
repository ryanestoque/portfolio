"use client";

import { use, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { getProjectBySlug, projects } from "@/lib/projects-data";
import type { Project } from "@/lib/projects-data";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/layout/Contact";
import { Button } from "@/components/ui/button";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ProjectContent project={project} />
      </main>
      <Contact />
    </>
  );
}

function ProjectContent({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  /* Find adjacent projects for navigation */
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Hero ───────────────────────────────── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          {/* <div className="flex items-center gap-3 mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary font-medium">
              {project.id}
            </span>
            <div className="w-8 h-[1px] bg-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary font-medium">
              {project.category || "Project"}
            </span>
          </div> */}

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] text-gradient mb-4">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-lg md:text-xl text-text-secondary font-medium mb-8">
              {project.subtitle}
            </p>
          )}

          {(project.github || project.demo) && (
            <div className="flex flex-col sm:flex-row w-full items-center gap-3 sm:gap-4 mb-10">
              {project.demo && (
                project.demoAvailable === false ? (
                  <div className="relative group/tooltip w-full">
                    <Button
                      disabled
                      className="w-full"
                      icon={
                        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background"></span>
                        </div>
                      }
                    >
                      Live Demo
                    </Button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-surface-elevated/80 backdrop-blur-md text-xs px-3 py-2 border border-border tracking-wider z-20 shadow-lg">
                      Not yet available for this project
                      {/* Triangle pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-border"></div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-surface"></div>
                    </div>
                  </div>
                ) : (
                  <Button
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    icon={
                      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background"></span>
                      </div>
                    }
                    data-cursor="target"
                  >
                    Live Demo
                  </Button>
                )
              )}
              {project.github && (
                <Button
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  }
                  data-cursor="target"
                >
                  Source Code
                </Button>
              )}
            </div>
          )}

          {/* Meta Row */}
          {/* <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="text-xs tracking-wider uppercase text-text-primary border border-border px-3 py-1.5">
              {project.year}
            </span>
            {project.category && (
              <span className="text-xs tracking-wider uppercase text-text-primary border border-border px-3 py-1.5">
                {project.category}
              </span>
            )}
            {project.status && (
              <span
                className={`text-xs tracking-wider uppercase px-3 py-1.5 border ${
                  project.status === "In Progress"
                    ? "border-emerald-400/30 text-emerald-400"
                    : "border-border text-text-tertiary"
                }`}
              >
                {project.status === "In Progress" && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot mr-2 align-middle" />
                )}
                {project.status}
              </span>
            )}

          </div> */}
        </motion.div>
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative aspect-[16/9] overflow-hidden border border-border mb-20"
          data-cursor="target"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className={`object-cover ${project.darkImage ? 'dark:hidden' : ''}`}
            priority
          />
          {project.darkImage && (
            <Image
              src={project.darkImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover hidden dark:block"
              priority
            />
          )}
        </motion.div>

        {/* ── Content Grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Overview */}
            {project.longDescription && (
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-16"
              >
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
                  Overview
                </h2>
                <div className="editorial-line mb-6" />
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  {project.longDescription}
                </p>
              </motion.div>
            )}

            {/* Problem */}
            {project.problem && (
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-16"
              >
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
                  Problem
                </h2>
                <div className="editorial-line mb-6" />
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  {project.problem}
                </p>
              </motion.div>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-16"
              >
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
                  Solution
                </h2>
                <div className="editorial-line mb-6" />
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  {project.solution}
                </p>
              </motion.div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                custom={6}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-16"
              >
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
                  Key Features
                </h2>
                <div className="editorial-line mb-6" />
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-xs tracking-[0.3em] text-text-tertiary font-medium mt-1.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-relaxed text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:sticky lg:top-[96px] space-y-8"
            >
              <div className="border border-border p-6">
                <h3 className="font-heading text-base text-text-primary mb-6 font-semibold">
                  Project Details
                </h3>
                <div className="editorial-line mb-6" />

                <div className="space-y-5">
                  {project.role && (
                    <div>
                      <span className="text-xs tracking-wide text-text-secondary block mb-1">
                        Role
                      </span>
                      <span className="text-sm text-text-primary font-medium">
                        {project.role}
                      </span>
                    </div>
                  )}
                  {project.team && (
                    <div>
                      <span className="text-xs tracking-wide text-text-secondary block mb-1">
                        Team
                      </span>
                      <span className="text-sm text-text-primary font-medium">
                        {project.team}
                      </span>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-xs tracking-wide text-text-secondary block mb-1">
                        Duration
                      </span>
                      <span className="text-sm text-text-primary font-medium">
                        {project.duration}
                      </span>
                    </div>
                  )}                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="pt-2">
                      <span className="text-xs tracking-wide text-text-secondary block mb-2">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <ProjectTag key={tag} tag={tag} index={i} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>


            </motion.div>
          </div>
        </div>

        {/* ── Gallery ────────────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
              Gallery
            </h2>
            <div className="editorial-line mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-[16/10] overflow-hidden border border-border">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}


        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Previous Project */}
            {/* <div className="flex-1">
              {prevProject && (
                <TransitionLink
                  href={`/projects/${prevProject.slug}`}
                  className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-text-tertiary hover:text-text-primary transition-colors duration-300"
                  data-cursor="target"
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
                  <span>{prevProject.title}</span>
                </TransitionLink>
              )}
            </div> */}

            {/* All Projects */}
            <Button
              href="/projects"
              data-cursor="target"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
              }
            >
              Back to Projects
            </Button>

            {/* Next Project */}
            {/* <div className="flex-1 text-right">
              {nextProject && (
                <TransitionLink
                  href={`/projects/${nextProject.slug}`}
                  className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-text-tertiary hover:text-text-primary transition-colors duration-300"
                  data-cursor="target"
                >
                  <span>{nextProject.title}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </TransitionLink>
              )}
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectTag({ tag, index }: { tag: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <motion.span
      className="group relative inline-flex items-center justify-center px-3 py-1.5 border border-border bg-surface overflow-hidden cursor-default transition-colors duration-300 hover:border-accent/40"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 + index * 0.04,
        duration: 0.5,
        ease,
      }}
      onMouseEnter={() => { if (window.innerWidth >= 768) setIsHovered(true) }}
      onMouseLeave={() => { if (isHovered) { setIsHovered(false); setHoverCount(c => c + 1); } }}
      data-cursor="target"
    >
      {/* Wipe Background */}
      <span className="absolute left-0 right-0 top-0 bottom-auto h-0 bg-accent transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:top-auto group-hover:bottom-0 group-hover:h-full z-0" />
      
      {/* Text Area */}
      <span className="relative z-10 flex items-center justify-center overflow-hidden text-sm tracking-wide font-normal">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            initial={hoverCount === 0 && !isHovered ? false : { y: "150%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-150%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={`absolute flex items-center justify-center inset-0 whitespace-nowrap ${isHovered ? 'text-background' : 'text-text-primary'}`}
          >
            {tag}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder */}
        <span className="opacity-0 pointer-events-none whitespace-nowrap">
          {tag}
        </span>
      </span>
    </motion.span>
  );
}