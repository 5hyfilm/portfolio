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
      description: "This project is an innovation that have been to competition in Korea International Youth Olympiad (KIYO4I) 2018 for help ADHD children by using Color Theory.",
      image: "images/projects/project1.png",
      technologies: ["Unity", "C#"],
      demoLink: "-",
      githubLink: "https://github.com/5hyfilm/artificial-cow-intelligence-milk-unity"
    },
    {
      id: 2,
      title: "PATH TO SAVE OUR COUNTRY",
      description: "We want to encourage people who play this game to see the importance of garbage separation. This is not difficult. Anyone can do it. By disposing of waste, there are many benefits, such as saving on waste, reducing energy consumption & resources by recycle glass, paper, metal, plastic, etc. or help to reduce pollution to the world.",
      image: "images/projects/project2.png",
      technologies: ["Unity", "C#"],
      demoLink: "-",
      githubLink: "https://github.com/5hyfilm/path-to-save-our-country"
    },
    {
      id: 3,
      title: "ALTER 2030",
      description: "We want to encourage people who play this game to see the importance of the increasing of population & garbage on the world.",
      image: "images/projects/project3.png",
      technologies: ["Unity", "C#"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 4,
      title: "Food Waste Controlling Program for Restaurant",
      description: "Our innovation is the program that helps predict the amount of consumer for calculate ingredients used in cooking in store for reducing food waste problems in restaurants. The working of the program starting with data collection of the amount of ingredients used in a restaurant for a period of time. Then, creating a database of external factors which are temperature ,humidity, precipitation & population density according to the Meteorological Department’s forecasting. Rain may cause less people to eat out & later leads to wasting excess cooking ingredients .The data will be collected as .csv file & extract them to calculate & predict by Machine Learning (ML) which uses Regression perform on environmental variables (temperature, humidity, wind speed & chance of having rain) to predict the number of customers & amount of ingredients needed for later time. The results will help to manage the amount of ingredients used for cooking worthy & efficiently.",
      image: "images/projects/project4.png",
      technologies: ["Machine Learning", "Python", "HTML", "CSS", "JavaScript"],
      demoLink: "https://fwcr-program.herokuapp.com/",
      githubLink: "https://github.com/5hyfilm/food-waste-controlling-program-for-restaurant"
    },
    {
      id: 5,
      title: "fxlmer-friendship",
      description: "Writing friendship in paper is not durable. It may become sluggish at any time but making this in an online website will be with us forever.",
      image: "images/projects/project5.png",
      technologies: ["Python", "HTML", "CSS", "JavaScript"],
      demoLink: "https://fxlmer-friendship.herokuapp.com/",
      githubLink: "https://github.com/5hyfilm/fxlmer-friendship"
    },
    {
      id: 6,
      title: "YSLC2021 C08 JORDAN",
      description: "Fake News Classification Web App for Thai Language.",
      image: "images/projects/project6.png",
      technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 7,
      title: "SkinFine",
      description: "Skin diseases are classified as fatal & non-fatal types. Some non-fatal types do not need doctor consultation because they can be naturally healed, for example, Atopic Dermatitis which is found in 10 - 20% of children & 1 - 3% of adults. However, most patients lack the knowledge of the risk of their skin diseases. For the purpose of precise self-examination of the skin diseases, this project was developed using a deep learning technique. The public data of skin diseases classification were collected from a large collection of multi-sources dermatoscopic images of common pigmented skin diseases, excluding Melanocytic Nevi class. The preprocessing & data augmentation were done using Convolutional Neural Network. The study focused on three model approaches to solve the imbalanced dataset problem which are oversampling utilization, class weights adjustment, & focal loss implementation. In this project, a novel method was proposed. The weights from the previous experiments were transferred to other models, which were subsequently trained with the dataset. The method has dramatically increased F1-score from around 0.65 to 0.99 out of 1. To the best of our knowledge, there was no previous report on weight transfer from one skin disease model to other skin disease model as developed in the present work. The models were later ensembled using the arithmetic mean of each model prediction. The AUC score of 1.00 can be obtained from the test set. Finally, our three model approaches were developed into the web application that can precisely predict the type of skin diseases.",
      image: "images/projects/project7.png",
      technologies: ["Deep Learning", "Python", "HTML", "CSS", "JavaScript"],
      demoLink: "https://demo-link.com",
      githubLink: "https://github.com/yourusername/project"
    },
    {
      id: 8,
      title: "ตรวจจับรถควันดำจากต้นตอ",
      description: "A project in Embedded System",
      image: "images/projects/project8.png",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      demoLink: "https://witty-glacier-0ed900100.5.azurestaticapps.net/",
      githubLink: "https://github.com/5hyfilm/embed-lab-project-web"
    },
    {
      id: 9,
      title: "Sangria",
      description: "An end-to-end HR analytics solution",
      image: "images/projects/project9.png",
      technologies: ["Azure AI Studio", "PowerBI", "Microsoft Power Automate", "Web Development"],
      demoLink: "https://zealous-desert-061b3ff00.5.azurestaticapps.net/",
      githubLink: "https://github.com/5hyfilm/Sangria"
    },
    {
      id: 10,
      title: "EiEi Job Fair",
      description: "A project in SW Dev Prac 2",
      image: "images/projects/project10.png",
      technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB"],
      demoLink: "https://eiei-job-fair.vercel.app/",
      githubLink: "https://github.com/5hyfilm/eiei_JobFair"
    },
    {
      id: 11,
      title: "GOROLL",
      description: "A platform for accessible journeys and inclusive communities.",
      image: "images/projects/project11.png",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      demoLink: "https://demo-link.com",
      githubLink: ""
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