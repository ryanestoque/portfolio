"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = resolvedTheme === "light";

  const toggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  if (!mounted) return <div className="w-9 h-9" />;

  const iconVariants = {
    initial: (isHover: boolean) => (hoverCount === 0 && !isHover ? false : { y: "150%" }),
    animate: { y: "0%" },
    exit: { y: "-150%" },
  };

  return (
    <motion.button
      id="theme-toggle"
      onClick={toggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHoverCount((c) => c + 1); }}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      whileTap={{ scale: 0.88 }}
      className="group relative w-9 h-9 flex items-center justify-center border border-border overflow-hidden transition-colors duration-300 hover:border-accent/40"
      data-cursor="target"
    >
      {/* Wipe Background */}
      <span className="absolute left-0 right-0 top-0 bottom-auto h-0 bg-accent transition-[height] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:top-auto group-hover:bottom-0 group-hover:h-full z-0" />

      {/* Icon Area */}
      <span className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            custom={isHovered}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={iconVariants as any}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={`absolute inset-0 flex items-center justify-center ${
              isHovered ? "text-background" : "text-text-secondary group-hover:text-text-primary"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.svg
                  key="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
              ) : (
                /* Sun icon */
                <motion.svg
                  key="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
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
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
