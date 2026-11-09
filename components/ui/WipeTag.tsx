"use client";

import { useState, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/animations";

/* ──────────────────────────────────────────────── */
/*  Types                                            */
/* ──────────────────────────────────────────────── */

interface WipeTagProps extends Omit<ComponentPropsWithoutRef<"span">, "onMouseEnter" | "onMouseLeave"> {
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
 * - GPU-accelerated scaleY wipe-fill background synchronized with text state
 * - Respects prefers-reduced-motion and hover-capable input devices
 * - Invisible aria-hidden placeholder for stable sizing
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      className={`group relative inline-flex items-center justify-center overflow-hidden cursor-default transition-colors duration-300 ${className}`}
      onMouseEnter={() => {
        if (
          window.innerWidth >= hoverBreakpoint &&
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
      {...rest}
    >
      {/* Wipe Background — compositor-only scaleY tied to isHovered */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
          isHovered ? "origin-bottom scale-y-100" : "origin-top scale-y-0"
        } ${wipeClassName}`}
      />

      {/* Text Area */}
      <span className="relative z-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            initial={(hoverCount === 0 && !isHovered) || prefersReducedMotion ? false : { y: "150%" }}
            animate={{ y: "0%" }}
            exit={prefersReducedMotion ? undefined : { y: "-150%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease }}
            className={`absolute flex items-center justify-center inset-0 whitespace-nowrap ${
              isHovered ? activeClassName : inactiveClassName
            }`}
          >
            {children}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder to maintain width and height */}
        <span
          aria-hidden="true"
          className="opacity-0 pointer-events-none select-none whitespace-nowrap"
        >
          {children}
        </span>
      </span>
    </span>
  );
}
