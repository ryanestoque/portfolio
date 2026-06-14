export interface Experience {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  description: string;
  image: string;
  certificate?: string;
  certificateAvailable?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "experience-1",
    role: "Freelancer",
    company: "Full Stack Web Development",
    dateRange: "Present",
    description:
      "Built full-stack academic projects integrating frontends with backend databases, and developed custom web systems to streamline operations for small businesses.",
    image: "/images/experience/ryan-full-stack.webp",
    certificate: "/images/certificates/ryan-full-stack.webp",
    certificateAvailable: false,
  },
  {
    id: "experience-2",
    role: "3rd-Year BSIT Student",
    company: "BSIT Educational Tour 2025",
    dateRange: "November 2025",
    description:
      "Gained industry exposure by visiting tech companies in Cebu, including UP Cebu BIIT, Dynata, Rivan IT, and Mata Technologies, and the T.a.R.S.I.E.R. 117 emergency response center in Bohol, studying enterprise workflows and tech infrastructure.",
    image: "/images/experience/with-loml.webp",
    certificate: "/images/certificates/cebu-bohol-cert.webp",
    certificateAvailable: true,
  },
  {
    id: "experience-3",
    role: "Participant",
    company: "DICT XI IDEAS Plugin Activity",
    dateRange: "May 2025",
    description:
      "Participated in an intensive startup incubation and pitching bootcamp by the Wadhwani Foundation, collaborating to develop and pitch tech startup solutions.",
    image: "/images/experience/ideas-plug-in-experience.webp",
    certificate: "/images/certificates/ideas-pitch.webp",
    certificateAvailable: true,
  },
  {
    id: "experience-4",
    role: "Creatives Committee",
    company: "HCDC Information Technology Society",
    dateRange: "June 2024 – May 2025",
    description:
      "Designed and produced visually engaging publication materials for the official Facebook page, promoting departmental events and enhancing student community engagement.",
    image: "/images/experience/its-creatives-committee.webp",
    certificate: "/images/certificates/2024-hcdc-its-certificate.webp",
    certificateAvailable: true,
  },
  {
    id: "experience-5",
    role: "Social Media Manager",
    company: "HCDC College of Engineering and Technology Society",
    dateRange: "June 2024 – May 2025",
    description:
      "Managed the official Facebook page using Meta Business Suite, creating engaging posts and publication materials while scheduling and tracking audience engagement.",
    image: "/images/experience/cetso-representative.webp",
    certificate: "/images/certificates/placeholder-cert-3.jpg",
    certificateAvailable: false,
  },
  {
    id: "experience-6",
    role: "1st Runner-Up",
    company: "2025 PSITS XI Programming Quiz Bowl",
    dateRange: "March 2025",
    description:
      "Represented Holy Cross of Davao College and secured 1st Runner-Up, demonstrating core knowledge in fundamentals of Java Programming.",
    image: "/images/experience/psits-quiz-bowl.webp",
    certificate: "/images/certificates/psits-2025-cert_1.webp",
    certificateAvailable: true,
  },
  {
    id: "experience-7",
    role: "Participant",
    company: "2024 CodeChum National Programming Challenge",
    dateRange: "November 2024",
    description:
      "Competed against BSIT and BSCS students nationwide, tackling advanced algorithmic challenges and logical problem-solving tasks under strict time constraints.",
    image: "/images/experience/codechum-programming-2024.webp",
    certificate: "/images/certificates/codechum-prog-comp.webp",
    certificateAvailable: true,
  },
  {
    id: "experience-8",
    role: "Champion",
    company: "2024 HCDC-CET Technofair Programming Competition",
    dateRange: "March 2024",
    description:
      "Secured the Championship title in the departmental programming competition, competing against other teams in solving coding challenges.",
    image: "/images/experience/technofair-prog-2024.webp",
    certificate: "/images/certificates/champ2024.png",
    certificateAvailable: true,
  },
];
