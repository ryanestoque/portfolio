"use client";

import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import type { Project } from "@/lib/projects-data";
import WipeTag from "@/components/ui/WipeTag";

export interface ProjectCardProps {
  project: Project;
  /** Maximum number of tags to display before showing a "+X" badge. Defaults to 4. */
  maxTags?: number;
  /** Aspect ratio class for the image container. Defaults to "aspect-video". */
  aspectRatioClass?: string;
  /** Extra classes for the card container */
  className?: string;
}

export default function ProjectCard({
  project,
  maxTags = 4,
  aspectRatioClass = "aspect-video",
  className = "",
}: ProjectCardProps) {
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      className={`group flex flex-col h-full border border-border bg-surface hover:border-accent/30 transition-all duration-500 ${className}`}
      data-cursor="project"
    >
      {/* Image Preview */}
      <div className={`relative ${aspectRatioClass} overflow-hidden flex-shrink-0`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            project.darkImage ? "dark:hidden" : ""
          }`}
        />
        {project.darkImage && (
          <Image
            src={project.darkImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 hidden dark:block"
          />
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
      </div>

      {/* Card Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-heading text-xl lg:text-2xl font-medium text-text-primary group-hover:text-accent transition-colors duration-500">
            {project.title}
          </h3>
          <span className="text-[11px] lg:text-xs tracking-wider uppercase text-text-tertiary flex-shrink-0 pt-1.5">
            {project.year}
          </span>
        </div>

        <p className="text-sm lg:text-base leading-relaxed text-text-secondary mb-5 font-normal line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, maxTags).map((tag) => (
            <span
              key={tag}
              className="font-normal text-xs tracking-wide px-4 py-2 border border-border text-text-primary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > maxTags && (
            <span className="font-normal text-xs tracking-wide px-4 py-2 border border-border text-text-secondary">
              +{project.tags.length - maxTags}
            </span>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
