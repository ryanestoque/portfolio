"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reads the `scrollTo` key written to sessionStorage by the Navbar
 * when a user clicks a nav link while on a non-home page (e.g. /projects/[slug]).
 * After the home page mounts we consume the key and smooth-scroll to the section.
 *
 * Also handles restoring the exact scroll position when the page is reloaded,
 * compensating for GSAP's dynamic pin spacing.
 */
export default function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Handle Navigation Scroll-To-Section
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      const frame = requestAnimationFrame(() => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    // 2. Handle Refresh Scroll Restoration for GSAP Pinning
    if (pathname === "/") {
      const savedPos = sessionStorage.getItem("homeScrollPos");
      if (savedPos) {
        sessionStorage.removeItem("homeScrollPos");
        // Wait for GSAP ScrollTriggers to initialize and calculate pin spacing
        const timeoutId = setTimeout(() => {
          window.scrollTo(0, parseInt(savedPos, 10));
        }, 150);
        
        // We only want to run the cleanup timeout if the effect unmounts early
        // otherwise it just runs
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [pathname]);

  // Save scroll position before reload
  useEffect(() => {
    if (pathname !== "/") return;

    const handleBeforeUnload = () => {
      sessionStorage.setItem("homeScrollPos", window.scrollY.toString());
    };

    // Disable native scroll restoration so it doesn't fight with our manual restoration
    // and GSAP's layout shifts.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
