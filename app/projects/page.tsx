"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { projects } from "@/lib/projects-data";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/layout/Contact";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/ProjectCard";
import { ease, fadeUp } from "@/lib/animations";

export default function ProjectsPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
                  <ProjectCard project={project} aspectRatioClass="aspect-[16/10]" />
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
                onClick={() => sessionStorage.setItem("scrollTo", "#projects")}
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
