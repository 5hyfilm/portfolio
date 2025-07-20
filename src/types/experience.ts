// src/types/experience.ts

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: ExperienceType;
  startDate: string; // For sorting purposes (YYYY-MM format)
  endDate?: string; // Optional for current positions
  image?: string; // Optional company logo
  companyWebsite?: string; // Optional company website
  highlights?: string[]; // Key achievements/highlights
}

export type ExperienceType =
  | "full-time"
  | "part-time"
  | "internship"
  | "volunteer"
  | "contract";

export interface ExperienceModalProps {
  experience: Experience;
  onClose: () => void;
}

export interface ExperienceFilterOptions {
  searchTerm: string;
  selectedTypes: ExperienceType[];
  selectedTechnologies: string[];
  sortBy: "startDate" | "title" | "company";
  sortOrder: "asc" | "desc";
}
