// src/types/achievements.ts

export interface Achievement {
  id: number;
  title: string;
  category: "award" | "certification" | "recognition" | "publication";
  date: string;
  organization: string;
  description: string;
  thumbnailImage?: string; // This will be shown in the list
  images?: string[]; // These will be shown in the modal
  link?: string;
  validUntil?: string;
}

export type AchievementCategory = Achievement["category"];

export type SortOption = "date" | "title";

export interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}