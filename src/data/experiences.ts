// src/data/experiences.ts

import { Experience, ExperienceType } from "../types/experience";

export const experiencesData: Experience[] = [
  {
    id: 1,
    title: "Microsoft Learn Student Ambassador",
    company: "Microsoft",
    location: "Bangkok, Thailand",
    period: "Jul 2021 - Present",
    startDate: "2021-07",
    type: "volunteer",
    image: "/images/experiences/experience_1.jpg", // Microsoft logo
    companyWebsite: "https://mvp.microsoft.com/studentambassadors",
    description: [
      "Organized workshops and coding sessions, mentoring and inspiring over 100 students, enhancing mentorship and training skills.",
      "Actively collaborated with peers to create impactful learning resources, including tutorials and guides on programming, AI, and cloud technologies.",
      "Contributed to building a supportive community by mentoring aspiring developers, providing career guidance, and encouraging active participation in tech events.",
    ],
    technologies: [
      "Azure",
      "Machine Learning",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    highlights: [
      "Mentored over 100 students",
      "Created comprehensive learning resources on AI and cloud technologies",
      "Built supportive developer community",
      "Enhanced mentorship and training skills",
    ],
  },
  {
    id: 2,
    title: "Consultant",
    company: "NewWave Consulting",
    location: "Bangkok, Thailand",
    period: "Jul 2021 - Present",
    startDate: "2021-07",
    type: "volunteer",
    image: "/images/experiences/experience_2.jpg", // Microsoft logo
    companyWebsite: "https://microsoft.com",
    description: [
      "Collaborated with a cross-functional consulting team to analyze Makro’s existing rental stall business model and identify new revenue opportunities.",
      "Conducted market research, competitor benchmarking, and on-site observation to evaluate foot traffic, tenant mix, and pricing strategies.",
      "Presented findings and actionable recommendations to Makro executives, supporting decision-making on future stall management strategies.",
    ],
    technologies: ["Business Strategy Frameworks"],
    highlights: [
      "Mentored over 100 students",
      "Created comprehensive learning resources on AI and cloud technologies",
      "Built supportive developer community",
      "Enhanced mentorship and training skills",
    ],
  },
  {
    id: 3,
    title: "HR Development Strategist Intern",
    company: "CP Axtra Public Company Limited (Makro)",
    location: "Bangkok, Thailand",
    period: "November 2023 - February 2024",
    startDate: "2023-11",
    endDate: "2024-02",
    type: "internship",
    image: "/images/experiences/experience_3.jpg", // Makro logo
    companyWebsite: "https://www.makro.co.th",
    description: [
      "Led a team of 3 students to innovate and develop a chatbot and dashboard HR analytics solution prototype, resulting in a 49% improvement in performance evaluation metrics and a 40% increase in productivity levels, building business consulting experience",
      "Executed extensive requirements collection, organizational research, and management analysis presentations for Makro's management team, contributing to informed decision-making processes and strategic planning",
      "Transitioned an initial HR analytics prototype into a startup project based on CP Axtra Public Company Limited internship experience, utilizing business frameworks to secure a spot as one of the final 10 teams in the Thailand HR Tech 2024 Startup Pitching event",
    ],
    technologies: ["Azure", "Python", "HTML", "CSS", "JavaScript"],
    highlights: [
      "49% improvement in performance evaluation metrics",
      "40% increase in productivity levels",
      "Final 10 teams in Thailand HR Tech 2024 Startup Pitching event",
      "Led team of 3 students successfully",
    ],
  },
  {
    id: 4,
    title: "Student Consultant",
    company: "Lotus's",
    location: "Bangkok, Thailand",
    period: "November 2023 - February 2024",
    startDate: "2023-11",
    endDate: "2024-02",
    type: "internship",
    image: "/images/experiences/experience_4.jpg", // Lotus's logo
    companyWebsite: "https://www.lotuss.com",
    description: [
      "Analyzed customer visit trends to design promotional strategies targeting shoppers from competing malls, driving increased store traffic",
      "Assisted in developing promotional campaigns for a newly constructed building, aiming to boost both customer acquisition and sales performance",
    ],
    technologies: ["Data Analysis"],
    highlights: [""],
  },
  {
    id: 5,
    title: "Business Analyst (Freelance)",
    company: "Pragma and Will Group",
    location: "Bangkok, Thailand",
    period: "Dec 2024",
    startDate: "2022-01",
    type: "part-time",
    image: "/images/experiences/experience_5.png", // Pragma and Will Group logo
    companyWebsite: "https://pwg.co.th/",
    description: [
      "Assisted in rechecking customer requirements, refining them for accuracy and clarity.",
      "Supported the creation of application flowcharts to visualize system processes.",
    ],
    technologies: ["Mermaid", "Miro"],
    highlights: [
      "Improved requirement accuracy through systematic review process",
      "Created clear visual documentation for system processes",
    ],
  },
  {
    id: 6,
    title: "Analytic and App Development Intern",
    company:
      "Chang Junior Internship Program, Thai Beverage Plc — Assigned to F&N Dairies Thailand Limited",
    location: "Bangkok, Thailand",
    period: "Jun 2025 - Jul 2025",
    startDate: "2021-07", // Fixed the date from 2025-07 to 2021-07
    type: "internship",
    image: "/images/experiences/experience_6.jpg", // Thai Beverage/F&N logo
    companyWebsite: "https://www.thaibev.com",
    description: [
      "Gathered and refined requirements from multiple stakeholder teams, translating operational needs into functional specifications and prioritizing features to improve workflow efficiency.",
      "Developed and iteratively enhanced a barcode scanning web application leveraging computer vision for real-time product database matching, CSV export, and mobile-first optimization, adding features such as flashlight support, new product entry, and custom CSV formats.",
      "Deployed and maintained the solution on a cloud platform, resolving technical issues, optimizing code for reliable builds, and ensuring readiness for production use.",
      "Performed data cleaning, exploratory data analysis (EDA), data visualization, and modeling on Sellout data.",
      "Conducted customer clustering to identify target groups and generate insights for tailored promotional campaigns.",
    ],
    technologies: [
      "Deep Learning",
      "ONNX",
      "Python",
      "Flask",
      "React",
      "TypeScript",
      "Docker",
      "GCP",
    ],
    highlights: [
      "Developed barcode scanning web application with computer vision",
      "Deployed cloud-based solution for production use",
      "Conducted customer clustering for promotional insights",
      "Enhanced workflow efficiency through requirement translation",
    ],
  },
  {
    id: 7,
    title: "Co-founder & CTO",
    company: "GOROLL",
    location: "Bangkok, Thailand",
    period: "2024 - Present",
    startDate: "2021-07", // Fixed the date from 2025-07 to 2021-07
    type: "full-time",
    image: "/images/experiences/experience_7.jpg", // Thai Beverage/F&N logo
    companyWebsite: "https://www.goroll.co",
    description: [
      "Co-founded GOROLL, a social-impact startup focused on improving mobility and inclusive travel experiences for wheelchair users, elderly, and caregivers.",
      "Led technical direction as CTO — defined architecture, technology stack, and product roadmap aligned with startup strategy and impact goals.",
      "Collaborated with co-founders on business model and conducted pilot testing with target users to refine product-market fit.",
    ],
    technologies: ["React", "TypeScript", "Azure"],
    highlights: [
      "Developed functional prototype to validate GOROLL’s concept",
      "Defined technology roadmap and acted as CTO for the startup",
      "Managed external software house for full-scale product build",
      "Aligned product development with CSR and partnership strategy",
      "Piloted prototype with real users to demonstrate social impact",
    ],
  },
];

// Export type constants for filtering
export const EXPERIENCE_TYPES: ExperienceType[] = [
  "full-time",
  "part-time",
  "internship",
  "volunteer",
  "contract",
];

// Export all unique technologies from experiences
export const ALL_TECHNOLOGIES = Array.from(
  new Set(experiencesData.flatMap((exp) => exp.technologies))
).sort();
