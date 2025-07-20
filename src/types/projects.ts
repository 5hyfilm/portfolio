// src/types/projects.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  year?: number;
  featured?: boolean;
  collaborators?: string[];
  duration?: string; // e.g., "3 months", "1 week"
}

export type ProjectCategory =
  | "web-app"
  | "mobile-app"
  | "game"
  | "ai-ml"
  | "data-analysis"
  | "iot"
  | "desktop-app"
  | "other";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "on-hold"
  | "planning";

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export interface ProjectFilterOptions {
  searchTerm: string;
  selectedCategories: ProjectCategory[];
  selectedTechnologies: string[];
  selectedStatus: ProjectStatus[];
  sortBy: "year" | "title" | "category";
  sortOrder: "asc" | "desc";
  showFeaturedOnly: boolean;
}
