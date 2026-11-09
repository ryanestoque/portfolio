"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import { Mail } from "lucide-react";
import { ease } from "@/lib/animations";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/icons";

interface SocialItem {
  name: string;
  url: string;
  displayValue: string;
  external: boolean;
  icon: ReactNode;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    name: "Gmail",
    url: "mailto:estoque02ryan@gmail.com",
    displayValue: "estoque02ryan@gmail.com",
    external: false,
    icon: <Mail className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/ryanestoque",
    displayValue: "https://github.com/ryanestoque",
    external: true,
    icon: <GithubIcon className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/ryan-estoque",
    displayValue: "https://linkedin.com/in/ryan-estoque",
    external: true,
    icon: <LinkedinIcon className="w-5 h-5" />,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/ryanestoque02",
    displayValue: "https://facebook.com/ryanestoque02",
    external: true,
    icon: <FacebookIcon className="w-5 h-5" />,
  },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_auto] gap-y-12 sm:gap-y-0 sm:gap-x-12">
          <h2
            id="contact-heading"
            className="sm:col-start-1 sm:row-start-1 sm:self-end font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-text-primary max-w-3xl flex flex-col items-start"
          >
            <span className="sr-only">Let&apos;s meet halfway.</span>
            <ScrollRevealBars duration={1} delay={0} aria-hidden="true">
              <span>Let&apos;s meet</span>
            </ScrollRevealBars>
            <ScrollRevealBars duration={1} delay={0.15} aria-hidden="true">
              <span>
                <span className="font-normal">halfway</span>.
              </span>
            </ScrollRevealBars>
          </h2>

          <div className="sm:col-start-2 sm:row-start-1 sm:row-span-2 sm:self-center flex justify-start sm:justify-end">
            <ul
              aria-label="Contact and social links"
              className="space-y-1 sm:space-y-1.5"
            >
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <SocialLink social={social} />
                </li>
              ))}
            </ul>
          </div>

          <p className="sm:col-start-1 sm:row-start-2 sm:self-start sm:mt-10 text-sm font-normal md:text-base text-text-secondary tracking-wide">
            © {new Date().getFullYear()} Ryan Estoque
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ social }: { social: SocialItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href={social.url}
      target={social.external ? "_blank" : undefined}
      rel={social.external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => {
        if (
          window.innerWidth >= 768 &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches
        ) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (isHovered) {
          setIsHovered(false);
          setHoverCount((c) => c + 1);
        }
      }}
      className="group relative inline-flex items-center gap-3 min-h-[44px] py-2 text-sm md:text-base text-text-secondary hover:text-text-primary focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors duration-300"
      data-cursor="target"
    >
      <span
        aria-hidden="true"
        className="text-text-tertiary group-hover:text-accent group-focus-visible:text-accent transition-colors duration-300"
      >
        {social.icon}
      </span>
      <span className="relative flex overflow-hidden whitespace-nowrap">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            initial={
              (hoverCount === 0 && !isHovered) || prefersReducedMotion
                ? false
                : { y: "150%" }
            }
            animate={{ y: "0%" }}
            exit={prefersReducedMotion ? undefined : { y: "-150%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease }}
            className="absolute inset-0 flex items-center"
          >
            {social.name}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder */}
        <span
          aria-hidden="true"
          className="opacity-0 pointer-events-none select-none"
        >
          {social.name}
        </span>
      </span>

      {/* Tooltip */}
      <span
        aria-hidden="true"
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface-elevated backdrop-blur-md text-text-primary text-sm opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 transition-all duration-300 motion-reduce:transition-none motion-reduce:translate-x-0 whitespace-nowrap border border-border pointer-events-none z-10 hidden sm:block"
      >
        {social.displayValue}
      </span>
    </a>
  );
}
