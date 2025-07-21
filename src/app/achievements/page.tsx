// src/app/achievements/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Achievement,
  AchievementCategory,
  AchievementModalProps,
} from "../../types/achievements";
import {
  achievementsData,
  ACHIEVEMENT_CATEGORIES,
} from "../../data/achievements";
import {
  getCategoryIcon,
  getCategoryStyle,
  getCategoryBorderColor,
  processAchievements,
} from "../../utils/achievementHelpers";

// Helper function เพื่อจัดการ image path ให้ถูกต้องสำหรับ Next.js Image
const getImagePath = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath; // absolute URL
  if (imagePath.startsWith("/")) return imagePath; // already absolute path
  return `/${imagePath}`; // add leading slash for relative path
};

// Achievement Modal Component
const AchievementModal = ({ achievement, onClose }: AchievementModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (achievement.images) {
      setCurrentImageIndex((prev) =>
        prev === achievement.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (achievement.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? achievement.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {achievement.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Image Gallery - แก้ไขจาก <img> เป็น <Image /> */}
          {achievement.images && achievement.images.length > 0 && (
            <div className="relative mb-4">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src={getImagePath(achievement.images[currentImageIndex])}
                  alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />
              </div>

              {achievement.images.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    →
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                    {currentImageIndex + 1} / {achievement.images.length}
                  </div>
                </>
              )}

              {/* Thumbnail Navigation - แก้ไขจาก <img> เป็น <Image /> */}
              {achievement.images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {achievement.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden 
                                ${
                                  currentImageIndex === index
                                    ? "ring-2 ring-blue-500"
                                    : ""
                                }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImagePath(image)}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Achievement Details */}
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="text-gray-600">📅 {achievement.date}</span>
            <span className="text-gray-600">🏢 {achievement.organization}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(
                achievement.category
              )}`}
            >
              {achievement.category.charAt(0).toUpperCase() +
                achievement.category.slice(1)}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{achievement.description}</p>

          {achievement.validUntil && (
            <div className="text-gray-600 mb-4">
              <strong>Valid until:</strong> {achievement.validUntil}
            </div>
          )}

          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Achievements Component
export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    AchievementCategory[]
  >([]);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  // Toggle category filter
  const toggleCategory = (category: AchievementCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter and sort achievements
  const filteredAchievements = processAchievements(
    achievementsData,
    searchTerm,
    selectedCategories,
    sortBy
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Achievements</h1>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filter by Category:
            </h3>
            <div className="flex flex-wrap gap-2">
              {ACHIEVEMENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors
                    ${
                      selectedCategories.includes(category)
                        ? getCategoryStyle(category)
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {getCategoryIcon(category)}{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort by:</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title")}
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date (Newest First)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                onClick={() => setSelectedAchievement(achievement)}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 
                          transition-transform hover:scale-105 cursor-pointer"
                style={{
                  borderLeftColor: getCategoryBorderColor(achievement.category),
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail Image - แก้ไขจาก <img> เป็น <Image /> */}
                  {achievement.thumbnailImage && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getImagePath(achievement.thumbnailImage)}
                        alt={achievement.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {achievement.title}
                      </h2>
                      <span
                        className="text-2xl"
                        role="img"
                        aria-label={achievement.category}
                      >
                        {getCategoryIcon(achievement.category)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${getCategoryStyle(
                          achievement.category
                        )}`}
                      >
                        {achievement.category.charAt(0).toUpperCase() +
                          achievement.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {achievement.organization}
                      </span>
                      <span className="text-sm text-gray-600">
                        📅 {achievement.date}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">
                      {achievement.description}
                    </p>

                    {achievement.validUntil && (
                      <span className="text-sm text-gray-500">
                        Valid until: {achievement.validUntil}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No achievements found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
}
