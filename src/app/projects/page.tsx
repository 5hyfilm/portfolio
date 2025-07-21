// ./src/app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { projectsData } from "../../data/projects";
import { Project } from "../../types/projects";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* แก้ไขจาก <img> เป็น <Image /> */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src={getImagePath(project.image)}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <p className="text-gray-600 mb-4">{project.description}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
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
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              {/* แก้ไขจาก <img> เป็น <Image /> */}
              <div className="relative w-full h-48">
                <Image
                  src={getImagePath(project.image)}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 text-xs">
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
