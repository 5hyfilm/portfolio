// src/app/experience/page.tsx
"use client";

import { useMemo, useState } from "react";
import { experiencesData } from "../../data/experiences";
import Image from "next/image";
import {
  getTypeStyle,
  sortExperiences,
} from "../../utils/experienceHelpers";
import {
  BriefcaseIcon,
  ClockIcon,
  FileTextIcon,
  GraduationCapIcon,
  HandshakeIcon,
} from "../../components/ui/Icons";
import type { ExperienceType } from "../../types/experience";

const getTypeIcon = (type: ExperienceType) => {
  const cls = "h-4 w-4";
  switch (type) {
    case "full-time":
      return <BriefcaseIcon className={cls} />;
    case "part-time":
      return <ClockIcon className={cls} />;
    case "internship":
      return <GraduationCapIcon className={cls} />;
    case "volunteer":
      return <HandshakeIcon className={cls} />;
    case "contract":
      return <FileTextIcon className={cls} />;
  }
};

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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

  const processedExperiences = useMemo(() => {
    return sortExperiences(experiencesData, "id", "desc");
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 to-purple-900 p-6 shadow-xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.4),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-fuchsia-500 to-amber-500" />
          <div className="pointer-events-none absolute -left-24 top-10 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-violet-200">
                  ARCHIVE
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Experience
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-purple-100 md:text-base">
                  A timeline of roles, projects, and impact.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent md:block" />

            <div className="space-y-4 md:space-y-6">
              {processedExperiences.map((exp) => {
                const isExpanded = expandedItems.has(exp.id);

                return (
                  <article
                    key={exp.id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/70 via-transparent to-white opacity-0 transition group-hover:opacity-100" />
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />

                    <div className="relative p-4 md:p-6">
                      <div className="hidden md:block">
                        <div className="absolute -left-[6px] top-8 h-3 w-3 rounded-full border border-gray-300 bg-white shadow-sm" />
                      </div>

                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                          {exp.image ? (
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white md:h-16 md:w-16">
                              <Image
                                src={exp.image}
                                alt={`${exp.company} logo`}
                                fill
                                sizes="64px"
                                className="object-contain p-2"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="h-14 w-14 shrink-0 rounded-xl border border-gray-200 bg-gray-50 md:h-16 md:w-16" />
                          )}

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg font-semibold leading-tight text-gray-900 md:text-xl">
                                {exp.title}
                              </h2>
                              <span
                                className={[
                                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
                                  getTypeStyle(exp.type),
                                ].join(" ")}
                              >
                                <span aria-hidden="true">{getTypeIcon(exp.type)}</span>
                                <span className="capitalize">{exp.type}</span>
                              </span>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 md:text-base">
                              {exp.companyWebsite ? (
                                <a
                                  href={exp.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-gray-800 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-500"
                                >
                                  {exp.company}
                                </a>
                              ) : (
                                <span className="font-medium text-gray-800">
                                  {exp.company}
                                </span>
                              )}
                              <span className="text-gray-400">•</span>
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-start">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {exp.period}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleExpand(exp.id)}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 md:hidden"
                            aria-expanded={isExpanded}
                          >
                            <span>{isExpanded ? "Hide" : "Details"}</span>
                            <svg
                              className={[
                                "h-4 w-4 transition-transform duration-200",
                                isExpanded ? "rotate-180" : "",
                              ].join(" ")}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div
                        className={[
                          "mt-4 grid gap-4 transition-all md:mt-5 md:grid",
                          isExpanded ? "grid" : "hidden md:grid",
                        ].join(" ")}
                      >
                        <ul className="space-y-2 text-sm text-gray-700 md:text-base">
                          {exp.description.map((item, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 md:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {exp.certificateLink && (
                          <div>
                            <a
                              href={exp.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200"
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 4h10a2 2 0 0 1 2 2v14l-5-2-5 2-5-2V6a2 2 0 0 1 2-2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 8h6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M9 12h6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                              View Certificate
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
