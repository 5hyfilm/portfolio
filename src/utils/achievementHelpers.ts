// src/utils/achievementHelpers.ts

import { Achievement, AchievementCategory } from "../types/achievements";

// Category icons mapping
export const getCategoryIcon = (category: AchievementCategory): string => {
  const icons = {
    award: "🏆",
    certification: "📜",
    recognition: "🌟",
    publication: "📚",
  };
  return icons[category];
};

// Category styles mapping
export const getCategoryStyle = (category: AchievementCategory): string => {
  const styles = {
    award: "bg-yellow-100 text-yellow-800 border-yellow-200",
    certification: "bg-blue-100 text-blue-800 border-blue-200",
    recognition: "bg-purple-100 text-purple-800 border-purple-200",
    publication: "bg-green-100 text-green-800 border-green-200",
  };
  return styles[category];
};

// Category border colors for cards
export const getCategoryBorderColor = (
  category: AchievementCategory
): string => {
  const colors = {
    award: "#FCD34D", // Yellow
    certification: "#93C5FD", // Blue
    recognition: "#C084FC", // Purple
    publication: "#86EFAC", // Green
  };
  return colors[category];
};

// Date parsing utility
export const parseAchievementDate = (dateStr: string): Date => {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth();
    return new Date(parseInt(year), monthIndex, parseInt(day));
  }
  // Fallback for different date formats
  return new Date(dateStr);
};

// Filter achievements by search term
export const filterAchievementsBySearch = (
  achievements: Achievement[],
  searchTerm: string
): Achievement[] => {
  if (!searchTerm.trim()) return achievements;

  const lowercaseSearch = searchTerm.toLowerCase();

  return achievements.filter(
    (achievement) =>
      achievement.title.toLowerCase().includes(lowercaseSearch) ||
      achievement.organization.toLowerCase().includes(lowercaseSearch) ||
      achievement.description.toLowerCase().includes(lowercaseSearch)
  );
};

// Filter achievements by categories
export const filterAchievementsByCategory = (
  achievements: Achievement[],
  selectedCategories: AchievementCategory[]
): Achievement[] => {
  if (selectedCategories.length === 0) return achievements;

  return achievements.filter((achievement) =>
    selectedCategories.includes(achievement.category)
  );
};

// Sort achievements
export const sortAchievements = (
  achievements: Achievement[],
  sortBy: "date" | "title"
): Achievement[] => {
  return [...achievements].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = parseAchievementDate(a.date);
      const dateB = parseAchievementDate(b.date);
      return dateB.getTime() - dateA.getTime(); // Newest first
    } else {
      return a.title.localeCompare(b.title); // Alphabetical
    }
  });
};

// Combined filter and sort function
export const processAchievements = (
  achievements: Achievement[],
  searchTerm: string,
  selectedCategories: AchievementCategory[],
  sortBy: "date" | "title"
): Achievement[] => {
  let processed = filterAchievementsBySearch(achievements, searchTerm);
  processed = filterAchievementsByCategory(processed, selectedCategories);
  processed = sortAchievements(processed, sortBy);

  return processed;
};

// Get achievement statistics
export const getAchievementStats = (achievements: Achievement[]) => {
  const stats = {
    total: achievements.length,
    byCategory: {} as Record<AchievementCategory, number>,
    withCertificates: achievements.filter((a) => a.link).length,
    withImages: achievements.filter((a) => a.images && a.images.length > 0)
      .length,
  };

  // Count by category
  achievements.forEach((achievement) => {
    stats.byCategory[achievement.category] =
      (stats.byCategory[achievement.category] || 0) + 1;
  });

  return stats;
};
