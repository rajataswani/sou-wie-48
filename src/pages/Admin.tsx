
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventForm from "@/components/EventForm";
import AwardForm from "@/components/AwardForm";
import EventList from "@/components/EventList";
import AwardList from "@/components/AwardList";
import { LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAwardForm, setShowAwardForm] = useState(false);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();
  
  useEffect(() => {
    const checkLogin = () => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      if (!isAdminLoggedIn) {
        navigate("/");
        toast({
          title: "Access denied",
          description: "You must be logged in to access the admin dashboard",
          variant: "destructive",
        });
      } else {
        setIsLoggedIn(true);
      }
    };
    
    checkLogin();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-900">IEEE WIE SB Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </header>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-purple-800">Manage Events</h2>
                <Button onClick={() => setShowEventForm(true)}>Add New Event</Button>
              </div>
              
              <EventList 
                events={events} 
                onEdit={(event) => {
                  // Implement edit functionality
                }} 
                onDelete={deleteEvent} 
              />
            </CardContent>
          </Card>
          
          {showEventForm && (
            <EventForm 
              onSubmit={(eventData) => {
                addEvent(eventData);
                setShowEventForm(false);
                toast({
                  title: "Event added",
                  description: "The event has been successfully added",
                });
              }}
              onCancel={() => setShowEventForm(false)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="awards" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-purple-800">Manage Awards</h2>
                <Button onClick={() => setShowAwardForm(true)}>Add New Award</Button>
              </div>
              
              <AwardList 
                awards={awards} 
                onEdit={(award) => {
                  // Implement edit functionality
                }} 
                onDelete={deleteAward} 
              />
            </CardContent>
          </Card>
          
          {showAwardForm && (
            <AwardForm 
              onSubmit={(awardData) => {
                addAward(awardData);
                setShowAwardForm(false);
                toast({
                  title: "Award added",
                  description: "The award has been successfully added",
                });
              }}
              onCancel={() => setShowAwardForm(false)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
