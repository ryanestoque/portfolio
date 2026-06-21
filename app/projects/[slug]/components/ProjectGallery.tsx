import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/projects-data";
import { fadeUp } from "@/lib/animations";

interface ProjectGalleryProps {
  project: Project;
  isInView: boolean;
}

export default function ProjectGallery({ project, isInView }: ProjectGalleryProps) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <motion.div
      custom={7}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-20"
    >
      <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
        Gallery
      </h2>
      <div className="editorial-line mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.gallery.map((img, i) => (
          <div key={i} className="relative aspect-[16/10] overflow-hidden border border-border">
            <Image
              src={img}
              alt={`${project.title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
