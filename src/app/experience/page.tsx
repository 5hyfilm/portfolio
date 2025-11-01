// src/app/experience/page.tsx
"use client";

import { useState } from "react";
import { experiencesData } from "../../data/experiences";
import Image from "next/image";

export default function Experience() {
  // State to track which items are expanded on mobile
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Sort experiences by id in descending order (highest id first)
  const sortedExperiences = [...experiencesData].sort((a, b) => b.id - a.id);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">
          Professional Experience
        </h1>

        <div className="space-y-6 md:space-y-12">
          {sortedExperiences.map((exp) => {
            const isExpanded = expandedItems.has(exp.id);

            return (
              <div
                key={exp.id}
                className="bg-white rounded-lg shadow-md p-4 md:p-6"
              >
                {/* Time period indicator - moved to top */}
                <div className="text-sm text-gray-500 mb-3 md:mb-4 text-right">
                  {exp.period}
                </div>

                {/* Company logo and job title */}
                <div className="mb-3 md:mb-4 flex items-start gap-3 md:gap-4">
                  {exp.image && (
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 relative">
                      <Image
                        src={exp.image}
                        alt={`${exp.company} logo`}
                        width={64}
                        height={64}
                        className="object-contain rounded-md"
                        onError={(e) => {
                          // Hide image if it fails to load
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                      {exp.title}
                    </h2>
                    <div className="text-gray-600 text-sm md:text-base">
                      {exp.companyWebsite ? (
                        <a
                          href={exp.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}{" "}
                      • {exp.location}
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse button for mobile */}
                <div className="md:hidden mb-3 flex justify-end">
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="text-blue-600 text-sm hover:text-blue-800 transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? "Less" : "More"}</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Responsibilities and achievements - Hidden on mobile unless expanded */}
                <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-gray-600 ml-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies used - Hidden on mobile unless expanded */}
                <div
                  className={`${
                    isExpanded ? "flex" : "hidden"
                  } md:flex flex-wrap gap-2 mt-4`}
                >
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* View Certificate Button - Hidden on mobile unless expanded */}
                {exp.certificateLink && (
                  <div
                    className={`${
                      isExpanded ? "block" : "hidden"
                    } md:block mt-4`}
                  >
                    <a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      <span className="mr-2">📜</span>
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
