// src/app/projects/page.tsx
'use client'

import { useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  demoLink: string
  githubLink: string
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Artificial Cow Intelligence Milk",
      description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      image: "public/images/projects/project1.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/5hyfilm/artificial-cow-intelligence-milk-unity"
    },
    {
      id: 2,
      title: "PATH TO SAVE OUR COUNTRY",
      description: "A collaborative task management application with real-time updates and team features.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/5hyfilm/path-to-save-our-country"
    },
    {
      id: 3,
      title: "ALTER 2030",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 4,
      title: "Food Waste Controlling Program for Restaurant",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 5,
      title: "fxlmer-friendship",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 6,
      title: "YSLC2021 C08 JORDAN",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 7,
      title: "SkinFine",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 8,
      title: "ตรวจจับรถควันดำจากต้นตอ",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 9,
      title: "Sangria",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 10,
      title: "EiEi Job Fair",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 11,
      title: "GOROLL",
      description: "A weather dashboard that displays current and forecasted weather data with interactive maps.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
  ].reverse() // Reverse the array to show newest projects first

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full rounded-lg mb-4"
          />
          
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
            <a 
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Demo
            </a>
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
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
  )
}