import { motion } from "framer-motion";
import type { Project } from "@/lib/projects-data";
import WipeTag from "@/components/ui/WipeTag";
import { fadeUp } from "@/lib/animations";

interface ProjectSidebarProps {
  project: Project;
  isInView: boolean;
}

export default function ProjectSidebar({ project, isInView }: ProjectSidebarProps) {
  return (
    <div className="lg:col-span-4">
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="lg:sticky lg:top-[96px] space-y-8"
      >
        <div className="border border-border p-6">
          <h3 className="font-heading text-base text-text-primary mb-6 font-semibold">
            Project Details
          </h3>
          <div className="editorial-line mb-6" />

          <div className="space-y-5">
            {project.role && (
              <div>
                <span className="text-xs tracking-wide text-text-secondary block mb-1">
                  Role
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {project.role}
                </span>
              </div>
            )}
            {project.team && (
              <div>
                <span className="text-xs tracking-wide text-text-secondary block mb-1">
                  Team
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {project.team}
                </span>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="text-xs tracking-wide text-text-secondary block mb-1">
                  Duration
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {project.duration}
                </span>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs tracking-wide text-text-secondary block mb-2">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <WipeTag
                      key={tag}
                      className="px-3 py-1.5 border border-border bg-surface hover:border-accent/40 text-xs tracking-wide font-normal"
                      data-cursor="target"
                    >
                      {tag}
                    </WipeTag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
