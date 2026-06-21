import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects-data";
import { fadeUp } from "@/lib/animations";

interface ProjectHeaderProps {
  project: Project;
  isInView: boolean;
}

export default function ProjectHeader({ project, isInView }: ProjectHeaderProps) {
  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-8"
    >
      <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] text-gradient mb-4">
        {project.title}
      </h1>

      {project.subtitle && (
        <p className="text-lg md:text-xl text-text-secondary font-medium mb-8">
          {project.subtitle}
        </p>
      )}

      {(project.github || project.demo) && (
        <div className="flex flex-col sm:flex-row w-full items-center gap-3 sm:gap-4 mb-10">
          {project.demo && (
            project.demoAvailable === false ? (
              <div className="relative group/tooltip w-full">
                <Button
                  disabled
                  className="w-full"
                  icon={
                    <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background"></span>
                    </div>
                  }
                >
                  Live Demo
                </Button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-surface-elevated/80 backdrop-blur-md text-xs px-3 py-2 border border-border tracking-wider z-20 shadow-lg">
                  Not yet available for this project
                  {/* Triangle pointer */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-border"></div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-surface"></div>
                </div>
              </div>
            ) : (
              <Button
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                icon={
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background"></span>
                  </div>
                }
                data-cursor="target"
              >
                Live Demo
              </Button>
            )
          )}
          {project.github && (
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              }
              data-cursor="target"
            >
              Source Code
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
