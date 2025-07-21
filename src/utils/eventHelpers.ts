// src/utils/eventHelpers.ts

import { Event, EventType } from "../types/events";

// Type icons mapping
export const getEventTypeIcon = (type: EventType): string => {
  const icons = {
    conference: "🎤",
    workshop: "🛠️",
    hackathon: "💻",
    webinar: "📹",
  };
  return icons[type];
};

// Type styles mapping
export const getEventTypeStyle = (type: EventType): string => {
  const styles = {
    conference: "bg-blue-100 text-blue-800 border-blue-200",
    workshop: "bg-green-100 text-green-800 border-green-200",
    hackathon: "bg-purple-100 text-purple-800 border-purple-200",
    webinar: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return styles[type];
};

// Type border colors for cards
export const getEventTypeBorderColor = (type: EventType): string => {
  const colors = {
    conference: "#3B82F6", // Blue
    workshop: "#10B981", // Green
    hackathon: "#8B5CF6", // Purple
    webinar: "#F59E0B", // Yellow
  };
  return colors[type];
};

// Legacy function for compatibility
export const getEventTypeColor = (type: EventType): string => {
  return getEventTypeStyle(type);
};

// Date parsing utility for event dates
export const parseEventDate = (dateStr: string): Date => {
  // Handle various date formats
  if (dateStr.includes("-")) {
    // Handle date ranges like "January 20-21, 2024"
    const parts = dateStr.split("-");
    const startDateStr = parts[0].trim();
    return new Date(startDateStr);
  }

  // Handle single dates like "June 28, 2020"
  return new Date(dateStr);
};

// Format event date for display
export const formatEventDate = (dateStr: string): string => {
  try {
    const date = parseEventDate(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr; // Return original if parsing fails
  }
};

// Filter events by search term
export const filterEventsBySearch = (
  events: Event[],
  searchTerm: string
): Event[] => {
  if (!searchTerm.trim()) return events;

  const lowercaseSearch = searchTerm.toLowerCase();

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(lowercaseSearch) ||
      event.description.toLowerCase().includes(lowercaseSearch) ||
      event.location.toLowerCase().includes(lowercaseSearch) ||
      event.role.toLowerCase().includes(lowercaseSearch) ||
      event.organizer?.toLowerCase().includes(lowercaseSearch) ||
      event.highlights.some((highlight) =>
        highlight.toLowerCase().includes(lowercaseSearch)
      ) ||
      event.technologies?.some((tech) =>
        tech.toLowerCase().includes(lowercaseSearch)
      )
  );
};

// Filter events by types
export const filterEventsByType = (
  events: Event[],
  selectedTypes: EventType[]
): Event[] => {
  if (selectedTypes.length === 0) return events;

  return events.filter((event) => selectedTypes.includes(event.type));
};

// Filter events by locations
export const filterEventsByLocation = (
  events: Event[],
  selectedLocations: string[]
): Event[] => {
  if (selectedLocations.length === 0) return events;

  return events.filter((event) => selectedLocations.includes(event.location));
};

// Sort events
export const sortEvents = (
  events: Event[],
  sortBy: "date" | "title" | "type",
  sortOrder: "asc" | "desc" = "desc"
): Event[] => {
  return [...events].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        const dateA = parseEventDate(a.date);
        const dateB = parseEventDate(b.date);
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "type":
        comparison = a.type.localeCompare(b.type);
        break;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });
};

// Combined filter and sort function
export const processEvents = (
  events: Event[],
  searchTerm: string,
  selectedTypes: EventType[],
  selectedLocations: string[],
  sortBy: "date" | "title" | "type",
  sortOrder: "asc" | "desc" = "desc"
): Event[] => {
  let processed = filterEventsBySearch(events, searchTerm);
  processed = filterEventsByType(processed, selectedTypes);
  processed = filterEventsByLocation(processed, selectedLocations);
  processed = sortEvents(processed, sortBy, sortOrder);

  return processed;
};

// Get event statistics
export const getEventStats = (events: Event[]) => {
  const stats = {
    total: events.length,
    byType: {} as Record<EventType, number>,
    byLocation: {} as Record<string, number>,
    totalTechnologies: new Set(
      events.flatMap((event) => event.technologies || [])
    ).size,
    onlineEvents: events.filter((event) =>
      event.location.toLowerCase().includes("online")
    ).length,
  };

  // Count by type
  events.forEach((event) => {
    stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
  });

  // Count by location
  events.forEach((event) => {
    stats.byLocation[event.location] =
      (stats.byLocation[event.location] || 0) + 1;
  });

  return stats;
};

// Get years of speaking experience
export const getSpeakingExperienceYears = (events: Event[]): number => {
  if (events.length === 0) return 0;

  const dates = events.map((event) => parseEventDate(event.date));
  const earliestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const latestDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const years = latestDate.getFullYear() - earliestDate.getFullYear();
  return Math.max(1, years); // At least 1 year if there are events
};

// Check if event is upcoming (future date)
export const isUpcomingEvent = (event: Event): boolean => {
  const eventDate = parseEventDate(event.date);
  const today = new Date();
  return eventDate > today;
};
