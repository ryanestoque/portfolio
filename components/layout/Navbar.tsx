"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import ThemeToggle from "../ui/ThemeToggle";

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
  const router = useRouter();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      router.push("/");
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
              >
                Ryan Estoque
              </button>
            </MagneticButton>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <MagneticButton key={link.label} strength={0.1}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm tracking-wide font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </MagneticButton>
              ))}
            </div>

            {/* Status + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle — always visible */}
              <ThemeToggle />

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
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
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center border-t border-border"
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease,
                  }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-heading text-4xl font-medium text-text-primary hover:text-accent transition-colors duration-300 py-3"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
