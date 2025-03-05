
import { useState, useEffect } from "react";
import { type Award } from "@/types/content";

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load awards from localStorage
    const loadAwards = () => {
      try {
        const savedAwards = localStorage.getItem("wieAwards");
        if (savedAwards) {
          setAwards(JSON.parse(savedAwards));
        }
      } catch (error) {
        console.error("Error loading awards:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAwards();
    
    // Listen for storage events to update in real-time across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wieAwards" && e.newValue) {
        setAwards(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const addAward = (award: Omit<Award, "id">) => {
    const newAward = {
      ...award,
      id: Date.now().toString(),
    };
    
    const updatedAwards = [...awards, newAward];
    setAwards(updatedAwards);
    localStorage.setItem("wieAwards", JSON.stringify(updatedAwards));
    return newAward;
  };
  
  const updateAward = (id: string, updatedAward: Partial<Award>) => {
    const updatedAwards = awards.map(award => 
      award.id === id ? { ...award, ...updatedAward } : award
    );
    
    setAwards(updatedAwards);
    localStorage.setItem("wieAwards", JSON.stringify(updatedAwards));
  };
  
  const deleteAward = (id: string) => {
    const updatedAwards = awards.filter(award => award.id !== id);
    setAwards(updatedAwards);
    localStorage.setItem("wieAwards", JSON.stringify(updatedAwards));
  };
  
  return { awards, loading, addAward, updateAward, deleteAward };
}
