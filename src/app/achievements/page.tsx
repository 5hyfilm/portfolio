// src/app/achievements/page.tsx
"use client";

import { useState } from "react";
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

          {/* Image Gallery */}
          {achievement.images && achievement.images.length > 0 && (
            <div className="relative mb-4">
              <img
                src={achievement.images[currentImageIndex]}
                alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
                className="w-full rounded-lg h-64 object-cover"
              />

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

              {/* Thumbnail Navigation */}
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
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
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

  // Process achievements with filters and sorting
  const filteredAchievements = processAchievements(
    achievementsData,
    searchTerm,
    selectedCategories,
    sortBy
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Achievements</h1>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              {ACHIEVEMENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm border-2 transition-colors ${
                    selectedCategories.includes(category)
                      ? getCategoryStyle(category)
                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {getCategoryIcon(category)}{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex gap-4 items-center">
            <span className="font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title")}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date (Newest First)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredAchievements.length} of {achievementsData.length}{" "}
            achievements
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-6">
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
                  {achievement.thumbnailImage && (
                    <img
                      src={achievement.thumbnailImage}
                      alt={achievement.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
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

        {/* Modal */}
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </div>
    </div>
  );
}
