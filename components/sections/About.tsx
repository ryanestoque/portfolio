"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";

const paragraphs = [
  <>
    I am a 4th-Year BSIT Student &amp;{" "}
    <span className="font-medium text-text-primary">
      Full Stack Developer
    </span>{" "}
    specializing in modern Web and Android applications. I build responsive
    frontends, scalable backends, and practical digital experiences. Rather
    than creating for the sake of creating, I believe meaningful software
    begins with a problem worth solving.
  </>,
  <>
    Throughout my academic and personal development journey, I have built a
    diverse range of systems, from business management solutions to
    interactive web experiences and IoT hardware integrations.
  </>,
  <>
    Currently, I challenge myself through complex academic projects and
    self-directed learning. I focus on creating scalable systems that are
    practical, highly interactive, and ready for deployment, while utilizing
    modern technologies such as AI-assisted tools to streamline workflows.
  </>,
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          panelRefs.current.forEach((panel, i) => {
            const content = contentRefs.current[i];
            if (!panel || !content) return;

            gsap.fromTo(
              content,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  end: "top 40%",
                  scrub: 0.8,
                },
              }
            );
          });
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative py-32 lg:py-0 motion-reduce:lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen lg:self-start motion-reduce:lg:static motion-reduce:lg:h-auto">
            <div className="lg:h-full lg:flex lg:flex-col lg:justify-center lg:pt-[72px] motion-reduce:lg:pt-0">
              <div className="mb-12">
                <SectionHeader number="01" label="PHILOSOPHY" />
              </div>

              <h2
                id="about-heading"
                className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-text-primary flex flex-col items-start mb-14 lg:mb-0"
              >
                <span className="sr-only">Driven by necessity to create.</span>
                <span aria-hidden="true" className="flex flex-col items-start">
                  <ScrollRevealBars duration={1} delay={0}>
                    <span>Driven by</span>
                  </ScrollRevealBars>
                  <ScrollRevealBars duration={1} delay={0.15}>
                    <span>
                      <span className="font-normal">necessity</span> to
                    </span>
                  </ScrollRevealBars>
                  <ScrollRevealBars duration={1} delay={0.3}>
                    <span>create.</span>
                  </ScrollRevealBars>
                </span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7 flex flex-col gap-8 lg:gap-0 motion-reduce:lg:gap-12">
            {paragraphs.map((paragraph, i) => (
              <div
                key={i}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="lg:h-screen lg:flex lg:items-center motion-reduce:lg:h-auto"
              >
                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="w-full"
                >
                  <p className="text-base md:text-lg xl:text-2xl leading-relaxed text-text-secondary font-normal">
                    {paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
