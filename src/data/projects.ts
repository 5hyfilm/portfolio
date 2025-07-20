// src/data/projects.ts

import { Project, ProjectCategory, ProjectStatus } from "../types/projects";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Artificial Cow Intelligence Milk",
    description:
      "This project is an innovation that have been to competition in Korea International Youth Olympiad (KIYO4I) 2018 for help ADHD children by using Color Theory.",
    image: "images/projects/project1.png",
    technologies: ["Unity", "C#"],
    demoLink: "-",
    githubLink:
      "https://github.com/5hyfilm/artificial-cow-intelligence-milk-unity",
    category: "game",
    status: "completed",
    year: 2018,
    featured: true,
    duration: "6 months",
  },
  {
    id: 2,
    title: "PATH TO SAVE OUR COUNTRY",
    description:
      "We want to encourage people who play this game to see the importance of garbage separation. This is not difficult. Anyone can do it. By disposing of waste, there are many benefits, such as saving on waste, reducing energy consumption & resources by recycle glass, paper, metal, plastic, etc. or help to reduce pollution to the world.",
    image: "images/projects/project2.png",
    technologies: ["Unity", "C#"],
    demoLink: "-",
    githubLink: "https://github.com/5hyfilm/path-to-save-our-country",
    category: "game",
    status: "completed",
    year: 2019,
    duration: "4 months",
  },
  {
    id: 3,
    title: "ALTER 2030",
    description:
      "We want to encourage people who play this game to see the importance of the increasing of population & garbage on the world.",
    image: "images/projects/project3.png",
    technologies: ["Unity", "C#"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/yourusername/project",
    category: "game",
    status: "completed",
    year: 2020,
    duration: "3 months",
  },
  {
    id: 4,
    title: "Food Waste Controlling Program for Restaurant",
    description:
      "Our innovation is the program that helps predict the amount of consumer for calculate ingredients used in cooking in store for reducing food waste problems in restaurants. The working of the program starting with data collection of the amount of ingredients used in a restaurant for a period of time. Then, creating a database of external factors which are temperature ,humidity, precipitation & population density according to the Meteorological Department's forecasting. Rain may cause less people to eat out & later leads to wasting excess cooking ingredients .The data will be collected as .csv file & extract them to calculate & predict by Machine Learning (ML) which uses Regression perform on environmental variables (temperature, humidity, wind speed & chance of having rain) to predict the number of customers & amount of ingredients needed for later time. The results will help to manage the amount of ingredients used for cooking worthy & efficiently.",
    image: "images/projects/project4.png",
    technologies: ["Machine Learning", "Python", "HTML", "CSS", "JavaScript"],
    demoLink: "https://fwcr-program.herokuapp.com/",
    githubLink:
      "https://github.com/5hyfilm/food-waste-controlling-program-for-restaurant",
    category: "ai-ml",
    status: "completed",
    year: 2021,
    featured: true,
    duration: "8 months",
  },
  {
    id: 5,
    title: "fxlmer-friendship",
    description:
      "Writing friendship in paper is not durable. It may become sluggish at any time but making this in an online website will be with us forever.",
    image: "images/projects/project5.png",
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    demoLink: "https://fxlmer-friendship.herokuapp.com/",
    githubLink: "https://github.com/5hyfilm/fxlmer-friendship",
    category: "web-app",
    status: "completed",
    year: 2021,
    duration: "2 months",
  },
  {
    id: 6,
    title: "YSLC2021 C08 JORDAN",
    description: "Fake News Classification Web App for Thai Language.",
    image: "images/projects/project6.png",
    technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/yourusername/project",
    category: "web-app",
    status: "completed",
    year: 2021,
    duration: "3 months",
  },
  {
    id: 7,
    title: "SkinFine",
    description:
      "Skin diseases are classified as fatal & non-fatal types. Some non-fatal types do not need doctor consultation because they can be naturally healed, for example, Atopic Dermatitis which is found in 10 - 20% of children & 1 - 3% of adults. However, most patients lack the knowledge of the risk of their skin diseases. For the purpose of precise self-examination of the skin diseases, this project was developed using a deep learning technique. The public data of skin diseases classification were collected from a large collection of multi-sources dermatoscopic images of common pigmented skin diseases, excluding Melanocytic Nevi class. The preprocessing & data augmentation were done using Convolutional Neural Network. The study focused on three model approaches to solve the imbalanced dataset problem which are oversampling utilization, class weights adjustment, & focal loss implementation. In this project, a novel method was proposed. The weights from the previous experiments were transferred to other models, which were subsequently trained with the dataset. The method has dramatically increased F1-score from around 0.65 to 0.99 out of 1. To the best of our knowledge, there was no previous report on weight transfer from one skin disease model to other skin disease model as developed in the present work. The models were later ensembled using the arithmetic mean of each model prediction. The AUC score of 1.00 can be obtained from the test set. Finally, our three model approaches were developed into the web application that can precisely predict the type of skin diseases.",
    image: "images/projects/project7.png",
    technologies: ["Deep Learning", "Python", "HTML", "CSS", "JavaScript"],
    demoLink: "https://demo-link.com",
    githubLink: "https://github.com/yourusername/project",
    category: "ai-ml",
    status: "completed",
    year: 2022,
    featured: true,
    duration: "12 months",
  },
  {
    id: 8,
    title: "ตรวจจับรถควันดำจากต้นตอ",
    description: "A project in Embedded System",
    image: "images/projects/project8.png",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
    demoLink: "https://witty-glacier-0ed900100.5.azurestaticapps.net/",
    githubLink: "https://github.com/5hyfilm/embed-lab-project-web",
    category: "iot",
    status: "completed",
    year: 2023,
    duration: "4 months",
  },
  {
    id: 9,
    title: "Sangria",
    description: "An end-to-end HR analytics solution",
    image: "images/projects/project9.png",
    technologies: [
      "Azure AI Studio",
      "PowerBI",
      "Microsoft Power Automate",
      "Web Development",
    ],
    demoLink: "https://zealous-desert-061b3ff00.5.azurestaticapps.net/",
    githubLink: "https://github.com/5hyfilm/Sangria",
    category: "data-analysis",
    status: "completed",
    year: 2024,
    featured: true,
    duration: "6 months",
  },
  {
    id: 10,
    title: "EiEi Job Fair",
    description: "A project in SW Dev Prac 2",
    image: "images/projects/project10.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB"],
    demoLink: "https://eiei-job-fair.vercel.app/",
    githubLink: "https://github.com/5hyfilm/eiei_JobFair",
    category: "web-app",
    status: "completed",
    year: 2024,
    duration: "4 months",
  },
  {
    id: 11,
    title: "GOROLL",
    description:
      "A platform for accessible journeys and inclusive communities.",
    image: "images/projects/project11.png",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    demoLink: "https://goroll.vercel.app/",
    githubLink: "",
    category: "web-app",
    status: "completed",
    year: 2024,
    featured: true,
    duration: "5 months",
  },
].reverse(); // Reverse to show newest projects first

// Export category constants for filtering
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "web-app",
  "mobile-app",
  "game",
  "ai-ml",
  "data-analysis",
  "iot",
  "desktop-app",
  "other",
];

// Export status constants for filtering
export const PROJECT_STATUSES: ProjectStatus[] = [
  "completed",
  "in-progress",
  "on-hold",
  "planning",
];

// Export all unique technologies from projects
export const ALL_PROJECT_TECHNOLOGIES = Array.from(
  new Set(projectsData.flatMap((project) => project.technologies))
).sort();

// Export featured projects
export const FEATURED_PROJECTS = projectsData.filter(
  (project) => project.featured
);
