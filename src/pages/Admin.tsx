
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import AwardList from "@/components/AwardList";
import AwardForm from "@/components/AwardForm";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import StorageInfo from "@/components/StorageInfo";

const Admin = () => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editingAward, setEditingAward] = useState<any>(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isLoggedIn) {
      // Redirect to home if not logged in
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  const handleEventSubmit = (eventData: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      setEditingEvent(null);
    } else {
      addEvent(eventData);
    }
    setIsEventFormOpen(false);
  };

  const handleAwardSubmit = (awardData: any) => {
    if (editingAward) {
      updateAward(editingAward.id, awardData);
      setEditingAward(null);
    } else {
      addAward(awardData);
    }
    setIsAwardFormOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
  };

  const handleDeleteAward = (id: string) => {
    deleteAward(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <StorageInfo />

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <div className="mb-4">
              <Button onClick={() => setIsEventFormOpen(true)}>Add New Event</Button>
            </div>
            <EventList
              events={events}
              onEdit={(event) => {
                setEditingEvent(event);
                setIsEventFormOpen(true);
              }}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>
          <TabsContent value="awards">
            <div className="mb-4">
              <Button onClick={() => setIsAwardFormOpen(true)}>Add New Award</Button>
            </div>
            <AwardList
              awards={awards}
              onEdit={(award) => {
                setEditingAward(award);
                setIsAwardFormOpen(true);
              }}
              onDelete={handleDeleteAward}
            />
          </TabsContent>
        </Tabs>

        {isEventFormOpen && (
          <EventForm
            event={editingEvent}
            onSubmit={handleEventSubmit}
            onCancel={() => {
              setIsEventFormOpen(false);
              setEditingEvent(null);
            }}
          />
        )}

        {isAwardFormOpen && (
          <AwardForm
            award={editingAward}
            onSubmit={handleAwardSubmit}
            onCancel={() => {
              setIsAwardFormOpen(false);
              setEditingAward(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
