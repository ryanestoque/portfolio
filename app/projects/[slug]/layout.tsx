
import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects-data";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

// This function dynamically generates metadata based on the project slug
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title, // This will become "Project Title | Ryan Estoque" because of the template in your root layout
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Ryan Estoque`,
      description: project.description,
      url: `https://ryanestoque.dev/projects/${slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.subtitle ?? "Project"} screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ryan Estoque`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>;
}
