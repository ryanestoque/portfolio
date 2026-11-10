import { ScrollRevealBars } from "@/components/ui/ScrollRevealBars";
import SectionHeader from "@/components/ui/SectionHeader";
import WipeTag from "@/components/ui/WipeTag";

const techCategories = [
  {
    title: "LANGUAGES",
    items: [
      "JavaScript",
      "TypeScript",
      "Java",
      "Python",
      "C++",
    ],
  },
  {
    title: "FRONTEND",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "React Native",
      "MindAR",
    ],
  },
  {
    title: "BACKEND",
    items: [
      "Node.js",
      "FastAPI",
      "Express.js",
      "Django REST Framework",
      "JWT",
    ],
  },
  {
    title: "DATABASES",
    items: [
      "MySQL",
      "PostgreSQL",
      "Firebase",
      "Supabase",
    ],
  },
  {
    title: "DEVOPS & DEPLOYMENT",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Render",
    ],
  },
  {
    title: "TOOLS",
    items: [
      "VS Code",
      "Antigravity",
      "Figma",
      "Google AI Studio",
      "Android Studio",
      "Postman",
      "Miro",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-16">
          <SectionHeader number="II" label="TOOLBOX" />
        </div>

        <div className="mb-20">
          <h2
            id="skills-heading"
            className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] text-text-primary lg:max-w-3xl flex flex-col items-start"
          >
            <span className="sr-only">Thoughtfully used technologies.</span>

            {/* Desktop / Tablet view (>= 425px) */}
            <ScrollRevealBars
              duration={1}
              delay={0}
              className="hidden min-[425px]:inline-block"
              aria-hidden="true"
            >
              <span>
                <span className="font-normal">Thoughtfully</span> used
              </span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.15}
              className="hidden min-[425px]:inline-block"
              aria-hidden="true"
            >
              <span>technologies.</span>
            </ScrollRevealBars>

            {/* Mobile view (< 425px) */}
            <ScrollRevealBars
              duration={1}
              delay={0}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span className="font-normal">Thoughtfully</span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.15}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span>used</span>
            </ScrollRevealBars>
            <ScrollRevealBars
              duration={1}
              delay={0.3}
              className="min-[425px]:hidden"
              aria-hidden="true"
            >
              <span>technologies.</span>
            </ScrollRevealBars>
          </h2>
        </div>

        <div className="space-y-12">
          {techCategories.map((category, catIndex) => {
            const categoryHeadingId = `skills-category-${catIndex}`;
            return (
              <div key={category.title}>
                <div className="flex items-center gap-4 mb-6">
                  <h3
                    id={categoryHeadingId}
                    className="font-heading text-xs md:text-sm tracking-[0.15em] uppercase font-semibold text-text-primary whitespace-nowrap"
                  >
                    {category.title}
                  </h3>
                  <div className="flex-1 h-[1px] bg-border" aria-hidden="true" />
                </div>

                <ul
                  aria-labelledby={categoryHeadingId}
                  className="flex flex-wrap gap-3 list-none p-0 m-0"
                >
                  {category.items.map((item) => (
                    <li key={item}>
                      <SkillTag item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillTag({ item }: { item: string }) {
  return (
    <WipeTag
      className="px-4 py-2 border border-border bg-surface hover:border-accent/40 text-xs tracking-wide font-normal"
      data-cursor="target"
    >
      {item}
    </WipeTag>
  );
}
