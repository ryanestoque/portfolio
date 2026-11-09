import Image from "next/image";
import { Button } from "@/components/ui/button";

const HERO_IMAGE_SIZES = "(max-width: 640px) 200px, (max-width: 1024px) 240px, (max-width: 1440px) 40vw, 580px";

function AbstractVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-full lg:h-full">
        <div className="relative w-full h-full overflow-hidden">
          {/* Dark Theme Image */}
          <Image
            src="/images/hero/ryan-the-hacker.webp"
            alt="Ryan Estoque"
            fill
            sizes={HERO_IMAGE_SIZES}
            fetchPriority="high"
            className="object-cover transition-opacity duration-500 motion-reduce:transition-none opacity-0 dark:opacity-100"
            style={{ objectPosition: "center 60%" }}
          />
          {/* Light Theme Image (empty alt prevents duplicate announcement in accessibility tree) */}
          <Image
            src="/images/hero/ryan-light.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes={HERO_IMAGE_SIZES}
            fetchPriority="high"
            className="object-cover transition-opacity duration-500 motion-reduce:transition-none opacity-100 dark:opacity-0"
            style={{ objectPosition: "center 60%" }}
          />
        </div>

        <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-l-2 border-accent" />
        <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-r-2 border-accent" />
        <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-l-2 border-accent" />
        <div className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-r-2 border-accent" />
      </div>
    </div>
  );
}

export default function Hero() {
  const headingLine1 = "Ryan";
  const headingLine2 = "Estoque";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[128px] lg:pt-[0px] pb-24 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-0 lg:min-h-[calc(100vh-72px)] w-full">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-last mt-4 lg:mt-0 w-full lg:w-auto">
            <div
              data-hero="location"
              className="flex items-center justify-center lg:justify-start gap-3 mb-8 lg:mb-12"
            >
              <svg aria-hidden="true" className="w-4 h-4 text-accent/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-xs tracking-[0.3em] uppercase text-text-secondary font-normal">
                Davao City, Philippines
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 className="font-heading font-semibold leading-[1] tracking-tight flex flex-col justify-center lg:justify-start items-center lg:items-start">
                <span className="block overflow-hidden">
                  <span
                    data-hero="firstname"
                    className="block text-[clamp(4.5rem,10vw,9rem)] text-gradient"
                  >
                    {headingLine1}
                  </span>
                </span>

                {/* Line 2 */}
                <span className="block overflow-hidden">
                  <span
                    data-hero="lastname"
                    className="block text-[clamp(4.5rem,10vw,9rem)] text-gradient"
                  >
                    {headingLine2}
                  </span>
                </span>
              </h1>
            </div>

            <h2
              data-hero="role"
              className="mt-3 lg:mt-4 text-lg md:text-xl leading-relaxed text-text-primary font-normal flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <span className="w-6 lg:w-8 h-[1px] bg-text-primary block rounded-full"></span>
              <span>Full Stack Developer</span>
              <span className="w-6 h-[1px] bg-text-primary block rounded-full lg:hidden"></span>
            </h2>

            <div data-hero="cta" className="flex flex-col min-[380px]:flex-row w-full max-w-md lg:max-w-none items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-8 lg:mt-10">
              <Button
                href="#contact"
                className="w-full"
                icon={
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
                data-cursor="target"
              >
                Contact Me
              </Button>

              <Button
                href="/cv.pdf"
                className="w-full"
                aria-label="View CV (opens PDF in a new tab)"
                icon={
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                }
                data-cursor="target"
              >
                View CV
              </Button>
            </div>
          </div>

          <div
            data-hero="image"
            className="flex items-center justify-center relative order-first shrink-0"
          >
            <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[clamp(400px,40vw,580px)] lg:h-[clamp(400px,40vw,580px)] aspect-square">
              <AbstractVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
