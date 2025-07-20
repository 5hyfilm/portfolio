// src/utils/experienceHelpers.ts

import { Experience, ExperienceType } from "../types/experience";

// Type icons mapping
export const getTypeIcon = (type: ExperienceType): string => {
  const icons = {
    "full-time": "💼",
    "part-time": "⏰",
    internship: "🎓",
    volunteer: "🤝",
    contract: "📄",
  };
  return icons[type];
};

// Type styles mapping
export const getTypeStyle = (type: ExperienceType): string => {
  const styles = {
    "full-time": "bg-blue-100 text-blue-800 border-blue-200",
    "part-time": "bg-green-100 text-green-800 border-green-200",
    internship: "bg-purple-100 text-purple-800 border-purple-200",
    volunteer: "bg-orange-100 text-orange-800 border-orange-200",
    contract: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return styles[type];
};

// Type border colors for cards
export const getTypeBorderColor = (type: ExperienceType): string => {
  const colors = {
    "full-time": "#3B82F6", // Blue
    "part-time": "#10B981", // Green
    internship: "#8B5CF6", // Purple
    volunteer: "#F59E0B", // Orange
    contract: "#6B7280", // Gray
  };
  return colors[type];
};

// Date parsing utility for experience dates
export const parseExperienceDate = (dateStr: string): Date => {
  // Handle various date formats
  if (dateStr.includes("Present")) {
    return new Date(); // Current date for ongoing positions
  }

  // Extract start date from period (e.g., "November 2023 - February 2024")
  const startDateStr = dateStr.split(" - ")[0].trim();

  // Handle different date formats
  if (startDateStr.match(/^\d{4}-\d{2}$/)) {
    // YYYY-MM format
    const [year, month] = startDateStr.split("-");
    return new Date(parseInt(year), parseInt(month) - 1);
  } else {
    // Try to parse natural language dates like "November 2023"
    return new Date(startDateStr + " 1"); // Add day for parsing
  }
};

// Calculate experience duration
export const calculateDuration = (
  startDate: string,
  endDate?: string
): string => {
  const start = new Date(startDate + "-01");
  const end = endDate ? new Date(endDate + "-01") : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) return "Less than 1 month";
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return years === 1 ? "1 year" : `${years} years`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${
      remainingMonths === 1 ? "month" : "months"
    }`;
  }
};

// Filter experiences by search term
export const filterExperiencesBySearch = (
  experiences: Experience[],
  searchTerm: string
): Experience[] => {
  if (!searchTerm.trim()) return experiences;

  const lowercaseSearch = searchTerm.toLowerCase();

  return experiences.filter(
    (experience) =>
      experience.title.toLowerCase().includes(lowercaseSearch) ||
      experience.company.toLowerCase().includes(lowercaseSearch) ||
      experience.location.toLowerCase().includes(lowercaseSearch) ||
      experience.description.some((desc) =>
        desc.toLowerCase().includes(lowercaseSearch)
      ) ||
      experience.technologies.some((tech) =>
        tech.toLowerCase().includes(lowercaseSearch)
      )
  );
};

// Filter experiences by types
export const filterExperiencesByType = (
  experiences: Experience[],
  selectedTypes: ExperienceType[]
): Experience[] => {
  if (selectedTypes.length === 0) return experiences;

  return experiences.filter((experience) =>
    selectedTypes.includes(experience.type)
  );
};

// Filter experiences by technologies
export const filterExperiencesByTechnology = (
  experiences: Experience[],
  selectedTechnologies: string[]
): Experience[] => {
  if (selectedTechnologies.length === 0) return experiences;

  return experiences.filter((experience) =>
    selectedTechnologies.some((tech) => experience.technologies.includes(tech))
  );
};

// Sort experiences
export const sortExperiences = (
  experiences: Experience[],
  sortBy: "startDate" | "title" | "company",
  sortOrder: "asc" | "desc" = "desc"
): Experience[] => {
  return [...experiences].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "startDate":
        const dateA = new Date(a.startDate + "-01");
        const dateB = new Date(b.startDate + "-01");
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "company":
        comparison = a.company.localeCompare(b.company);
        break;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });
};

// Combined filter and sort function
export const processExperiences = (
  experiences: Experience[],
  searchTerm: string,
  selectedTypes: ExperienceType[],
  selectedTechnologies: string[],
  sortBy: "startDate" | "title" | "company",
  sortOrder: "asc" | "desc" = "desc"
): Experience[] => {
  let processed = filterExperiencesBySearch(experiences, searchTerm);
  processed = filterExperiencesByType(processed, selectedTypes);
  processed = filterExperiencesByTechnology(processed, selectedTechnologies);
  processed = sortExperiences(processed, sortBy, sortOrder);

  return processed;
};

// Get experience statistics
export const getExperienceStats = (experiences: Experience[]) => {
  const stats = {
    total: experiences.length,
    byType: {} as Record<ExperienceType, number>,
    totalTechnologies: new Set(experiences.flatMap((exp) => exp.technologies))
      .size,
    currentPositions: experiences.filter((exp) => !exp.endDate).length,
  };

  // Count by type
  experiences.forEach((experience) => {
    stats.byType[experience.type] = (stats.byType[experience.type] || 0) + 1;
  });

  return stats;
};

// Get years of experience
export const getTotalExperienceYears = (experiences: Experience[]): number => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate + "-01");
    const end = exp.endDate ? new Date(exp.endDate + "-01") : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += months;
  });

  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
};
