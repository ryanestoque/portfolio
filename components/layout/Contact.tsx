"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import { Mail } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/icons";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



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
          {/* <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">05</span>
          <div className="w-12 h-[1px] bg-accent/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary">INITIATION</span> */}
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
                          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface-elevated/80 backdrop-blur-md text-text-primary text-sm  opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-border pointer-events-none z-10 hidden sm:block">
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
