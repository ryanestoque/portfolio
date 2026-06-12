export interface Experience {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  description: string;
  image: string;
  certificate?: string;
}

export const experiences: Experience[] = [
  {
    id: "experience-1",
    role: "Full Stack Developer",
    company: "Company Name",
    dateRange: "Jan 2025 – Present",
    description:
      "Built and maintained scalable web applications using React, Next.js, and Node.js. Led frontend architecture decisions and implemented CI/CD pipelines.",
    image: "/images/experience/placeholder-1.jpg",
    certificate: "/images/certificates/placeholder-cert-1.jpg",
  },
  {
    id: "experience-2",
    role: "Frontend Developer Intern",
    company: "Company Name",
    dateRange: "Jun 2024 – Dec 2024",
    description:
      "Developed responsive user interfaces and interactive components. Collaborated with design teams to translate Figma mockups into production-ready code.",
    image: "/images/experience/placeholder-2.jpg",
  },
  {
    id: "experience-3",
    role: "Freelance Web Developer",
    company: "Self-employed",
    dateRange: "Mar 2024 – Jun 2024",
    description:
      "Delivered custom web solutions for small businesses, including e-commerce platforms and portfolio sites with modern UI/UX standards.",
    image: "/images/experience/placeholder-3.jpg",
    certificate: "/images/certificates/placeholder-cert-2.jpg",
  },
  {
    id: "experience-4",
    role: "UI/UX Designer",
    company: "Company Name",
    dateRange: "Jan 2024 – Mar 2024",
    description:
      "Designed user-centered interfaces for mobile and web applications. Conducted user research and created interactive prototypes in Figma.",
    image: "/images/experience/placeholder-4.jpg",
  },
  {
    id: "experience-5",
    role: "Junior Developer",
    company: "Company Name",
    dateRange: "Sep 2023 – Dec 2023",
    description:
      "Contributed to backend API development and database optimization. Participated in agile sprints and code review processes.",
    image: "/images/experience/placeholder-5.jpg",
    certificate: "/images/certificates/placeholder-cert-3.jpg",
  },
];
