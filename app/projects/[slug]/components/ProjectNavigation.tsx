import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface ProjectNavigationProps {
  isInView: boolean;
}

export default function ProjectNavigation({ isInView }: ProjectNavigationProps) {
  return (
    <motion.div
      custom={8}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-16"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* All Projects */}
        <Button
          href="/"
          data-cursor="target"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          }
        >
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
}
