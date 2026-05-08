// ./src/app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { projectsData } from "../../data/projects";
import { Project } from "../../types/projects";
import { ExternalLinkIcon } from "../../components/ui/Icons";

// Helper function เพื่อจัดการ image path ให้ถูกต้องสำหรับ Next.js Image
const getImagePath = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath; // absolute URL
  if (imagePath.startsWith("/")) return imagePath; // already absolute path
  return `/${imagePath}`; // add leading slash for relative path
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // เรียงลำดับโปรเจ็กต์แบบ desc ตาม id (ใหม่ล่าสุดขึ้นก่อน)
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => b.id - a.id);
  }, []);

  const ProjectModal = ({
    project,
    onClose,
  }: {
    project: Project;
    onClose: () => void;
  }) => (
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
              <h2 className="truncate text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-violet-100"
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

          {/* แก้ไขจาก <img> เป็น <Image /> */}
          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 md:h-80">
            <Image
              src={getImagePath(project.image)}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <p className="text-gray-700 md:text-base">{project.description}</p>

          <div className="mb-4">
            <h3 className="mt-6 text-sm font-semibold tracking-wide text-gray-900">
              TECHNOLOGIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 md:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.demoLink !== "-" && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                View Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-violet-100"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 to-purple-900 p-6 shadow-xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.4),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-fuchsia-500 to-amber-500" />
          <div className="pointer-events-none absolute -left-24 top-10 h-px w-[140%] -rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-violet-200">
                ARCHIVE
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Projects
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-purple-100 md:text-base">
                Selected work across product, data, and engineering.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50/70 via-transparent to-white opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(to_bottom,rgba(76,29,149,0.95),rgba(167,139,250,0.85),rgba(245,158,11,0.75))] opacity-80" />
              {/* แก้ไขจาก <img> เป็น <Image /> */}
              <div className="relative h-48 w-full">
                <Image
                  src={getImagePath(project.image)}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="relative p-6">
                <h2 className="text-lg font-semibold tracking-tight text-gray-950 md:text-xl">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-gray-700 md:text-base">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
