export interface Project {
  id: string;
  slug: string;

  title: string;
  subtitle?: string;

  description: string;
  longDescription?: string;

  year: string;
  status?: "Completed" | "In Progress";

  image: string;
  gallery?: string[];

  tags: string[];

  role?: string;
  team?: string;
  duration?: string;
  category?: string;

  problem?: string;
  solution?: string;
  features?: string[];

  github?: string;
  demo?: string;

  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "crosshere",

    title: "CrossHere",
    subtitle: "School Emergency Management Platform",

    description:
      "A real-time, role-based healthcare emergency management platform designed for modern schools.",

    longDescription:
      "CrossHere is a comprehensive emergency management platform built to modernize how schools handle healthcare incidents. The system provides role-based dashboards for administrators, nurses, teachers, and responders — enabling real-time coordination during critical moments. From incident reporting to resource dispatch, every workflow is designed for speed and clarity under pressure.",

    year: "2026",
    status: "In Progress",

    image: "/images/projects/crosshere-light.png",
    gallery: [],

    tags: [
      "Next.js",
      "Supabase",
      "Framer Motion",
      "React",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "Vercel",
    ],

    role: "Frontend Developer",
    team: "4 Members",
    duration: "2025–2026",
    category: "Full Stack",

    problem:
      "Schools lack a unified, real-time system for managing healthcare emergencies. Existing processes rely on manual communication, causing delays and confusion during critical incidents.",

    solution:
      "A centralized platform with role-based access, real-time notifications, and streamlined workflows that enable instant coordination between school staff during emergencies.",

    features: [
      "Role-based dashboards for administrators, nurses, and teachers",
      "Real-time incident reporting and status tracking",
      "Automated notification system for emergency responders",
      "Resource management and dispatch coordination",
      "Comprehensive incident history and analytics",
    ],

    github: "https://github.com/ryanestoque/crosshere",
    demo: "https://crosshere.vercel.app",

    featured: true,
  },
  {
    id: "02",
    slug: "dripdrop",

    title: "DripDrop",
    subtitle: "Smart Clothesline IoT Dashboard",

    description:
      "A real-time IoT dashboard designed to monitor and remotely control an automated smart clothesline system.",

    longDescription:
      "DripDrop bridges the gap between hardware automation and user-friendly web interfaces. The dashboard provides real-time sensor data visualization, remote control capabilities, and intelligent automation rules for an IoT-powered clothesline system. Users can monitor weather conditions, humidity levels, and system status from anywhere.",

    year: "2026",
    status: "Completed",

    image: "/images/projects/dripdrop-light.png",
    gallery: [],

    tags: [
      "Firebase",
      "Vite",
      "Framer Motion",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
    ],

    role: "Full Stack Developer",
    team: "4 Members",
    duration: "2025",
    category: "IoT / Full Stack",

    problem:
      "Manual clothesline management is inefficient and weather-dependent. Users need a way to automate and remotely control their clothesline system based on real-time environmental data.",

    solution:
      "An IoT dashboard that integrates with hardware sensors and actuators, providing real-time monitoring, remote control, and automated responses to changing weather conditions.",

    features: [
      "Real-time sensor data visualization with live charts",
      "Remote motor and servo control via web interface",
      "Weather-based automation rules engine",
      "Push notifications for weather alerts",
      "Historical data logging and trend analysis",
    ],

    github: "https://github.com/ryanestoque/dripdrop",
    demo: "https://dripdrop.vercel.app",

    featured: true,
  },
  {
    id: "03",
    slug: "efz-2",

    title: "EFZ 2.0",
    subtitle: "Neobrutalist E-Commerce Platform",

    description:
      "An unofficial e-commerce platform for EFZ Computer Shop, featuring a neobrutalist design.",

    longDescription:
      "EFZ 2.0 reimagines the online shopping experience for a local computer shop with a bold neobrutalist design language. The platform features product browsing with advanced filtering, a shopping cart system, and a checkout flow — all wrapped in a distinctive visual identity that stands apart from conventional e-commerce templates.",

    year: "2026",
    status: "Completed",

    image: "/images/projects/efz-neo-light.png",
    gallery: [],

    tags: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
    ],

    role: "Frontend Developer",
    team: "Solo",
    duration: "2026",
    category: "Frontend",

    problem:
      "The local computer shop lacked an online presence that reflected its brand personality. Generic e-commerce templates failed to capture the shop's unique identity and customer experience.",

    solution:
      "A custom-built e-commerce frontend with a neobrutalist design system that creates a memorable shopping experience while maintaining usability and performance.",

    features: [
      "Neobrutalist design system with bold typography and colors",
      "Product catalog with search and category filtering",
      "Shopping cart with persistent state management",
      "Responsive design optimized for all screen sizes",
      "Smooth page transitions and micro-interactions",
    ],

    github: "https://github.com/ryanestoque/efz-2",
    demo: "https://efz-2.vercel.app",

    featured: true,
  },
  {
    id: "04",
    slug: "flag-and-play",

    title: "Flag&Play",
    subtitle: "AR Geography Learning App",

    description:
      "An educational augmented reality web application that lets users scan country flags to discover geography facts and 3D landmarks.",

    longDescription:
      "Flag&Play transforms geography education through augmented reality. By pointing a device camera at country flags, users unlock interactive 3D landmarks, cultural facts, and geographical information. The application leverages WebAR technology to create an engaging learning experience without requiring any app installation.",

    year: "2026",
    status: "Completed",

    image: "/images/projects/flag-and-play-light.png",
    gallery: [],

    tags: [
      "MindAR",
      "Vite",
      "Framer Motion",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
    ],

    role: "Full Stack Developer",
    team: "4 Members",
    duration: "2026",
    category: "AR / Interactive",

    problem:
      "Traditional geography education relies on static textbooks and memorization, leading to low student engagement and poor retention of geographical knowledge.",

    solution:
      "An AR-powered web application that makes geography interactive and memorable by overlaying 3D landmarks and facts onto physical country flags, turning passive learning into active exploration.",

    features: [
      "WebAR flag detection using MindAR image tracking",
      "Interactive 3D landmark models rendered with Three.js",
      "Country fact cards with cultural and geographical data",
      "No app installation required — runs entirely in the browser",
      "Mobile-optimized camera interface with smooth AR overlays",
    ],

    github: "https://github.com/ryanestoque/flag-and-play",
    demo: "https://flag-and-play.vercel.app",

    featured: true,
  },
  {
    id: "05",
    slug: "arado-pos",

    title: "Arado Enterprises POS and Inventory System",
    subtitle: "Retail Operations Management System",

    description:
      "A full-stack Point of Sale (POS) and inventory management system utilizing relational database.",

    longDescription:
      "The Arado Enterprises POS system is a comprehensive retail operations platform that handles everything from point-of-sale transactions to inventory tracking and sales analytics. Built with a React frontend and Express.js backend, the system provides real-time inventory updates, role-based access control, and detailed reporting tools for business insights.",

    year: "2025",
    status: "Completed",

    image: "/images/projects/arado-pos-light.png",
    gallery: [],

    tags: [
      "Node.js",
      "Express.js",
      "React",
      "MySQL",
      "JWT",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "SWR",
      "Render",
      "Vercel",
    ],

    role: "Full Stack Developer",
    team: "Solo",
    duration: "2025",
    category: "Full Stack",

    problem:
      "The retail business relied on manual tracking for sales and inventory, resulting in data inaccuracies, stock discrepancies, and difficulty generating business insights.",

    solution:
      "A full-stack POS and inventory system with real-time data synchronization, automated stock tracking, and comprehensive reporting dashboards for informed decision-making.",

    features: [
      "Point of Sale interface with barcode scanning support",
      "Real-time inventory tracking with low-stock alerts",
      "Role-based access control with JWT authentication",
      "Sales analytics and reporting dashboards",
      "Product management with category organization",
      "Transaction history with receipt generation",
    ],

    github: "https://github.com/ryanestoque/arado-pos",
    demo: "https://arado-pos.vercel.app",

    featured: false,
  },
  {
    id: "06",
    slug: "wordol",

    title: "Wordol",
    subtitle: ": A Cebuano Wordle Game",

    description:
      "A Cebuano word puzzle game inspired by the popular game Wordle",

    longDescription:
      "",

    year: "2025",
    status: "Completed",

    image: "/images/projects/wordol-light.png",
    gallery: [],

    tags: [
      "Firebase",
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
    ],

    role: "Full Stack Developer",
    team: "Solo",
    duration: "2025",
    category: "Full Stack",

    problem:
      "The retail business relied on manual tracking for sales and inventory, resulting in data inaccuracies, stock discrepancies, and difficulty generating business insights.",

    solution:
      "A full-stack POS and inventory system with real-time data synchronization, automated stock tracking, and comprehensive reporting dashboards for informed decision-making.",

    features: [
      "Point of Sale interface with barcode scanning support",
      "Real-time inventory tracking with low-stock alerts",
      "Role-based access control with JWT authentication",
      "Sales analytics and reporting dashboards",
      "Product management with category organization",
      "Transaction history with receipt generation",
    ],

    github: "https://github.com/ryanestoque/wordol",
    demo: "https://wordol.vercel.app",

    featured: false,
  },
  {
    id: "07",
    slug: "cross-server",

    title: "Cross-Server",
    subtitle: "A Cebuano Wordle Game",

    description:
      "A 2024 unofficial online Holy Cross of Davo College (HCDC) Canteen mockup utilizing local storage",

    longDescription:
      "",

    year: "2025",
    status: "Completed",

    image: "/images/projects/cross-server.png",
    gallery: [],

    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Vite"
    ],

    role: "Full Stack Developer",
    team: "Solo",
    duration: "2025",
    category: "Full Stack",

    problem:
      "The retail business relied on manual tracking for sales and inventory, resulting in data inaccuracies, stock discrepancies, and difficulty generating business insights.",

    solution:
      "A full-stack POS and inventory system with real-time data synchronization and comprehensive reporting dashboards for informed decision-making.",

    features: [
      "Point of Sale interface with barcode scanning support",
      "Real-time inventory tracking with low-stock alerts",
      "Role-based access control with JWT authentication",
      "Sales analytics and reporting dashboards",
      "Product management with category organization",
      "Transaction history with receipt generation",
    ],

    github: "https://github.com/ryanestoque/cross-server",
    demo: "https://cross-server.vercel.app",

    featured: false,
  },
];

/** Find a project by its URL slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Get all projects marked as featured */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}