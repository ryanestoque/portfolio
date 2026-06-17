"use client";

import { useEffect, useRef } from "react";
import { usePreloader } from "./PreloaderProvider";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePreloader();
  // Use a ref instead of state so hover transitions are synchronous —
  // avoids React batching delays that cause stale animation sequences.
  const isHoveringRef = useRef(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    const ease = 0.2;
    let needsSnap = true;
    let isVisible = false;

    const setVisibility = (visible: boolean) => {
      if (!cursorRef.current) return;
      if (visible === isVisible) return;
      isVisible = visible;
      gsap.to(cursorRef.current, {
        opacity: visible ? 1 : 0,
        duration: 0.3,
      });
    };

    const setHovering = (hovering: boolean) => {
      // Bail early if nothing changed — prevents redundant tween spam.
      if (isHoveringRef.current === hovering) return;
      isHoveringRef.current = hovering;

      if (!cursorRef.current || !bracketsRef.current) return;

      // Kill any in-flight tweens so rapid toggling never leaves the
      // brackets stuck in an intermediate state.
      gsap.killTweensOf(cursorRef.current);
      gsap.killTweensOf(bracketsRef.current);

      if (hovering) {
        gsap.to(cursorRef.current, {
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(bracketsRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 90,
          duration: 0.4,
          ease: "back.out(1.5)",
        });
      } else {
        gsap.to(cursorRef.current, {
          width: 12,
          height: 12,
          marginLeft: -5,
          marginTop: -5,
          backgroundColor: "#fff",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(bracketsRef.current, {
          opacity: 0,
          scale: 0.5,
          rotation: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
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

      const target = e.target as HTMLElement;
      if (target && typeof target.closest === "function") {
        const hovering = !!target.closest('[data-cursor="project"], [data-cursor="target"]');
        setHovering(hovering);
      }
    };
    
    const onMouseLeave = () => {
      mouseX = -200;
      mouseY = -200;
      setVisibility(false);
      needsSnap = true;
      setHovering(false);
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
      style={{ opacity: isLoading ? 0 : 1 }}
    >
      <div ref={bracketsRef} className="relative w-full h-full opacity-0 scale-50">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] border-white" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[2px] border-r-[2px] border-white" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[2px] border-l-[2px] border-white" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] border-white" />
      </div>
    </div>
  );
}