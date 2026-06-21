"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/lib/projects-data";
import MagneticButton from "../ui/MagneticButton";
import { Button } from "@/components/ui/button";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { ease, fadeUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_PROJECT_COUNT = 3;

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const mainSection = ref.current;
    const track = trackRef.current;
    if (!mainSection || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const ctx = gsap.context(() => {
        const pinDuration = Math.abs(getScrollAmount()) - 200;

        ScrollTrigger.create({
          trigger: mainSection,
          pin: true,
          start: "center center",
          end: () => `+=${pinDuration}`,
          invalidateOnRefresh: true,
        });

        // 2. ANIMATION TIMELINE: Starts moving the cards BEFORE it pins
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainSection,
            // Starts moving sideways when the section is 80% down the screen
            start: "top 60%",
            // Total distance = 30vh (the travel from 80% to 50%) + the pinned duration
            end: () => `+=${(window.innerHeight * 0.3) + pinDuration}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Move the track horizontally
        tl.to(track, {
          x: () => getScrollAmount(),
          ease: "none",
          duration: 1,
        });
      }, mainSection);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-32 md:py-40 min-h-screen overflow-hidden">
      {/* ── Section Header ──────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-16"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader number="04" label="BUILDS" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl flex flex-col items-start">
            <ScrollRevealBars duration={1} delay={0}>
              <span>Works <span className="font-normal">proudly</span></span>
            </ScrollRevealBars>
            <ScrollRevealBars duration={1} delay={0.15}>
              <span>crafted.</span>
            </ScrollRevealBars>
          </h2>
        </div>
      </div>

      {/* ── Desktop: Horizontal Scroll ─────────────── */}
      <div ref={sectionRef} className="hidden lg:block relative">
        <div
          ref={trackRef}
          className="flex items-stretch gap-16 will-change-transform"
          style={{
            paddingLeft: "60vw",
            paddingRight: "calc(max(4rem, 50vw - 700px + 4rem))",
            width: "max-content",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="project-card flex-shrink-0"
              style={{ width: "min(550px, 42vw)" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Vertical Stack (first 3) ────────── */}
      <div className="lg:hidden relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 gap-6">
          {projects.slice(0, MOBILE_PROJECT_COUNT).map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <ProjectCard project={project} maxTags={3} />
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-12 flex justify-center"
          custom={MOBILE_PROJECT_COUNT + 2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <MagneticButton strength={0.2}>
            <Button
              href="/projects"
              icon={
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              View All Projects
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
