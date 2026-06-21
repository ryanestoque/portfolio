import { motion } from "framer-motion";
import type { Project } from "@/lib/projects-data";
import { fadeUp } from "@/lib/animations";

interface ProjectContentInfoProps {
  project: Project;
  isInView: boolean;
}

export default function ProjectContentInfo({ project, isInView }: ProjectContentInfoProps) {
  return (
    <div className="lg:col-span-8">
      {/* Overview */}
      {project.longDescription && (
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Overview
          </h2>
          <div className="editorial-line mb-6" />
          <p className="text-base md:text-lg leading-relaxed text-text-secondary">
            {project.longDescription}
          </p>
        </motion.div>
      )}

      {/* Problem */}
      {project.problem && (
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Problem
          </h2>
          <div className="editorial-line mb-6" />
          <p className="text-base md:text-lg leading-relaxed text-text-secondary">
            {project.problem}
          </p>
        </motion.div>
      )}

      {/* Solution */}
      {project.solution && (
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Solution
          </h2>
          <div className="editorial-line mb-6" />
          <p className="text-base md:text-lg leading-relaxed text-text-secondary">
            {project.solution}
          </p>
        </motion.div>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Key Features
          </h2>
          <div className="editorial-line mb-6" />
          <ul className="space-y-4">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-xs tracking-[0.3em] text-text-tertiary font-medium mt-1.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed text-text-secondary">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
