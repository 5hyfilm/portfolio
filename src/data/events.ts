// src/data/events.ts

import { Event, EventType } from "../types/events";

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Week of Build 2020: Classify Images with Azure Cognitive Services",
    date: "June 28, 2020",
    location: "Online",
    type: "workshop",
    description: "สร้าง AI จำแนกรูปภาพโดยไม่ต้องเขียนโค้ด ด้วย Azure Cognitive Services",
    image: "images/events/event1.png",
    role: "Speaker",
    highlights: [
      "Introduction to Azure Cognitive Services",
      "Image classification without coding",
      "Hands-on workshop with AI tools"
    ],
    eventLink: "https://www.facebook.com/share/p/1A1vVHz8si/",
    organizer: "Microsoft",
    duration: "1 day",
    technologies: ["Azure", "AI", "Computer Vision"]
  },
  {
    id: 2,
    title: "Coding School Champions 2020",
    date: "December 9, 2020",
    location: "Anuban Wat Nong Khun Chat (Uthit Phitthayakhan)",
    type: "workshop",
    description: "Presented on modern web development practices and led a workshop on React performance optimization.",
    image: "images/events/event2.jpg",
    role: "Speaker",
    highlights: [
      "Led a workshop on React performance optimization",
      "Participated in panel discussion on future of web development",
      "Networked with industry leaders"
    ],
    eventLink: "https://techconf2024.com",
    organizer: "Coding School",
    duration: "1 day",
    technologies: ["React", "JavaScript", "Web Development"]
  },
  {
    id: 3,
    title: "Live Virtual Training: Deploy machine learning API to Azure App Service 💻",
    date: "July 24, 2021",
    location: "Online",
    type: "workshop",
    description: "In this session, Waranthorn Chansawang and Sirasit Boonklang, Microsoft Learn Student Ambassadors, will share knowledge about how to develop and deploy machine learning API to Azure App Service.",
    image: "images/events/event3.jpg",
    role: "Speaker",
    highlights: [
      "Develop machine learning model with python",
      "Introduction to Application Programming Interface (API)",
      "Develop machine learning API using Flask",
      "Introduction to Azure App Service",
      "Deploy machine learning API to Azure"
    ],
    eventLink: "https://fb.me/e/2iHck3rNu",
    organizer: "Microsoft Learn Student Ambassadors",
    duration: "2 hours",
    technologies: ["Python", "Flask", "Azure", "Machine Learning", "API"]
  },
  {
    id: 4,
    title: "Live Virtual Training: Create a Discord bot with Python and Azure App Service 🤖",
    date: "January 16, 2022",
    location: "Online",
    type: "workshop",
    description: "Conducted a hands-on workshop teaching full-stack development using modern technologies.",
    image: "images/events/event4.jpg",
    role: "Workshop Leader",
    highlights: [
      "What is Discord?",
      "Create a Discord bot using Python",
      "Introduction to Azure App Service",
      "Deploy a Discord bot to Azure App Service"
    ],
    eventLink: "https://fb.me/e/1yIFiYaEp",
    organizer: "Microsoft Learn Student Ambassadors",
    duration: "2 hours",
    technologies: ["Python", "Discord API", "Azure", "Bot Development"]
  },
  {
    id: 5,
    title: "Live Virtual Training: Build your own AI chatbot with Azure AI Studio 🤖",
    date: "January 20-21, 2024",
    location: "Online",
    type: "workshop",
    description: "Led a team of developers in creating an innovative solution for environmental sustainability.",
    image: "images/events/event5.jpg",
    role: "Team Lead",
    highlights: [
      "Introduction to Microsoft Learn Student Ambassadors",
      "Introduction to Azure AI Studio",
      "Deploy Azure AI Studio to Azure App Service",
      "Q&A"
    ],
    eventLink: "https://fb.me/e/2aLhOVwYD",
    organizer: "Microsoft Learn Student Ambassadors",
    duration: "2 days",
    technologies: ["Azure AI Studio", "Chatbot", "AI", "Azure"]
  }
];

// Export type constants for filtering
export const EVENT_TYPES: EventType[] = [
  "conference",
  "workshop",
  "hackathon",
  "webinar"
];

// Export all unique locations from events
export const ALL_LOCATIONS = Array.from(
  new Set(
    eventsData.map(event => event.location)
  )
).sort();

// Export all unique technologies from events
export const ALL_EVENT_TECHNOLOGIES = Array.from(
  new Set(
    eventsData.flatMap(event => event.technologies || [])
  )
).sort();