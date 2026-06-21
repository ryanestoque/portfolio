"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import WipeTag from "@/components/ui/WipeTag";
import { ease, fadeUp } from "@/lib/animations";

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
          <SectionHeader number="02" label="ARSENAL" />
        </motion.div>

        <div className="mb-20">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient lg:max-w-3xl flex flex-col items-start">
            {/* Desktop / Tablet view (>= 425px) */}
            <div className="hidden min-[425px]:contents">
              <ScrollRevealBars duration={1} delay={0}>
                <span><span className="font-normal">Thoughtfully</span> used</span>
              </ScrollRevealBars>
              <ScrollRevealBars duration={1} delay={0.15}>
                <span>technologies.</span>
              </ScrollRevealBars>
            </div>
    
            {/* Mobile view (< 425px) */}
            <div className="contents min-[425px]:hidden">
              <ScrollRevealBars duration={1} delay={0}>
                <span className="font-normal">Thoughtfully</span>
              </ScrollRevealBars>
              <ScrollRevealBars duration={1} delay={0.15}>
                <span>used</span>
              </ScrollRevealBars>
              <ScrollRevealBars duration={1} delay={0.3}>
                <span>technologies.</span>
              </ScrollRevealBars>
            </div>
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
                  <SkillTag
                    key={item}
                    item={item}
                    catIndex={catIndex}
                    itemIndex={itemIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillTag({ item, catIndex, itemIndex }: { item: string; catIndex: number; itemIndex: number }) {
  return (
    <WipeTag
      className="px-4 py-2 border border-border bg-surface hover:border-accent/40 text-xs md:text-sm tracking-wide font-normal"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4 + catIndex * 0.1 + itemIndex * 0.04,
        duration: 0.5,
        ease,
      }}
      data-cursor="target"
    >
      {item}
    </WipeTag>
  );
}
