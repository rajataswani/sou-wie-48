
import { useState, useEffect } from "react";
import { type Award } from "@/types/content";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Convert Firestore document to Award type
  const convertDocToAward = (doc: QueryDocumentSnapshot<DocumentData>): Award => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      imageUrl: data.imageUrl || ""
    };
  };
  
  useEffect(() => {
    // Load awards from Firestore
    const loadAwards = async () => {
      try {
        const awardsCollection = collection(db, "awards");
        const awardSnapshot = await getDocs(awardsCollection);
        const awardsList = awardSnapshot.docs.map(convertDocToAward);
        setAwards(awardsList);
      } catch (error) {
        console.error("Error loading awards:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAwards();
  }, []);
  
  const addAward = async (award: Omit<Award, "id">) => {
    try {
      const awardsCollection = collection(db, "awards");
      const docRef = await addDoc(awardsCollection, award);
      
      const newAward = {
        ...award,
        id: docRef.id,
      };
      
      setAwards([...awards, newAward]);
      return newAward;
    } catch (error) {
      console.error("Error adding award:", error);
      throw error;
    }
  };
  
  const updateAward = async (id: string, updatedAward: Partial<Award>) => {
    try {
      const awardRef = doc(db, "awards", id);
      await updateDoc(awardRef, updatedAward);
      
      const updatedAwards = awards.map(award => 
        award.id === id ? { ...award, ...updatedAward } : award
      );
      
      setAwards(updatedAwards);
    } catch (error) {
      console.error("Error updating award:", error);
      throw error;
    }
  };
  
  const deleteAward = async (id: string) => {
    try {
      const awardRef = doc(db, "awards", id);
      await deleteDoc(awardRef);
      
      const updatedAwards = awards.filter(award => award.id !== id);
      setAwards(updatedAwards);
    } catch (error) {
      console.error("Error deleting award:", error);
      throw error;
    }
  };
  
  return { awards, loading, addAward, updateAward, deleteAward };
}
