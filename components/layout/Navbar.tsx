"use client";

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import ThemeToggle from "../ui/ThemeToggle";
import { usePreloader } from "../ui/PreloaderProvider";
import { ease } from "@/lib/animations";

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
  const [activeSection, setActiveSection] = useState("#home");
  const pathname = usePathname();
  const { startTransition } = usePreloader();
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const navScopeRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (pathname !== "/") return;

      const viewportMid = window.innerHeight * 0.4;
      let current = "#home";

      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            current = link.href;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

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

  // Keyboard Escape dismissal and focus trapping while full-screen menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && navScopeRef.current) {
        const focusable = Array.from(
          navScopeRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // When already on home, just smooth-scroll to the section.
  // When on another page (e.g. /projects/[slug]), store the target section
  // in sessionStorage then navigate to "/" — the home page picks it up on mount.
  const handleNavClick = (
    e: ReactMouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Allow modified clicks (Ctrl/Cmd/Shift/middle-click) to open in a new tab naturally
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = "";
    lenis?.start();

    if (isHome) {
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, {
            offset: 0,
            immediate: Boolean(prefersReducedMotion),
            duration: prefersReducedMotion ? 0 : 1.0,
          });
        } else {
          el.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      }
    } else {
      // Store which section to scroll to after landing on home
      sessionStorage.setItem("scrollTo", href);
      startTransition("/");
    }
  };

  return (
    <div ref={navScopeRef}>
      <nav
        aria-label="Primary"
        data-hero="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 motion-reduce:transition-none ${
          scrolled ? "navbar-scrolled" : "navbar"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">
            <a
              href={isHome ? "#home" : "/#home"}
              onClick={(e) => handleNavClick(e, "#home")}
              className="inline-flex items-center min-h-11 font-heading text-lg font-semibold tracking-tight text-text-primary hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-opacity duration-300 motion-reduce:transition-none"
              data-cursor="target"
            >
              Ryan Estoque
            </a>

            {/* Theme Toggle + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle — always visible */}
              <ThemeToggle />

              {/* Hamburger */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="relative w-11 h-11 flex items-center justify-center text-text-primary hover:opacity-75 focus-visible:opacity-75 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent transition-opacity duration-300 motion-reduce:transition-none"
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                aria-controls="fullscreen-menu"
                data-cursor="target"
              >
                <div aria-hidden="true" className="relative w-6 h-4 scale-[0.85]">
                  <motion.span
                    className="absolute left-0 w-full h-[2px] bg-current origin-center"
                    animate={{
                      top: menuOpen ? "50%" : "0%",
                      rotate: menuOpen ? 45 : 0,
                      translateY: menuOpen ? "-50%" : "0%",
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      ease,
                    }}
                  />

                  <motion.span
                    className="absolute left-0 w-full h-[2px] bg-current origin-center"
                    animate={{
                      top: menuOpen ? "50%" : "100%",
                      rotate: menuOpen ? -45 : 0,
                      translateY: menuOpen ? "-50%" : "-100%",
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      ease,
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation menu"
            initial={prefersReducedMotion ? { opacity: 0 } : { y: "-100%" }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, transition: { duration: 0 } }
                : { y: "0%", transition: { duration: 0.6, ease } }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    y: "-100%",
                    transition: { delay: 0.25, duration: 0.45, ease },
                  }
            }
            className="fixed inset-0 z-40 bg-background flex flex-col items-center pt-[72px] overflow-y-auto border-t border-border"
          >
            <nav
              aria-label="Full screen navigation"
              className="flex flex-col items-center gap-3 sm:gap-5 md:gap-6 my-auto py-8 px-6"
            >
              {navLinks.map((link, i) => {
                const isCurrent = isHome
                  ? activeSection === link.href
                  : link.href === "#projects" && pathname.startsWith("/projects");

                return (
                  <MenuLink
                    key={link.label}
                    link={link}
                    i={i}
                    isHome={isHome}
                    isCurrent={isCurrent}
                    prefersReducedMotion={Boolean(prefersReducedMotion)}
                    handleNavClick={handleNavClick}
                    navLinksLength={navLinks.length}
                  />
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MenuLinkProps {
  link: { label: string; href: string };
  i: number;
  isHome: boolean;
  isCurrent: boolean;
  prefersReducedMotion: boolean;
  handleNavClick: (
    e: ReactMouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
  navLinksLength: number;
}

function MenuLink({
  link,
  i,
  isHome,
  isCurrent,
  prefersReducedMotion,
  handleNavClick,
  navLinksLength,
}: MenuLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <motion.a
      href={isHome ? link.href : `/${link.href}`}
      aria-current={isCurrent ? (isHome ? "location" : "page") : undefined}
      onClick={(e) => handleNavClick(e, link.href)}
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
      className="group relative overflow-hidden inline-flex items-center justify-center min-h-11 font-heading text-3xl md:text-4xl font-medium transition-colors duration-300 motion-reduce:transition-none py-2.5 sm:py-3 md:py-4 px-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      data-cursor="target"
    >
      {/* Blueprint Inversion Wipe Background */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none z-0 ${
          isHovered
            ? "origin-bottom scale-y-100"
            : "scale-y-0 origin-top group-hover:origin-bottom group-hover:scale-y-100 group-focus-visible:origin-bottom group-focus-visible:scale-y-100"
        }`}
      />

      <motion.span
        className="relative z-10 block overflow-hidden"
        initial={prefersReducedMotion ? false : { y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 0 }}
        transition={{
          delay: prefersReducedMotion ? 0 : i * 0.08,
          duration: prefersReducedMotion ? 0 : 0.5,
          ease,
        }}
      >
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
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none ${
              isHovered
                ? "text-background"
                : "text-text-primary group-hover:text-background group-focus-visible:text-background"
            }`}
          >
            {link.label}
          </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder to maintain width and height */}
        <span
          aria-hidden="true"
          className="opacity-0 pointer-events-none select-none block whitespace-nowrap"
        >
          {link.label}
        </span>
      </motion.span>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-foreground z-20 pointer-events-none"
        initial={
          prefersReducedMotion
            ? { scaleX: 0 }
            : { scaleX: 1, transformOrigin: "right" }
        }
        animate={{
          scaleX: 0,
          transformOrigin: "right",
          transition: {
            duration: prefersReducedMotion ? 0 : 0.8,
            ease,
            delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1,
          },
        }}
        exit={{
          scaleX: prefersReducedMotion ? 0 : 1,
          transformOrigin: "right",
          transition: {
            duration: prefersReducedMotion ? 0 : 0.25,
            ease,
            delay: prefersReducedMotion ? 0 : (navLinksLength - 1 - i) * 0.04,
          },
        }}
      />
    </motion.a>
  );
}
