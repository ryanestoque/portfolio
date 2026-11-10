"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/lib/animations";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const resetHoverState = () => {
      setIsHovered(false);
      setHoverCount(0);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetHoverState();
      }
    };

    window.addEventListener("blur", resetHoverState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", resetHoverState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const isLight = resolvedTheme === "light";
  const showSun = isHovered ? !isLight : isLight;

  const toggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  if (!mounted) return <div className="w-11 h-11" aria-hidden="true" />;

  const iconVariants: Variants = {
    initial: (isHover: boolean) =>
      (hoverCount === 0 && !isHover) || prefersReducedMotion ? { y: "0%" } : { y: "150%" },
    animate: { y: "0%" },
    exit: prefersReducedMotion ? { y: "0%" } : { y: "-150%" },
  };

  return (
    <motion.button
      id="theme-toggle"
      type="button"
      onClick={toggle}
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
      onFocus={(e) => {
        if (
          window.innerWidth >= 768 &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          e.currentTarget.matches(":focus-visible")
        ) {
          setIsHovered(true);
        }
      }}
      onBlur={() => {
        if (isHovered) {
          setIsHovered(false);
          if (document.hidden) {
            setHoverCount(0);
          } else {
            setHoverCount((c) => c + 1);
          }
        }
      }}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
      className="group relative w-11 h-11 flex items-center justify-center border border-border overflow-hidden transition-colors duration-300 motion-reduce:transition-none hover:border-accent/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      data-cursor="target"
    >
      {/* Wipe Background */}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 bg-accent transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
          isHovered
            ? "top-auto bottom-0 h-full"
            : "top-0 bottom-auto h-0 group-hover:top-auto group-hover:bottom-0 group-hover:h-full group-focus-visible:top-auto group-focus-visible:bottom-0 group-focus-visible:h-full"
        }`}
      />

      {/* Icon Area */}
      <span className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            custom={isHovered}
            initial={hoverCount === 0 && !isHovered ? false : "initial"}
            animate="animate"
            exit="exit"
            variants={iconVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease }}
            className={`absolute inset-0 flex items-center justify-center ${
              isHovered
                ? "text-background"
                : "text-text-secondary group-hover:text-background group-focus-visible:text-background"
            }`}
          >
            <AnimatePresence initial={false}>
              {showSun ? (
                /* Sun icon */
                <motion.svg
                  key="sun"
                  aria-hidden="true"
                  className="absolute"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, rotate: 30, scale: 0.8 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, rotate: -30, scale: 0.8 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.svg>
              ) : (
                /* Moon icon */
                <motion.svg
                  key="moon"
                  aria-hidden="true"
                  className="absolute"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, rotate: -30, scale: 0.8 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, rotate: 30, scale: 0.8 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
