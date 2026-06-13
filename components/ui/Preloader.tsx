"use client";

import { useEffect, useRef, useState } from "react";
import { usePreloader } from "./PreloaderProvider";
import gsap from "gsap";

/* ── Critical images the preloader waits for ──────────── */
const CRITICAL_IMAGES = [
  "/images/hero/ryan-the-hacker.webp",
  "/images/experience/ryan-full-stack.webp",
  "/images/experience/with-loml.webp",
  "/images/experience/technofair-prog-2024.webp",
  "/images/experience/cetso-representative.webp",
  "/images/experience/its-creatives-committee.webp",
  "/images/experience/ideas-plug-in-experience.webp",
  "/images/experience/codechum-programming-2024.webp",
  "/images/experience/psits-quiz-bowl.webp",
];

const MIN_DISPLAY_MS = 2500;
const ASSET_TIMEOUT_MS = 12000;

export default function Preloader() {
  const { completeLoading } = usePreloader();
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const [exiting, setExiting] = useState(false);
  const hasExitedRef = useRef(false);

  /* ── Preload images and handle progress ──────────────── */
  useEffect(() => {
    document.body.classList.add("loading-locked");

    let assetsReady = false;
    let timerReady = false;

    // Start progress bar animation to 90%
    if (progressBarRef.current) {
      progressTweenRef.current = gsap.to(progressBarRef.current, {
        width: "90%",
        duration: MIN_DISPLAY_MS / 1000,
        ease: "power2.out"
      });
    }

    const tryExit = () => {
      if (assetsReady && timerReady && !hasExitedRef.current) {
        hasExitedRef.current = true;
        if (progressTweenRef.current) progressTweenRef.current.kill();
        
        // Finish progress to 100% then trigger exit
        gsap.to(progressBarRef.current, {
          width: "100%",
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            setExiting(true);
          }
        });
      }
    };

    const timer = setTimeout(() => {
      timerReady = true;
      tryExit();
    }, MIN_DISPLAY_MS);

    const hardTimeout = setTimeout(() => {
      assetsReady = true;
      timerReady = true;
      tryExit();
    }, ASSET_TIMEOUT_MS);

    let loaded = 0;
    const total = CRITICAL_IMAGES.length;
    
    if (total === 0) {
      assetsReady = true;
      tryExit();
    } else {
      const onDone = () => {
        loaded++;
        if (loaded >= total) {
          assetsReady = true;
          tryExit();
        }
      };

      CRITICAL_IMAGES.forEach((src) => {
        const img = new Image();
        img.onload = onDone;
        img.onerror = onDone;
        img.src = src;
      });
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(hardTimeout);
      if (progressTweenRef.current) progressTweenRef.current.kill();
    };
  }, []);

  /* ── Exit animation ─────────────────────────────────── */
  useEffect(() => {
    if (!exiting || !overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("loading-locked");
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
        completeLoading();
      },
    });

    // Slide overlay up
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    });

  }, [exiting, completeLoading]);

  return (
    <div ref={overlayRef} className="preloader-overlay flex flex-col justify-center items-center" aria-hidden="true">
      <div className="w-64 h-[2px] bg-foreground/20 rounded-full overflow-hidden">
        <div ref={progressBarRef} className="h-full bg-foreground origin-left w-0" />
      </div>
    </div>
  );
}
