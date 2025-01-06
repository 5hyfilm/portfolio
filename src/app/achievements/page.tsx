// src/app/achievements/page.tsx
"use client";

import { useState } from "react";

interface Achievement {
  id: number;
  title: string;
  category:
    | "award"
    | "certification"
    | "recognition"
    | "publication";
  date: string;
  organization: string;
  description: string;
  image?: string;
  link?: string;
  validUntil?: string;
}

export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    Achievement["category"][]
  >([]);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Korean International Youth Olympiad 2018",
      category: "award",
      date: "10-12 August 2018",
      organization: "World Women Inventors and Entrepreneurs Association",
      description:
        "Thailand representative Awarded bronze medal in Korean International Youth Olympiad",
      image: "images/achievements/achievment1.jpg",
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
        "Thailand representative Awarded gold medal in Thailand-Japan Hackathon Final Round",
      image: "/api/placeholder/100/100",
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
      description: "Thailand representative",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 4,
      title: "International Young Inventor Awards 2020",
      category: "award",
      date: "28 November 2020",
      organization:
        "Indonesian Invention and Innovation Promotion Association (INNOPA)",
      description: "Thailand representative and Awarded gold medal",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 5,
      title: "Thai Young Scientist Festival #16",
      category: "award",
      date: "20 November 2020",
      organization: "National Science Museum",
      description: "Awarded gold medal and Best of the Best Award",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 6,
      title: "Regeneron International Science and Engineering Fair 2021",
      category: "award",
      date: "16-21 May 2021",
      organization: "Society for Science",
      description: "Thailand representative Finalist",
      image: "/api/placeholder/100/100",
      validUntil: "16-21 May 2021",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 7,
      title: "Prime Minister Award",
      category: "award",
      date: "19 September 2021",
      organization:
        "Associate of Science, Technology and Innovation (ASTI), Malaysia",
      description: "Best of Applied Science & Special Award",
      image: "/api/placeholder/100/100",
      validUntil: "22 October 2021",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 7,
      title: "เยาวชนดีเด่น",
      category: "award",
      date: "19 September 2021",
      organization:
        "Associate of Science, Technology and Innovation (ASTI), Malaysia",
      description: "Best of Applied Science & Special Award",
      image: "/api/placeholder/100/100",
      validUntil: "22 October 2021",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 8,
      title: "Young Safe Internet Leader Camp Version 3",
      category: "award",
      date: "19 September 2021",
      organization: "dtac",
      description: "Top 10 winner finalist",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 9,
      title: "KATALYST STARTUP LAUNCHPAD 2022",
      category: "award",
      date: "December 2023",
      organization: "Kasikorn Bank and Stanford Thailand Research Consortium",
      description:
        "Professional certification for designing distributed systems on AWS",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 10,
      title: "SX2022 Hackathon",
      category: "award",
      date: "30 September 2022",
      organization: "Sustainability Expo",
      description: "Finalist",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 11,
      title: "Microsoft Imagine Cup 2023",
      category: "award",
      date: "18 Feburary 2023",
      organization: "Microsoft",
      description: "Finalist 6 teams",
      image: "/api/placeholder/100/100",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 12,
      title: "J-MAT Brand Planning Competition #2",
      category: "award",
      date: "1 July 2023",
      organization:
        "Junior Marketing Association of Thailand (J-MAT) and ThaiPost",
      description: "ผ่านเข้ารอบ 50 ทีมสุดท้าย",
      image: "/api/placeholder/100/100",
      validUntil: "1 July 2023",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 13,
      title: "J-MAT Brand Planning Competition #3",
      category: "award",
      date: "30 June 2024",
      organization:
        "Junior Marketing Association of Thailand (J-MAT) and CP Bologna",
      description: "ผ่านเข้ารอบ 50 ทีมสุดท้าย",
      image: "/api/placeholder/100/100",
      validUntil: "30 June 2024",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 14,
      title: "Thailand HR Tech 2024 Startup Pitching",
      category: "award",
      date: "3 July 2024",
      organization: "Personnel Management Association of Thailand (PMAT)",
      description: "Final 10 teams",
      image: "/api/placeholder/100/100",
      validUntil: "30 June 2024",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 15,
      title: "BIT Social Scale Up",
      category: "award",
      date: "12 August 2024",
      organization: "EdVISORY",
      description: "Final 10 teams",
      image: "images/achievements/achievement15.jpg",
      validUntil: "30 June 2024",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 16,
      title: "HealthTech X 2 The Future",
      category: "award",
      date: "11 October 2024",
      organization: "Thaihealth and SYNHUB",
      description: "final 20 ",
      image: "images/achievements/achievement16.jpg",
      validUntil: "December 2026",
      link: "https://aws.amazon.com/certification/",
    },
    // ... other achievements
  ];

  const allCategories: Achievement["category"][] = [
    "award",
    "certification",
    "recognition",
    "publication",
  ];

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
        return new Date(b.date).getTime() - new Date(a.date).getTime();
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
                className="bg-white rounded-lg shadow-md p-6 border-l-4 transition-transform hover:scale-101"
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
                  {achievement.image && (
                    <img
                      src={achievement.image}
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
                      {achievement.link && (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          View Certificate →
                        </a>
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
      </div>
    </div>
  );
}
