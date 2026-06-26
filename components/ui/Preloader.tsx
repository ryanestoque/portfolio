"use client";

import { useEffect, useRef, useState } from "react";
import { usePreloader } from "./PreloaderProvider";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

const CRITICAL_IMAGES = [
  "/images/hero/ryan-light.webp",
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

const MIN_DISPLAY_MS = 500;
const ASSET_TIMEOUT_MS = 3000;

export default function Preloader() {
  const { completeLoading, transitionHref, completeTransition } = usePreloader();
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const [exiting, setExiting] = useState(false);
  const hasExitedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);
  const lastPathnameRef = useRef(pathname);

  /* ── Preload images and handle progress ──────────────── */
  useEffect(() => {
    document.body.classList.add("loading-locked");

    let assetsReady = false;
    let timerReady = false;

    let loaded = 0;
    const total = CRITICAL_IMAGES.length;

    const updateProgress = (newLoaded: number) => {
      if (total === 0) return;
      const percent = (newLoaded / total) * 100;
      if (progressTweenRef.current) progressTweenRef.current.kill();
      if (progressBarRef.current) {
        progressTweenRef.current = gsap.to(progressBarRef.current, {
          width: `${percent}%`,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

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
    
    if (total === 0) {
      assetsReady = true;
      tryExit();
    } else {
      const onDone = () => {
        loaded++;
        updateProgress(loaded);
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

    // Fade out progress wrapper
    tl.to(progressWrapperRef.current, {
      opacity: 0,
      duration: 0.3,
    }, 0);

    // Slide bars left staggered
    tl.to(barsRef.current, {
      xPercent: -100,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.inOut",
    }, 0);

  }, [exiting, completeLoading]);

  /* ── Route transition logic ────────────────────────── */
  useEffect(() => {
    if (transitionHref && overlayRef.current && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      
      // Make sure overlay is visible
      overlayRef.current.style.display = "flex";
      
      // Hide progress bar for transitions
      if (progressWrapperRef.current) {
        progressWrapperRef.current.style.display = "none";
      }

      // Reset bars to be off-screen right
      gsap.set(barsRef.current, { xPercent: 100 });

      // Slide in from right to cover screen
      gsap.to(barsRef.current, {
        xPercent: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.inOut",
        onComplete: () => {
          // Perform the actual route change
          router.push(transitionHref);
        }
      });
    }
  }, [transitionHref, router]);

  useEffect(() => {
    // Detect route change completion
    if (pathname !== lastPathnameRef.current) {
      lastPathnameRef.current = pathname;
      
      if (isTransitioningRef.current && overlayRef.current) {
        // Slide left to reveal new page
        gsap.to(barsRef.current, {
          xPercent: -100,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.inOut",
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
            isTransitioningRef.current = false;
            completeTransition();
          }
        });
      } else if (hasExitedRef.current && overlayRef.current) {
        // Browser back/forward (pathname changed without starting a transition)
        if (progressWrapperRef.current) {
          progressWrapperRef.current.style.display = "none";
        }
        
        overlayRef.current.style.display = "flex";
        gsap.set(barsRef.current, { xPercent: 0 });
        
        gsap.to(barsRef.current, {
          xPercent: -100,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.inOut",
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
          }
        });
      }
    }
  }, [pathname, completeTransition]);

  return (
    <div ref={overlayRef} className="preloader-overlay" aria-hidden="true" style={{ backgroundColor: 'transparent' }}>
      {/* 5 Staggered Horizontal Bars */}
      <div className="absolute inset-0 flex flex-col w-full h-full pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            ref={(el) => { barsRef.current[i] = el; }} 
            className="flex-1 w-full bg-background pointer-events-auto border-l-1 border-r-1 border-accent"
            style={{ willChange: "transform", scale: "1 1.05" }}
          />
        ))}
      </div>
      
      {/* Progress Bar Wrapper */}
      <div ref={progressWrapperRef} className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
        <div className="w-64 h-[2px] bg-foreground/20 rounded-full overflow-hidden">
          <div ref={progressBarRef} className="h-full bg-foreground origin-left w-0" />
        </div>
      </div>
    </div>
  );
}
