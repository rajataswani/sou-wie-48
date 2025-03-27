
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Event } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowLeft, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        console.log("Fetching event with ID:", id);
        const eventRef = doc(db, "events", id);
        const eventDoc = await getDoc(eventRef);
        
        if (eventDoc.exists()) {
          console.log("Event document found:", eventDoc.id);
          const eventData = eventDoc.data();
          setEvent({
            id: eventDoc.id,
            title: eventData.title || "",
            date: eventData.date || "",
            description: eventData.description || "",
            location: eventData.location || "",
            imageUrl: eventData.imageUrl || "",
            ieeeCount: eventData.ieeeCount || 0,
            nonIeeeCount: eventData.nonIeeeCount || 0
          });
        } else {
          console.log("No event document found with ID:", id);
          setError(new Error("Event not found"));
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setError(error instanceof Error ? error : new Error("Failed to load event"));
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-8 px-4 pb-16">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="w-full h-[300px] rounded-lg mb-8" />
          <Skeleton className="h-10 w-2/3 mb-4" />
          <div className="flex flex-wrap gap-4 mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-40 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-16 px-4 pb-16 flex flex-col items-center justify-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-purple-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't seem to exist or there was an error loading it.</p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-16">
        <Button variant="outline" className="mb-6" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
          <img 
            src={event.imageUrl || "/placeholder.svg"} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">{event.title}</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-purple-700">
            <CalendarIcon className="h-5 w-5" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-purple-700">
            <MapPinIcon className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">IEEE Members</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {event.ieeeCount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">Non-IEEE Members</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {event.nonIeeeCount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <UsersIcon className="h-8 w-8 mb-2 mx-auto text-purple-700" />
                <h3 className="font-semibold text-lg text-purple-800">Total Attendees</h3>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {(event.ieeeCount || 0) + (event.nonIeeeCount || 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="prose prose-purple max-w-none">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Event Description</h2>
          <div className="whitespace-pre-wrap">
            {event.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
