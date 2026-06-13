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
    id: "experience-8",
    role: "Freelancer",
    company: "Full Stack Development",
    dateRange: "Present",
    description:
      "Contributed to backend API development and database optimization. Participated in agile sprints and code review processes.",
    image: "/images/experience/ryan-full-stack.webp",
    certificate: "/images/certificates/ryan-full-stack.webp",
  },
  {
    id: "experience-3",
    role: "3rd-Year BSIT Student",
    company: "BSIT Educational Tour 2025",
    dateRange: "November 2025",
    description:
      "Delivered custom web solutions for small businesses, including e-commerce platforms and portfolio sites with modern UI/UX standards.",
    image: "/images/experience/with-loml.webp",
    certificate: "/images/certificates/placeholder-cert-2.jpg",
  },
  {
    id: "experience-2",
    role: "Participant",
    company: "DICT XI IDEAS Plugin Activity",
    dateRange: "May 2025",
    description:
      "Developed responsive user interfaces and interactive components. Collaborated with design teams to translate Figma mockups into production-ready code.",
    image: "/images/experience/ideas-plug-in-experience.webp",
    certificate: "/images/certificates/placeholder-cert-2.jpg",
  },
  {
    id: "experience-4",
    role: "Creatives Committee",
    company: "HCDC Information Technology Society",
    dateRange: "June 2024 – May 2025",
    description:
      "Designed user-centered interfaces for mobile and web applications. Conducted user research and created interactive prototypes in Figma.",
    image: "/images/experience/its-creatives-committee.webp",
    certificate: "/images/certificates/placeholder-cert-3.jpg",
  },
  {
    id: "experience-5",
    role: "Social Media Manager",
    company: "HCDC College of Engineering and Technology Society",
    dateRange: "June 2024 – May 2025",
    description:
      "Contributed to backend API development and database optimization. Participated in agile sprints and code review processes.",
    image: "/images/experience/cetso-representative.webp",
    certificate: "/images/certificates/placeholder-cert-3.jpg",
  },
  {
    id: "experience-7",
    role: "1st Runner-Up",
    company: "2025 PSITS XI Programming Quiz Bowl",
    dateRange: "March 2025",
    description:
      "Contributed to backend API development and database optimization. Participated in agile sprints and code review processes.",
    image: "/images/experience/psits-quiz-bowl.webp",
    certificate: "/images/certificates/psits-quiz-bowl.jpg",
  },
  {
    id: "experience-1",
    role: "Participant",
    company: "2024 CodeChum National Programming Challenge",
    dateRange: "November 2024",
    description:
      "Built and maintained scalable web applications using React, Next.js, and Node.js. Led frontend architecture decisions and implemented CI/CD pipelines.",
    image: "/images/experience/codechum-programming-2024.webp",
    certificate: "/images/certificates/placeholder-cert-1.jpg",
  },
  {
    id: "experience-6",
    role: "Champion",
    company: "2024 CET TechnoFair Programming Competition",
    dateRange: "March 2024",
    description:
      "Contributed to backend API development and database optimization. Participated in agile sprints and code review processes.",
    image: "/images/experience/technofair-prog-2024.webp",
    certificate: "/images/certificates/2024-technofair-programming.jpg",
  },
];
