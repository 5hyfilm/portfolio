// src/app/events/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { eventsData } from "../../data/events";
import { getEventTypeColor } from "../../utils/eventHelpers";
import { Event } from "../../types/events";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>

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
          {eventsData.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

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
