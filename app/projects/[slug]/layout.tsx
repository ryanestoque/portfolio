
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
    openGraph: {
      title: `${project.title} | Ryan Estoque`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>;
}
