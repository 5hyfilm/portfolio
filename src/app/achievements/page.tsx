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
  getCategoryStyle,
  getCategoryBorderColor,
  processAchievements,
} from "../../utils/achievementHelpers";
import {
  BookIcon,
  CertificateIcon,
  StarIcon,
  TrophyIcon,
} from "../../components/ui/Icons";

// Helper function เพื่อจัดการ image path ให้ถูกต้องสำหรับ Next.js Image
const getImagePath = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath; // absolute URL
  if (imagePath.startsWith("/")) return imagePath; // already absolute path
  return `/${imagePath}`; // add leading slash for relative path
};

// Enhanced category style function - สีเข้มและโดดเด่นขึ้น
const getEnhancedCategoryStyle = (category: AchievementCategory): string => {
  const styles = {
    award:
      "bg-gray-950 text-white border border-gray-900 shadow-sm shadow-black/10",
    certification:
      "bg-white text-gray-900 border border-gray-200 shadow-sm shadow-black/5",
    recognition:
      "bg-white text-gray-900 border border-gray-200 shadow-sm shadow-black/5",
    publication:
      "bg-white text-gray-900 border border-gray-200 shadow-sm shadow-black/5",
  };
  return styles[category];
};

const getCategoryIconNode = (category: AchievementCategory) => {
  const cls = "h-4 w-4";
  switch (category) {
    case "award":
      return <TrophyIcon className={cls} />;
    case "certification":
      return <CertificateIcon className={cls} />;
    case "recognition":
      return <StarIcon className={cls} />;
    case "publication":
      return <BookIcon className={cls} />;
  }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-white" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-700 via-fuchsia-700 to-amber-500 opacity-80" />

        <div className="relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getCategoryStyle(
                    achievement.category
                  )}`}
                >
                  <span aria-hidden="true">
                    {getCategoryIconNode(achievement.category)}
                  </span>
                  <span className="uppercase tracking-wide">
                    {achievement.category}
                  </span>
                </span>
                <span className="text-xs text-gray-500">{achievement.date}</span>
              </div>

              <h2 className="mt-3 truncate text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
                {achievement.title}
              </h2>
              <div className="mt-1 text-sm text-gray-600 md:text-base">
                {achievement.organization}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
              aria-label="Close modal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Image Gallery */}
          {achievement.images && achievement.images.length > 0 && (
            <div className="relative mb-4">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 md:h-80">
                <Image
                  src={getImagePath(achievement.images[currentImageIndex])}
                  alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {achievement.images.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                  >
                    <span className="text-lg leading-none">←</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                  >
                    <span className="text-lg leading-none">→</span>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                    {currentImageIndex + 1} / {achievement.images.length}
                  </div>
                </>
              )}

              {/* Thumbnail Navigation */}
              {achievement.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {achievement.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden 
                                ${
                                  currentImageIndex === index
                                    ? "ring-2 ring-violet-700"
                                    : ""
                                }`}
                    >
                      <div className="relative h-full w-full">
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
          <p className="mt-4 text-gray-700 md:text-base">
            {achievement.description}
          </p>

          {achievement.validUntil && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-medium text-gray-800">Valid until</span>:{" "}
              {achievement.validUntil}
            </div>
          )}

          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              <span aria-hidden="true">↗</span>
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
  const [selectedCategories, setSelectedCategories] = useState<
    AchievementCategory[]
  >([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  // Toggle category filter
  const toggleCategory = (category: AchievementCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Process achievements with filters and sorting
  const processedAchievements = processAchievements(
    achievementsData,
    "",
    selectedCategories,
    "date"
  );

  const filteredAchievements = processedAchievements;

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(109,40,217,0.10),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-700 via-fuchsia-700 to-amber-500 opacity-80" />
          <div className="pointer-events-none absolute -left-24 top-10 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-violet-900/15 to-transparent" />
          <div className="pointer-events-none absolute -left-24 top-20 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-violet-900/70">
                ARCHIVE
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950 md:text-5xl">
                Achievements
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
                Awards, certifications, and professional recognitions.
              </p>
            </div>
          </div>

          <div className="relative mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {ACHIEVEMENT_CATEGORIES.map((category) => {
                const active = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition md:text-sm",
                      active
                        ? "bg-violet-950 text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-4 focus:ring-violet-100",
                    ].join(" ")}
                  >
                    <span aria-hidden="true">{getCategoryIconNode(category)}</span>
                    <span className="uppercase tracking-wide">
                      {category}
                    </span>
                  </button>
                );
              })}

              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 md:text-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </header>

      {/* Achievements Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              style={{
                borderLeftColor: getCategoryBorderColor(achievement.category),
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/70 via-transparent to-white opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />

              <div className="flex items-start gap-4">
                {/* Thumbnail Image */}
                {achievement.thumbnailImage && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <Image
                      src={getImagePath(achievement.thumbnailImage)}
                      alt={achievement.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-violet-900/10" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="relative flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-950 md:text-xl">
                      {achievement.title}
                    </h2>
                    <span className="text-gray-800" aria-hidden="true">
                      {getCategoryIconNode(achievement.category)}
                    </span>
                  </div>

                  <div className="relative mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getEnhancedCategoryStyle(
                        achievement.category
                      )}`}
                    >
                      {achievement.category.charAt(0).toUpperCase() +
                        achievement.category.slice(1)}
                    </span>
                    <span className="text-xs text-gray-600 md:text-sm">
                      {achievement.organization}
                    </span>
                    <span className="text-xs text-gray-600 md:text-sm">
                      {achievement.date}
                    </span>
                  </div>

                  <p className="relative mt-3 line-clamp-3 text-sm text-gray-700 md:text-base">
                    {achievement.description}
                  </p>

                  {achievement.validUntil && (
                    <span className="relative mt-3 inline-block text-xs text-gray-500 md:text-sm">
                      Valid until: {achievement.validUntil}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No achievements found matching your criteria.
          </div>
        )}
      </div>

      {/* Achievement Modal */}
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
