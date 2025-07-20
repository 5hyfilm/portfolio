// src/utils/projectHelpers.ts

import { Project, ProjectCategory, ProjectStatus } from "../types/projects";

// Category icons mapping
export const getCategoryIcon = (category: ProjectCategory): string => {
  const icons = {
    "web-app": "🌐",
    "mobile-app": "📱",
    game: "🎮",
    "ai-ml": "🤖",
    "data-analysis": "📊",
    iot: "🔗",
    "desktop-app": "💻",
    other: "📦",
  };
  return icons[category];
};

// Category styles mapping
export const getCategoryStyle = (category: ProjectCategory): string => {
  const styles = {
    "web-app": "bg-blue-100 text-blue-800 border-blue-200",
    "mobile-app": "bg-green-100 text-green-800 border-green-200",
    game: "bg-purple-100 text-purple-800 border-purple-200",
    "ai-ml": "bg-red-100 text-red-800 border-red-200",
    "data-analysis": "bg-yellow-100 text-yellow-800 border-yellow-200",
    iot: "bg-indigo-100 text-indigo-800 border-indigo-200",
    "desktop-app": "bg-gray-100 text-gray-800 border-gray-200",
    other: "bg-pink-100 text-pink-800 border-pink-200",
  };
  return styles[category];
};

// Status icons mapping
export const getStatusIcon = (status: ProjectStatus): string => {
  const icons = {
    completed: "✅",
    "in-progress": "🔄",
    "on-hold": "⏸️",
    planning: "📋",
  };
  return icons[status];
};

// Status styles mapping
export const getStatusStyle = (status: ProjectStatus): string => {
  const styles = {
    completed: "bg-green-100 text-green-800 border-green-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    "on-hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
    planning: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return styles[status];
};

// Check if project has valid demo link
export const hasValidDemoLink = (project: Project): boolean => {
  return (
    project.demoLink !== "-" &&
    project.demoLink !== "" &&
    project.demoLink.startsWith("http")
  );
};

// Check if project has valid GitHub link
export const hasValidGithubLink = (project: Project): boolean => {
  return project.githubLink !== "" && project.githubLink.startsWith("http");
};

// Get project year from year field or extract from other data
export const getProjectYear = (project: Project): number => {
  if (project.year) return project.year;

  // Fallback: try to extract from id or return current year
  return new Date().getFullYear();
};

// Filter projects by search term
export const filterProjectsBySearch = (
  projects: Project[],
  searchTerm: string
): Project[] => {
  if (!searchTerm.trim()) return projects;

  const lowercaseSearch = searchTerm.toLowerCase();

  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowercaseSearch) ||
      project.description.toLowerCase().includes(lowercaseSearch) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(lowercaseSearch)
      ) ||
      project.category?.toLowerCase().includes(lowercaseSearch)
  );
};

// Filter projects by categories
export const filterProjectsByCategory = (
  projects: Project[],
  selectedCategories: ProjectCategory[]
): Project[] => {
  if (selectedCategories.length === 0) return projects;

  return projects.filter(
    (project) =>
      project.category && selectedCategories.includes(project.category)
  );
};

// Filter projects by technologies
export const filterProjectsByTechnology = (
  projects: Project[],
  selectedTechnologies: string[]
): Project[] => {
  if (selectedTechnologies.length === 0) return projects;

  return projects.filter((project) =>
    selectedTechnologies.some((tech) => project.technologies.includes(tech))
  );
};

// Filter projects by status
export const filterProjectsByStatus = (
  projects: Project[],
  selectedStatus: ProjectStatus[]
): Project[] => {
  if (selectedStatus.length === 0) return projects;

  return projects.filter(
    (project) => project.status && selectedStatus.includes(project.status)
  );
};

// Filter featured projects only
export const filterFeaturedProjects = (projects: Project[]): Project[] => {
  return projects.filter((project) => project.featured);
};

// Sort projects
export const sortProjects = (
  projects: Project[],
  sortBy: "year" | "title" | "category",
  sortOrder: "asc" | "desc" = "desc"
): Project[] => {
  return [...projects].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "year":
        const yearA = getProjectYear(a);
        const yearB = getProjectYear(b);
        comparison = yearA - yearB;
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "category":
        const categoryA = a.category || "other";
        const categoryB = b.category || "other";
        comparison = categoryA.localeCompare(categoryB);
        break;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });
};

// Combined filter and sort function
export const processProjects = (
  projects: Project[],
  searchTerm: string,
  selectedCategories: ProjectCategory[],
  selectedTechnologies: string[],
  selectedStatus: ProjectStatus[],
  sortBy: "year" | "title" | "category",
  sortOrder: "asc" | "desc" = "desc",
  showFeaturedOnly: boolean = false
): Project[] => {
  let processed = projects;

  if (showFeaturedOnly) {
    processed = filterFeaturedProjects(processed);
  }

  processed = filterProjectsBySearch(processed, searchTerm);
  processed = filterProjectsByCategory(processed, selectedCategories);
  processed = filterProjectsByTechnology(processed, selectedTechnologies);
  processed = filterProjectsByStatus(processed, selectedStatus);
  processed = sortProjects(processed, sortBy, sortOrder);

  return processed;
};

// Get project statistics
export const getProjectStats = (projects: Project[]) => {
  const stats = {
    total: projects.length,
    byCategory: {} as Record<ProjectCategory, number>,
    byStatus: {} as Record<ProjectStatus, number>,
    byYear: {} as Record<number, number>,
    totalTechnologies: new Set(
      projects.flatMap((project) => project.technologies)
    ).size,
    featuredCount: projects.filter((project) => project.featured).length,
    withDemoLinks: projects.filter((project) => hasValidDemoLink(project))
      .length,
    withGithubLinks: projects.filter((project) => hasValidGithubLink(project))
      .length,
  };

  // Count by category
  projects.forEach((project) => {
    if (project.category) {
      stats.byCategory[project.category] =
        (stats.byCategory[project.category] || 0) + 1;
    }
  });

  // Count by status
  projects.forEach((project) => {
    if (project.status) {
      stats.byStatus[project.status] =
        (stats.byStatus[project.status] || 0) + 1;
    }
  });

  // Count by year
  projects.forEach((project) => {
    const year = getProjectYear(project);
    stats.byYear[year] = (stats.byYear[year] || 0) + 1;
  });

  return stats;
};

// Get years range of projects
export const getProjectYearsRange = (
  projects: Project[]
): { min: number; max: number } => {
  const years = projects.map((project) => getProjectYear(project));
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
};

// Get most used technologies
export const getMostUsedTechnologies = (
  projects: Project[],
  limit: number = 10
): Array<{ tech: string; count: number }> => {
  const techCount = {} as Record<string, number>;

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });

  return Object.entries(techCount)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
