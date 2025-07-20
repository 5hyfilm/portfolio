// src/types/events.ts

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: EventType;
  description: string;
  image: string;
  role: string;
  highlights: string[];
  eventLink?: string;
  organizer?: string;
  duration?: string; // e.g., "2 days", "1 day"
  technologies?: string[]; // Technologies covered in the event
}

export type EventType = "conference" | "workshop" | "hackathon" | "webinar";

export interface EventModalProps {
  event: Event;
  onClose: () => void;
}

export interface EventFilterOptions {
  searchTerm: string;
  selectedTypes: EventType[];
  selectedLocations: string[];
  sortBy: "date" | "title" | "type";
  sortOrder: "asc" | "desc";
}
