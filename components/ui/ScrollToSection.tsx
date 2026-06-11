"use client";

import { useEffect } from "react";

/**
 * Reads the `scrollTo` key written to sessionStorage by the Navbar
 * when a user clicks a nav link while on a non-home page (e.g. /projects/[slug]).
 * After the home page mounts we consume the key and smooth-scroll to the section.
 */
export default function ScrollToSection() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (!target) return;

    sessionStorage.removeItem("scrollTo");

    // Give the page a moment to fully render before scrolling
    const frame = requestAnimationFrame(() => {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
