
import { useState, useEffect } from "react";
import { type Event } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Convert Firestore document to Event type
  const convertDocToEvent = (doc: QueryDocumentSnapshot<DocumentData>): Event => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      location: data.location || "",
      imageUrl: data.imageUrl || "",
      ieeeCount: data.ieeeCount || 0,
      nonIeeeCount: data.nonIeeeCount || 0
    };
  };
  
  useEffect(() => {
    // Load events from Firestore
    const loadEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventsList = eventSnapshot.docs.map(convertDocToEvent);
        setEvents(eventsList);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  const addEvent = async (event: Omit<Event, "id">) => {
    try {
      const eventsCollection = collection(db, "events");
      const docRef = await addDoc(eventsCollection, event);
      
      const newEvent = {
        ...event,
        id: docRef.id,
      };
      
      setEvents([...events, newEvent]);
      return newEvent;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };
  
  const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, updatedEvent);
      
      const updatedEvents = events.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };
  
  const deleteEvent = async (id: string) => {
    try {
      const eventRef = doc(db, "events", id);
      await deleteDoc(eventRef);
      
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };
  
  return { events, loading, addEvent, updateEvent, deleteEvent };
}
