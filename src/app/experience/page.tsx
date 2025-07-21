// src/app/experience/page.tsx
"use client";

import { experiencesData } from "../../data/experiences";

export default function Experience() {
  // Sort experiences by id in descending order (highest id first)
  const sortedExperiences = [...experiencesData].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Professional Experience
        </h1>

        <div className="space-y-12">
          {sortedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              {/* Time period indicator */}
              <div className="absolute top-6 right-6 text-sm text-gray-500">
                {exp.period}
              </div>

              {/* Job title and company */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {exp.title}
                </h2>
                <div className="text-gray-600">
                  {exp.company} • {exp.location}
                </div>
              </div>

              {/* Responsibilities and achievements */}
              <ul className="list-disc list-inside mb-4 space-y-2">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-gray-600 ml-4">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Technologies used */}
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
