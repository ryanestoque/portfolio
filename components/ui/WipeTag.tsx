"use client";

import { useState, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/animations";

/* ──────────────────────────────────────────────── */
/*  Types                                            */
/* ──────────────────────────────────────────────── */

interface WipeTagProps extends Omit<ComponentPropsWithoutRef<typeof motion.span>, "onMouseEnter" | "onMouseLeave"> {
  children: ReactNode;
  /** CSS classes applied when the tag is hovered */
  activeClassName?: string;
  /** CSS classes applied when the tag is NOT hovered */
  inactiveClassName?: string;
  /** Minimum viewport width (px) to enable hover effect. Defaults to 768. */
  hoverBreakpoint?: number;
  /** Extra classes for the outer wipe-background fill */
  wipeClassName?: string;
}

/* ──────────────────────────────────────────────── */
/*  Component                                        */
/* ──────────────────────────────────────────────── */

/**
 * A tag/chip with a "wipe" hover animation.
 *
 * Shared pattern extracted from SkillTag, ProjectTag, and similar
 * components. Features:
 * - popLayout AnimatePresence with hoverCount tracking
 * - Wipe-fill background on hover
 * - Invisible placeholder for stable sizing
 */
export default function WipeTag({
  children,
  activeClassName = "text-background",
  inactiveClassName = "text-text-primary",
  hoverBreakpoint = 768,
  wipeClassName = "bg-accent",
  className = "",
  ...rest
}: WipeTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <motion.span
      className={`group relative inline-flex items-center justify-center overflow-hidden cursor-default transition-colors duration-300 ${className}`}
      onMouseEnter={() => {
        if (window.innerWidth >= hoverBreakpoint) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (isHovered) {
          setIsHovered(false);
          setHoverCount((c) => c + 1);
        }
      }}
      {...rest}
    >
      {/* Wipe Background */}
      <span
        className={`absolute left-0 right-0 top-0 bottom-auto h-0 transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:top-auto group-hover:bottom-0 group-hover:h-full z-0 ${wipeClassName}`}
      />

      {/* Text Area */}
      <span className="relative z-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            initial={hoverCount === 0 && !isHovered ? false : { y: "150%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-150%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={`absolute flex items-center justify-center inset-0 whitespace-nowrap ${
              isHovered ? activeClassName : inactiveClassName
            }`}
          >
            {children}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder to maintain width and height */}
        <span className="opacity-0 pointer-events-none whitespace-nowrap">
          {children}
        </span>
      </span>
    </motion.span>
  );
}
