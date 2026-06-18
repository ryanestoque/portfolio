"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

const techCategories = [
  {
    title: "LANGUAGES",
    items: [
      "JavaScript", 
      "TypeScript",
      "Java",
      "Python",
      "C++"
    ],
  },
  {
    title: "FRONTEND",
    items: [
      "React", 
      "Next.js", 
      "Vite",
      "Tailwind CSS", 
      "shadcn/ui", 
      "Framer Motion", 
      "React Native",
      "MindAR"  
    ],
  },
  {
    title: "BACKEND",
    items: [
      "Node.js", 
      "Express.js",
      "Django REST Framework", 
      "JWT", 
    ],
  },
    {
    title: "DATABASES",
    items: [
      "MySQL",
      "PostgreSQL", 
      "Firebase", 
      "Supabase", 
    ],
  },
  {
    title: "DEVOPS & DEPLOYMENT",
    items: [
      "Git", 
      "GitHub", 
      "Vercel",
      "Render", 
    ],
  },
  {
    title: "TOOLS",
    items: [
      "VS Code", 
      "Antigravity", 
      "Figma", 
      "Google AI Studio",
      "Android Studio",
      "Postman",
      "Miro"
    ],
  },
];


export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="skills" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-16"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">02</span>
          <div className="w-12 h-[1px] bg-accent/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">ARSENAL</span>
        </motion.div>

        <div className="mb-20">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl flex flex-col items-start">
            <ScrollRevealBars duration={1} delay={0}>
              <span><span className="font-normal">Thoughtfully</span> used</span>
            </ScrollRevealBars>
            <ScrollRevealBars duration={1} delay={0.15}>
              <span>technologies.</span>
            </ScrollRevealBars>
          </h2>
        </div>

        <div className="space-y-12">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              custom={catIndex + 3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-heading text-xs md:text-sm tracking-[0.15em] uppercase font-semibold text-text-primary whitespace-nowrap">
                  {category.title}
                </h3>
                <div className="flex-1 h-[1px] bg-border" />
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    className="px-4 py-2 text-xs md:text-sm tracking-wide border border-border bg-surface font-normal text-text-primary hover:text-text-primary hover:border-accent/40 hover:bg-surface-elevated transition-all duration-300"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + catIndex * 0.1 + itemIndex * 0.04,
                      duration: 0.5,
                      ease,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
