import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all projects built by Ryan Estoque — from full-stack web apps and IoT dashboards to AR learning tools and e-commerce platforms.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ryan Estoque",
    description:
      "Explore all projects built by Ryan Estoque — from full-stack web apps and IoT dashboards to AR learning tools and e-commerce platforms.",
    url: "https://ryanestoque.dev/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ryan Estoque",
    description:
      "Explore all projects built by Ryan Estoque — from full-stack web apps and IoT dashboards to AR learning tools and e-commerce platforms.",
    images: ["/images/open-graph/ryan-portfolio-og-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
