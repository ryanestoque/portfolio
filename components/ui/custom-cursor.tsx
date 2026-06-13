"use client";

import { useEffect, useRef } from "react";
import { usePreloader } from "./PreloaderProvider";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePreloader();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    const ease = 0.25;
    let needsSnap = true;
    let isVisible = false;

    const setVisibility = (visible: boolean) => {
      if (!cursorRef.current) return;
      if (visible === isVisible) return;
      isVisible = visible;
      cursorRef.current.style.opacity = visible ? "1" : "0";
    };
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (needsSnap) {
        curX = mouseX;
        curY = mouseY;
        needsSnap = false;
      }
      setVisibility(true);
    };
    const onMouseLeave = () => {
      mouseX = -200;
      mouseY = -200;
      setVisibility(false);
      needsSnap = true;
    };
    let raf: number;
    const tick = () => {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX}px, ${curY}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor hidden md:block"
      style={{ opacity: isLoading ? 0 : undefined }}
    />
  );
}