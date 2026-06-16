"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import { Mail } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);
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
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">05</span>
          <div className="w-12 h-[1px] bg-accent/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">INITIATION</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] text-gradient max-w-3xl flex flex-col items-start">
              <ScrollRevealBars duration={1} delay={0}>
                <span>Let's meet</span>
              </ScrollRevealBars>
              <ScrollRevealBars duration={1} delay={0.15}>
                <span><span className="font-normal">halfway</span>.</span>
              </ScrollRevealBars>
            </h2>
            <motion.div
              className="text-sm font-medium md:text-base text-text-secondary mt-10 tracking-wide"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              © {new Date().getFullYear()} Ryan Estoque
            </motion.div>
          </div>
          <motion.div
            className="lg:col-span-6 lg:pl-12"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-start sm:justify-end mt-16 sm:mt-0">
              <div>
                {/* <h4 className="text-sm tracking-wide text-text-tertiary mb-6">
                  Social
                </h4> */}
                <ul className="space-y-4">
                  {[
                    { name: "Gmail", url: "mailto:estoque02ryan@gmail.com", icon: <Mail className="w-5 h-5" /> },
                    { name: "GitHub", url: "https://github.com/ryanestoque", icon: <GithubIcon className="w-5 h-5" /> },
                    { name: "LinkedIn", url: "#", icon: <LinkedinIcon className="w-5 h-5" /> },
                    { name: "Facebook", url: "https://facebook.com/ryanestoque02", icon: <FacebookIcon className="w-5 h-5" /> },
                  ].map((social) => (
                    <li key={social.name}>
                      <MagneticButton strength={0.2}>
                        <a
                          href={social.url}
                          target={social.name === "Gmail" ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center gap-3 text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors duration-300 py-1"
                          data-cursor="target"
                        >
                          <span className="text-text-tertiary group-hover:text-accent transition-colors duration-300">
                            {social.icon}
                          </span>
                          <span>{social.name}</span>

                          {/* Tooltip */}
                          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface-el/90 backdrop-blur-md text-text-primary text-sm rounded opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-border pointer-events-none z-10 hidden sm:block">
                            {social.url.replace("mailto:", "")}
                          </span>
                        </a>
                      </MagneticButton>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
