"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_PROJECT_COUNT = 3;

const ArrowRightIcon = (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainSection = ref.current;
    const track = trackRef.current;
    if (!mainSection || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        const getPinDuration = () => Math.max(0, Math.abs(getScrollAmount()));
        const getLeadInDistance = () =>
          mainSection.offsetHeight / 2 + window.innerHeight * 0.1;

        let tweenTrigger: ScrollTrigger | undefined;

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: mainSection,
            pin: true,
            start: "center center",
            end: () => `+=${getPinDuration()}`,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              track.style.willChange = self.isActive ? "transform" : "auto";
            },
          });

          // Starts moving sideways at "top 60%" and finishes at the exact scroll pixel the pin ends
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainSection,
              start: "top 60%",
              end: () => `+=${getLeadInDistance() + getPinDuration()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          tweenTrigger = tl.scrollTrigger;

          tl.to(track, {
            x: () => getScrollAmount(),
            ease: "none",
            duration: 1,
          });
        }, mainSection);

        // Sync vertical ScrollTrigger position when a keyboard user tabs through horizontal cards
        const handleFocusIn = (e: FocusEvent) => {
          const target = e.target as HTMLElement | null;
          const card = target?.closest<HTMLElement>(".project-card");
          if (!card || !tweenTrigger) return;

          const maxScroll = Math.abs(getScrollAmount());
          if (maxScroll <= 0) return;

          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const desiredX = Math.min(
            0,
            Math.max(getScrollAmount(), window.innerWidth / 2 - cardCenter)
          );
          const targetProgress = Math.abs(desiredX) / maxScroll;
          const targetScrollY =
            tweenTrigger.start +
            targetProgress * (tweenTrigger.end - tweenTrigger.start);

          const rect = card.getBoundingClientRect();
          if (rect.left < 24 || rect.right > window.innerWidth - 24) {
            window.scrollTo({ top: targetScrollY, behavior: "auto" });
            ScrollTrigger.update();
          }
        };

        track.addEventListener("focusin", handleFocusIn);

        return () => {
          track.removeEventListener("focusin", handleFocusIn);
          track.style.willChange = "auto";
          ctx.revert();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="relative py-32 lg:py-14 xl:py-20 motion-reduce:lg:py-32 min-h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* ── Section Header ──────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-16 lg:mb-6 xl:mb-10 motion-reduce:lg:mb-16">
          <SectionHeader number="IV" label="BUILDS" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 lg:mb-8 xl:mb-12 motion-reduce:lg:mb-20">
          <h2
            id="projects-heading"
            className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-text-primary lg:max-w-3xl flex flex-col items-start"
          >
            <span className="sr-only">Works proudly crafted.</span>

            {/* Desktop / Tablet view (>= 425px) */}
            <ScrollRevealBars
              duration={1}
              delay={0}
              className="hidden min-[425px]:inline-block"
              aria-hidden="true"
            >
              <span>
                Works <span className="font-normal">proudly</span>
              </span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.15}
              className="hidden min-[425px]:inline-block"
              aria-hidden="true"
            >
              <span>crafted.</span>
            </ScrollRevealBars>

            {/* Mobile view (< 425px) */}
            <ScrollRevealBars
              duration={1}
              delay={0}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span>Works</span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.15}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span className="font-normal">proudly</span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.3}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span>crafted.</span>
            </ScrollRevealBars>
          </h2>
        </div>
      </div>

      {/* ── Desktop: Horizontal Scroll (active only when prefers-reduced-motion: no-preference) ── */}
      <div className="hidden lg:block motion-reduce:lg:hidden relative">
        <div
          ref={trackRef}
          className="flex items-stretch gap-12 xl:gap-16"
          style={{
            paddingLeft: "60vw",
            paddingRight: "calc(max(4rem, 50vw - 700px + 4rem))",
            width: "max-content",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0"
              style={{ width: "clamp(360px, 36vw, 520px)" }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile (< 1024px) & Desktop Reduced-Motion Fallback: Static Grid ── */}
      <div className="lg:hidden motion-reduce:lg:block relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.slice(0, 4).map((project, i) => (
            <div
              key={project.id}
              className={i >= MOBILE_PROJECT_COUNT ? "hidden lg:block" : ""}
            >
              <ProjectCard project={project} maxTags={3} />
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 flex justify-center">
          <Button href="/projects" data-cursor="target" icon={ArrowRightIcon}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
