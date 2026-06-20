"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import MagneticButton from "../ui/MagneticButton";
import ThemeToggle from "../ui/ThemeToggle";
import { usePreloader } from "../ui/PreloaderProvider";

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { startTransition } = usePreloader();
  const lenis = useLenis();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  // When already on home, just smooth-scroll to the section.
  // When on another page (e.g. /projects/[slug]), store the target section
  // in sessionStorage then navigate to "/" — the home page picks it up on mount.
  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    if (isHome) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Store which section to scroll to after landing on home
      sessionStorage.setItem("scrollTo", href);
      startTransition("/");
    }
  };

  return (
    <>
      <nav
        data-hero="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "navbar-scrolled" : "navbar"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">
            <MagneticButton strength={0.15}>
              <button
                onClick={() => handleNavClick("#home")}
                className="font-heading text-lg font-semibold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
                data-cursor="target"
              >
                Ryan Estoque
              </button>
            </MagneticButton>

            {/* Status + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle — always visible */}
              <ThemeToggle />

              {/* Hamburger */}
              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative w-10 h-10 flex items-center justify-center text-text-primary hover:text-accent transition-colors"
                  aria-label="Toggle menu"
                  data-cursor="target"
                >
                <div className="relative w-6 h-4 scale-[0.85]">
                  <motion.span
                    className="absolute left-0 w-full h-[2px] bg-text-primary origin-center"
                    animate={{
                      top: menuOpen ? "50%" : "0%",
                      rotate: menuOpen ? 45 : 0,
                      translateY: menuOpen ? "-50%" : "0%",
                    }}
                    transition={{ duration: 0.3, ease }}
                  />

                  <motion.span
                    className="absolute left-0 w-full h-[2px] bg-text-primary origin-center"
                    animate={{
                      top: menuOpen ? "50%" : "100%",
                      rotate: menuOpen ? -45 : 0,
                      translateY: menuOpen ? "-50%" : "-100%",
                    }}
                    transition={{ duration: 0.3, ease }}
                  />
                </div>
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%", transition: { duration: 0.6, ease } }}
            exit={{ y: "-100%", transition: { delay: 0.8, duration: 0.6, ease } }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center border-t border-border"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <MenuLink 
                  key={link.label} 
                  link={link} 
                  i={i} 
                  handleNavClick={handleNavClick} 
                  navLinksLength={navLinks.length} 
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLink({ link, i, handleNavClick, navLinksLength }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <motion.button
      onClick={() => handleNavClick(link.href)}
      onMouseEnter={() => { if (window.innerWidth >= 768) setIsHovered(true) }}
      onMouseLeave={() => { if (isHovered) { setIsHovered(false); setHoverCount((c) => c + 1); } }}
      className="relative overflow-hidden flex font-heading text-3xl md:text-4xl font-medium transition-colors duration-300 py-3 md:py-4 px-2"
      data-cursor="target"
    >
      <motion.span
        className="relative block overflow-hidden"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 0 }}
        transition={{
          delay: i * 0.08,
          duration: 0.5,
          ease,
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={isHovered ? "hover" : `unhover-${hoverCount}`}
            initial={hoverCount === 0 && !isHovered ? false : { y: "150%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-150%" }}
            transition={{ duration: 0.3, ease }}
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap ${
              isHovered ? "text-accent" : "text-text-primary"
            }`}
          >
            {link.label}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder to maintain width and height */}
        <span className="opacity-0 pointer-events-none block whitespace-nowrap">
          {link.label}
        </span>
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-foreground z-10 pointer-events-none"
        initial={{ scaleX: 1, transformOrigin: "right" }}
        animate={{
          scaleX: 0,
          transformOrigin: "right",
          transition: { duration: 0.8, ease, delay: 0.1 + i * 0.1 },
        }}
        exit={{
          scaleX: 1,
          transformOrigin: "right",
          transition: {
            duration: 0.4,
            ease,
            delay: (navLinksLength - 1 - i) * 0.08,
          },
        }}
      />
    </motion.button>
  );
}
