import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import AwardList from "@/components/AwardList";
import AwardForm from "@/components/AwardForm";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StorageInfo from "@/components/StorageInfo";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [editingAward, setEditingAward] = useState<any>(null);
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { awards, addAward, updateAward, deleteAward } = useAwards();

  useEffect(() => {
    const storedLogin = localStorage.getItem("adminLoggedIn");
    if (storedLogin === "true") {
      setLoggedIn(true);
    }
  }, []);

  const checkPassword = async () => {
    // Simulate password check against environment variable
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    if (password === correctPassword) {
      setLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
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

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter the admin password to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={checkPassword}>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
