"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function Contact() {
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
    <section id="contact" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-16"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">04</span>
          <div className="w-12 h-[1px] bg-border" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">Contact</span>
        </motion.div>

        <motion.div
          className="mb-16"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] text-gradient max-w-3xl">
            Let's meet<br /> <span className="font-normal">halfway</span>
          </h2>
        </motion.div>

        <motion.div
          className="editorial-line mb-16"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease }}
          style={{ originX: 0 }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            className="lg:col-span-6"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-[15px] leading-relaxed text-text-secondary max-w-md mb-10">
              I&apos;m currently available for freelance work, collaborations, and interesting
              projects. Whether you have a question or just want to say hello — my inbox is always open.
            </p>

            <MagneticButton strength={0.2}>
              <a
                href="mailto:ryan@estoque.dev"
                className="group inline-flex items-center gap-4 text-text-primary hover:text-accent transition-colors duration-500"
              >
                <span className="font-heading text-2xl md:text-3xl font-medium">
                  estoque02ryan@gmail.com
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:pl-12"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-text-tertiary mb-6">
                  Social
                </h4>
                <ul className="space-y-4">
                  {["GitHub", "LinkedIn", "Twitter / X", "Instagram"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-300"
                      >
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 
              <div>
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-text-tertiary mb-6">
                  Navigation
                </h4>
                <ul className="space-y-4">
                  {["Home", "About", "Skills", "Projects"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
