// src/app/events/page.tsx
"use client";

import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: "conference" | "workshop" | "hackathon" | "webinar";
  description: string;
  image: string;
  role: string;
  highlights: string[];
  eventLink?: string;
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Week of Build 2020: Classify Images with Azure Cognitive Services",
      date: "June 28, 2020",
      location: "San Francisco, CA",
      type: "conference", // Matches the union type
      description:
        "Presented on modern web development practices and led a workshop on React performance optimization.",
      image: "images/events/event1.png",
      role: "Speaker",
      highlights: [
        "Led a workshop on React performance optimization",
        "Participated in panel discussion on future of web development",
        "Networked with industry leaders",
      ],
      eventLink: "https://techconf2024.com",
    },
    {
      id: 2,
      title:
        "Live Virtual Training: Deploy machine learning API to Azure App Service 💻",
      date: "July 24, 2021",
      location: "San Francisco, CA",
      type: "conference", // Matches the union type
      description:
        "Presented on modern web development practices and led a workshop on React performance optimization.",
      image: "images/events/event2.jpg",
      role: "Speaker",
      highlights: [
        "Led a workshop on React performance optimization",
        "Participated in panel discussion on future of web development",
        "Networked with industry leaders",
      ],
      eventLink: "https://techconf2024.com",
    },
    {
      id: 3,
      title:
        "Live Virtual Training: Create a Discord bot with Python and Azure App Service 🤖",
      date: "January 16, 2022",
      location: "Virtual",
      type: "workshop", // Matches the union type
      description:
        "Conducted a hands-on workshop teaching full-stack development using modern technologies.",
      image: "/images/events/event3.jpg",
      role: "Workshop Leader",
      highlights: [
        "Taught full-stack development concepts",
        "Provided hands-on coding exercises",
        "Mentored participants through project development",
      ],
    },
    {
      id: 4,
      title:
        "Live Virtual Training: Build your own AI chatbot with Azure AI Studio 🤖",
      date: "January 20-21, 2024",
      location: "New York, NY",
      type: "hackathon", // Matches the union type
      description:
        "Led a team of developers in creating an innovative solution for environmental sustainability.",
      image: "images/events/event4.jpg",
      role: "Team Lead",
      highlights: [
        "Won first place in sustainability category",
        "Developed a working prototype in 48 hours",
        "Presented solution to panel of judges",
      ],
      eventLink: "https://hackathon2024.com",
    },
  ];
  
  

  const getEventTypeColor = (type: Event["type"]) => {
    const colors = {
      conference: "bg-blue-100 text-blue-800",
      workshop: "bg-green-100 text-green-800",
      hackathon: "bg-purple-100 text-purple-800",
      webinar: "bg-yellow-100 text-yellow-800",
    };
    return colors[type];
  };

  const EventModal = ({
    event,
    onClose,
  }: {
    event: Event;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <img
            src={event.image}
            alt={event.title}
            className="w-full rounded-lg mb-4"
          />

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="text-gray-600">📅 {event.date}</span>
            <span className="text-gray-600">📍 {event.location}</span>
            <span className="text-gray-600">👤 {event.role}</span>
          </div>

          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${getEventTypeColor(
                event.type
              )}`}
            >
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{event.description}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Highlights:</h3>
            <ul className="list-disc list-inside space-y-1">
              {event.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-600">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {event.eventLink && (
            <a
              href={event.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors inline-block"
            >
              Visit Event Website
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Events & Speaking
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {event.title}
                  </h2>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div>📅 {event.date}</div>
                  <div>📍 {event.location}</div>
                </div>
                <p className="text-gray-600 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}