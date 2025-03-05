
import { useState, useEffect } from "react";
import { type Event } from "@/types/content";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load events from localStorage
    const loadEvents = () => {
      try {
        const savedEvents = localStorage.getItem("wieEvents");
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
    
    // Listen for storage events to update in real-time across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wieEvents" && e.newValue) {
        setEvents(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("wieEvents", JSON.stringify(updatedEvents));
    return newEvent;
  };
  
  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    
    setEvents(updatedEvents);
    localStorage.setItem("wieEvents", JSON.stringify(updatedEvents));
  };
  
  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("wieEvents", JSON.stringify(updatedEvents));
  };
  
  return { events, loading, addEvent, updateEvent, deleteEvent };
}
