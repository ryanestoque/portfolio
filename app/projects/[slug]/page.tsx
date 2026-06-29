"use client";

import { use, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects-data";
import type { Project } from "@/lib/projects-data";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/layout/Contact";
import { fadeUp } from "@/lib/animations";

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

import {
  ProjectHeader,
  ProjectGallery,
  ProjectContentInfo,
  ProjectSidebar,
  ProjectNavigation,
} from "./components";

function ProjectContent({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Header ───────────────────────────────── */}
        <ProjectHeader project={project} isInView={isInView} />

        {/* ── Main Image ─────────────────────────── */}
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
            alt={`${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className={`object-cover ${project.darkImage ? "dark:hidden" : ""}`}
            priority
          />
          {project.darkImage && (
            <Image
              src={project.darkImage}
              alt={`${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""} dark mode screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover hidden dark:block"
              priority
            />
          )}
        </motion.div>

        {/* ── Content Grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          <ProjectContentInfo project={project} isInView={isInView} />
          <ProjectSidebar project={project} isInView={isInView} />
        </div>

        {/* ── Gallery ────────────────────────────── */}
        <ProjectGallery project={project} isInView={isInView} />

        {/* ── Navigation ─────────────────────────── */}
        <ProjectNavigation isInView={isInView} />
      </div>
    </section>
  );
}
