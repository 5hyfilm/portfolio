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
  processAchievements,
} from "../../utils/achievementHelpers";
import {
  BookIcon,
  CertificateIcon,
  StarIcon,
  TrophyIcon,
  ZoomInIcon,
} from "../../components/ui/Icons";
import ImageViewerModal from "../../components/ui/ImageViewerModal";

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
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300">
        {/* Top-aligned accent gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 opacity-90" />

        <div className="relative max-h-[90vh] overflow-y-auto p-6 md:p-8 pt-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getEnhancedCategoryStyle(
                    achievement.category
                  )}`}
                >
                  <span aria-hidden="true" className="shrink-0">
                    {getCategoryIconNode(achievement.category)}
                  </span>
                  {achievement.category}
                </span>
              </div>

              <div className="flex items-center gap-4 min-w-0 mt-3.5">
                {achievement.thumbnailImage && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm md:h-20 md:w-20">
                    <Image
                      src={getImagePath(achievement.thumbnailImage)}
                      alt={`${achievement.title} logo`}
                      fill
                      sizes="(max-width: 768px) 64px, 80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl leading-snug">
                    {achievement.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{achievement.organization}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{achievement.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-500 hover:text-gray-800 shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
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
            <div className="relative my-6">
              <div
                onClick={() => setIsZoomOpen(true)}
                className="group relative h-64 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-white md:h-80 shadow-inner"
              >
                <Image
                  src={getImagePath(achievement.images[currentImageIndex])}
                  alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                  priority={currentImageIndex === 0}
                />

                {/* Floating Zoom Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomOpen(true);
                  }}
                  className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
                >
                  <ZoomInIcon className="h-3.5 w-3.5" />
                  <span>Zoom</span>
                </button>
              </div>

              {achievement.images.length > 1 && (
                <>
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    <span className="text-lg leading-none">←</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-md backdrop-blur transition hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    <span className="text-lg leading-none">→</span>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
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
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border bg-white transition-all duration-200
                                ${
                                  currentImageIndex === index
                                    ? "ring-2 ring-violet-600 border-transparent scale-95"
                                    : "border-gray-200 opacity-70 hover:opacity-100"
                                }`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={getImagePath(image)}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Separated Award Highlight Box */}
          {achievement.award && (
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50/40 border border-violet-100/80 p-5 flex items-start gap-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">
                <TrophyIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 block">
                  Award & Recognition
                </span>
                <p className="mt-1.5 text-sm md:text-base font-extrabold text-gray-900 leading-snug">
                  {achievement.award}
                </p>
              </div>
            </div>
          )}

          {/* Description & Context Section */}
          <div className="mt-6">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Description & Context
            </h4>
            <p className="mt-2 text-gray-700 leading-relaxed text-sm md:text-base">
              {achievement.description}
            </p>
          </div>

          {achievement.validUntil && (
            <div className="mt-5 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Valid until</span>:{" "}
              {achievement.validUntil}
            </div>
          )}

          {achievement.link && (
            <div className="mt-8 flex justify-end">
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-gray-900 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-200/50"
              >
                <span>↗</span>
                View Certificate
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Zoom Lightbox */}
      {achievement.images && (
        <ImageViewerModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          images={achievement.images}
          initialIndex={currentImageIndex}
          title={achievement.title}
          onIndexChange={(idx) => setCurrentImageIndex(idx)}
        />
      )}
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 to-purple-900 p-6 shadow-xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.4),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-fuchsia-500 to-amber-500" />
          <div className="pointer-events-none absolute -left-24 top-10 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute -left-24 top-20 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-violet-200">
                ARCHIVE
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Achievements
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-purple-100 md:text-base">
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
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />
              
              <div>
                <div className="flex items-start gap-4">
                  {/* Thumbnail Image with zoom and glow */}
                  {achievement.thumbnailImage && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-150 bg-gray-50 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                      <Image
                        src={getImagePath(achievement.thumbnailImage)}
                        alt={achievement.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-semibold tracking-tight text-gray-900 group-hover:text-violet-900 transition-colors duration-200 line-clamp-2 leading-snug md:text-lg">
                        {achievement.title}
                      </h2>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getEnhancedCategoryStyle(
                          achievement.category
                        )}`}
                      >
                        <span aria-hidden="true" className="shrink-0">
                          {getCategoryIconNode(achievement.category)}
                        </span>
                        {achievement.category}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium truncate max-w-[120px] md:max-w-none">
                        {achievement.organization}
                      </span>
                      <span className="text-gray-300 text-xs">•</span>
                      <span className="text-[11px] text-gray-500 whitespace-nowrap">
                        {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Separated Award Banner on Card */}
                {achievement.award && (
                  <div className="relative mt-3 flex items-center gap-1.5 text-xs font-bold text-violet-700">
                    <TrophyIcon className="h-4 w-4 shrink-0 text-violet-600" />
                    <span className="line-clamp-1">{achievement.award}</span>
                  </div>
                )}

                <p className="mt-3.5 line-clamp-3 text-xs text-gray-600 leading-relaxed md:text-sm">
                  {achievement.description}
                </p>
              </div>

              {achievement.validUntil && (
                <div className="mt-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Valid until: {achievement.validUntil}
                </div>
              )}
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
