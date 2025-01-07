// src/app/achievements/page.tsx
"use client";

import { useState } from "react";

interface Achievement {
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

const getCategoryIcon = (category: Achievement["category"]) => {
  const icons = {
    award: "🏆",
    certification: "📜",
    recognition: "🌟",
    publication: "📚",
  };
  return icons[category];
};

const getCategoryStyle = (category: Achievement["category"]) => {
  const styles = {
    award: "bg-yellow-100 text-yellow-800 border-yellow-200",
    certification: "bg-blue-100 text-blue-800 border-blue-200",
    recognition: "bg-purple-100 text-purple-800 border-purple-200",
    publication: "bg-green-100 text-green-800 border-green-200",
  };
  return styles[category];
};

const AchievementModal = ({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) => {
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
              className="text-gray-500 hover:text-gray-700"
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
            </div>
          )}

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

export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    Achievement["category"][]
  >([]);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Korean International Youth Olympiad 2018",
      category: "award",
      date: "10-12 August 2018",
      organization: "World Women Inventors and Entrepreneurs Association",
      description:
        "Selected as a representative of Thailand to participate in the competition and won a bronze medal.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 2,
      title: "Thailand-Japan Hackathon Final Round 2018",
      category: "award",
      date: "6-13 December 2018",
      organization: "Princess Chulabhron Science High School and Kosen",
      description:
        "Selected as a representative of Thailand to participate in the competition and won a gold medal in the final round.",
      thumbnailImage: "images/achievements/achievement1/achievement2.jpg",
      images: [
        "images/achievements/achievement1/achievement2.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 3,
      title: "Young Inventors Challenge 2019",
      category: "award",
      date: "21 September 2019",
      organization:
        "Associate of Science, Technology and Innovation (ASTI), Malaysia",
      description: "Selected as a representative of Thailand to participate in the competition.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 4,
      title: "Youth Greenovation Awards 2019",
      category: "award",
      date: "25 November 2019",
      organization:
        "Power of Innovation Foundation in collaboration with PTT Group and the Science Society of Thailand under the Patronage of His Majesty the King.",
      description: "Received an honorable mention award.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 5,
      title: "Junior Science Talent Project",
      category: "award",
      date: "21 July 2020",
      organization:
        "Associate of Science, Technology and Innovation (ASTI), Malaysia",
      description: "Selected to GENIUS group receiving a long-term scholarship up to the doctoral level",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },

    {
      id: 6,
      title: "Thai Young Scientist Festival #16",
      category: "award",
      date: "20 November 2020",
      organization: "National Science Museum",
      description: "Awarded a gold medal and best of the best award in applied science category.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 7,
      title: "International Young Inventor Awards 2020",
      category: "award",
      date: "28 November 2020",
      organization:
        "Indonesian Invention and Innovation Promotion Association (INNOPA)",
      description: "Selected as a representative of Thailand to participate in the competition and won a gold medal.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 8,
      title: "Regeneron International Science and Engineering Fair 2021",
      category: "award",
      date: "16-21 May 2021",
      organization: "Society for Science",
      description: "Selected as a representative of Thailand to participate in the competition.",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 9,
      title: "เยาวชน",
      category: "award",
      date: "26 August 2021",
      organization: "Society for Science",
      description: "Thailand representative Finalist",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 10,
      title: "Young Safe Internet Leader Camp Version 3",
      category: "award",
      date: "19 September 2021",
      organization: "dtac",
      description: "Top 10 winner finalist",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 11,
      title: "Prime Minister Award",
      category: "award",
      date: "22 October 2021",
      organization: "Society for Science",
      description: "Thailand representative Finalist",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },

    {
      id: 12,
      title: "SX2022 Hackathon",
      category: "award",
      date: "30 September 2022",
      organization: "Sustainability Expo",
      description: "Finalist",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 13,
      title: "KATALYST STARTUP LAUNCHPAD 2022",
      category: "award",
      date: "22 November 2022",
      organization: "Kasikorn Bank and Stanford Thailand Research Consortium",
      description:
        "Professional certification for designing distributed systems on AWS",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 14,
      title: "Microsoft Imagine Cup 2023",
      category: "award",
      date: "18 Feburary 2023",
      organization: "Microsoft",
      description: "Finalist 6 teams",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 15,
      title: "J-MAT Brand Planning Competition #2",
      category: "award",
      date: "1 July 2023",
      organization:
        "Junior Marketing Association of Thailand (J-MAT) and ThaiPost",
      description: "ผ่านเข้ารอบ 50 ทีมสุดท้าย",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 16,
      title: "J-MAT Brand Planning Competition #3",
      category: "award",
      date: "30 June 2024",
      organization:
        "Junior Marketing Association of Thailand (J-MAT) and CP Bologna",
      description: "ผ่านเข้ารอบ 50 ทีมสุดท้าย",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 17,
      title: "Thailand HR Tech 2024 Startup Pitching",
      category: "award",
      date: "3 July 2024",
      organization: "Personnel Management Association of Thailand (PMAT)",
      description: "Final 10 teams",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 18,
      title: "BIT Social Scale Up",
      category: "award",
      date: "12 August 2024",
      organization: "EdVISORY",
      description: "Final 10 teams",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 19,
      title: "HealthTech X 2 The Future",
      category: "award",
      date: "11 October 2024",
      organization: "Thaihealth and SYNHUB",
      description: "final 20 ",
      thumbnailImage: "images/achievements/achievement1/achievement1.jpg",
      images: [
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
        "images/achievements/achievement1/achievement1.jpg",
      ],
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    // ... Add your other achievements here
  ];

  const allCategories: Achievement["category"][] = [
    "award",
    "certification",
    "recognition",
    "publication",
  ];

  const toggleCategory = (category: Achievement["category"]) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredAchievements = achievements
    .filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.organization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        achievement.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(achievement.category);

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const parseDate = (dateStr: string) => {
          const parts = dateStr.split(" ");
          if (parts.length === 3) {
            const [day, month, year] = parts;
            const monthIndex = new Date(
              Date.parse(month + " 1, 2000")
            ).getMonth();
            return new Date(parseInt(year), monthIndex, parseInt(day));
          }
          return new Date(dateStr);
        };
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Achievements
          </h1>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    selectedCategories.includes(category)
                      ? getCategoryStyle(category)
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-600 mb-4">
            Showing {filteredAchievements.length} of {achievements.length}{" "}
            achievements
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="space-y-6">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                onClick={() => setSelectedAchievement(achievement)}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 
                          transition-transform hover:scale-105 cursor-pointer"
                style={{
                  borderLeftColor:
                    achievement.category === "award"
                      ? "#FCD34D"
                      : achievement.category === "certification"
                      ? "#93C5FD"
                      : achievement.category === "recognition"
                      ? "#C084FC"
                      : "#86EFAC",
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

                    <div className="flex gap-4">
                      {achievement.validUntil && (
                        <span className="text-sm text-gray-500">
                          Valid until: {achievement.validUntil}
                        </span>
                      )}
                    </div>
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
