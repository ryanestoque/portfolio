"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

const stages = [
  {
    label: "01",
    paragraph: (
      <>
        I am a 3rd-Year BSIT Student &amp;{" "}
        <span className="font-medium text-text-primary">
          Full Stack Developer
        </span>{" "}
        specializing in modern Web and Android applications. I built responsive
        frontends, scalable backends, and practical digital experiences. Rather
        than creating for the sake of creating, I believe meaningful software
        begins with a problem worth solving.
      </>
    ),
  },
  {
    label: "02",
    paragraph: (
      <>
        Throughout my academic and personal development journey, I have built a
        diverse range systems, from business management
        solutions to interactive 3D web experiences and IoT hardware
        integrations.
      </>
    ),
  },
  {
    label: "03",
    paragraph: (
      <>
        Currently, I challenge myself through complex academic projects and
        self-directed learning. I focus on creating scalable systems that are
        practical, highly interactive, and ready for deployment, while utilizing
        modern technologies such as AI-assisted tools to streamline workflows.
      </>
    ),
  },
];

function ScrollDrivenStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
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

        if (progressFillRef.current) {
          gsap.fromTo(
            progressFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }

        if (scrollIndicatorRef.current) {
          gsap.fromTo(
            scrollIndicatorRef.current,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "80% bottom",
                end: "bottom 60%",
                scrub: 0.6,
              },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="hidden lg:block relative -mb-40"
      style={{ minHeight: `${stages.length * 100}vh` }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-8">
          <div
            className="col-span-5"
            style={{ position: "sticky", top: 0, height: "100vh", alignSelf: "start" }}
          >
            <div className="h-full flex flex-col justify-center">
              <div className="relative">
                <div className="absolute bottom-full left-0 mb-12 flex items-center gap-3 whitespace-nowrap">
                  <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">01</span>
                  <div className="w-12 h-[1px] bg-border" />
                  <span className="text-xs tracking-[0.3em] uppercase text-text-tertiary">PHILOSOPHY</span>
                </div>
                <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient flex flex-col items-start">
                  <ScrollRevealBars duration={1} delay={0}>
                    <span>Driven by</span>
                  </ScrollRevealBars>
                  <ScrollRevealBars duration={1} delay={0.15}>
                    <span><span className="font-normal">necessity</span> to</span>
                  </ScrollRevealBars>
                  <ScrollRevealBars duration={1} delay={0.3}>
                    <span>create.</span>
                  </ScrollRevealBars>
                </h2>
              </div>
            </div>
          </div>

          <div className="col-span-7 xl:col-span-6 xl:col-start-7">
            {stages.map((stage, i) => (
              <div
                key={i}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="flex items-center"
                style={{ height: "100vh" }}
              >
                <div className="w-full">
                  <p className="text-lg xl:text-2xl leading-relaxed text-text-secondary font-normal">
                    {stage.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function MobileStory() {
  return (
    <div className="lg:hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary font-medium">01</span>
          <div className="w-8 h-[1px] bg-accent/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-secondary font-medium">PHILOSOPHY</span>
        </motion.div>

        <div className="mb-14">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-gradient flex flex-col items-start">
            <ScrollRevealBars duration={1} delay={0}>
              <span>Driven by</span>
            </ScrollRevealBars>
            <ScrollRevealBars duration={1} delay={0.15}>
              <span><span className="font-normal">necessity</span> to</span>
            </ScrollRevealBars>
            <ScrollRevealBars duration={1} delay={0.3}>
              <span>create.</span>
            </ScrollRevealBars>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <p className="text-lg leading-relaxed text-text-secondary font-medium">
                {stage.paragraph}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <ScrollDrivenStory />
      <MobileStory />
    </section>
  );
}
