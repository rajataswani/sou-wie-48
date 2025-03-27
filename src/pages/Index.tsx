
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import AwardCard from "@/components/AwardCard";
import AdminLogin from "@/components/AdminLogin";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Calendar as CalendarIcon, Award as AwardIcon, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { awards, loading: awardsLoading, error: awardsError } = useAwards();

  // Function to render loading skeletons
  const renderSkeletons = (count = 3) => {
    return Array(count).fill(0).map((_, index) => (
      <Card key={index} className="w-full">
        <div className="aspect-video w-full bg-gray-200 animate-pulse" />
        <CardHeader>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5 mt-2" />
        </CardContent>
      </Card>
    ));
  };

  // Function to render error state
  const renderError = (message) => {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
          <h3 className="text-lg font-medium text-red-600">Error Loading Data</h3>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="pt-6">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-[80vh]">
        <div className="absolute inset-0 z-0 bg-[url('/wie-bg.svg')] bg-no-repeat bg-center opacity-5"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4">
            IEEE Women in Engineering
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-700 mb-6">
            Silver Oak University Student Branch Affinity Group
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Empowering women in engineering and technology through leadership, collaboration, and innovation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-purple-700 hover:bg-purple-800" asChild>
              <a href="https://ieee.socet.edu.in/contact/" target="_blank" rel="noopener noreferrer">Join Us</a>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-100" asChild>
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-[80vh]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">About IEEE SOU WIE SB AG</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">Who We Are</h3>
              <p className="text-gray-700 mb-6">
                We are a dedicated group of students at Silver Oak University who are passionate about 
                promoting diversity in engineering and technology fields. Our student branch works to 
                create opportunities for women engineers through various initiatives and events.
              </p>
              
              <div className="mt-6">
                <Button variant="outline" className="border-purple-300 text-purple-700" asChild>
                  <Link to="/learn-more">Read More About Our Mission</Link>
                </Button>
              </div>
            </div>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Our Leadership Team</CardTitle>
                <CardDescription>The driving force behind our initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mentor Section */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Mentor and Founding Member</span>
                    <span>Dr. Satvik Khara Sir</span>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Faculty Advisor Section */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Faculty Advisor</span>
                    <span>Prof. Gaurav Tiwari Sir</span>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Executive Team Section */}
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Executive Team</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="font-medium">Chairperson</span>
                      <span>Ravina Gajipara</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Vice Chairperson</span>
                      <span>Zalak Rajvanshi</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Secretary</span>
                      <span>Vedant Agrawal</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Treasurer</span>
                      <span>Payal Rana</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Webmaster</span>
                      <span>Jatin Kavani</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events and Awards Section */}
      <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-50 min-h-[80vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Our Activities</h2>
          
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="events">Flagship Events</TabsTrigger>
              <TabsTrigger value="awards">Awards & Recognition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-2">
              {eventsError ? (
                renderError("Could not load events. Please try again later.")
              ) : eventsLoading ? (
                <div className="space-y-6">
                  {renderSkeletons()}
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-6">
                  {events.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id} className="block">
                      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="aspect-video md:aspect-square md:col-span-1 overflow-hidden">
                            <img 
                              src={event.imageUrl || "/placeholder.svg"} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="p-4 md:col-span-3">
                            <h3 className="text-xl font-semibold text-purple-800 mb-2">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <p className="text-gray-700 line-clamp-2">{event.description}</p>
                            <p className="text-sm text-gray-500 mt-2">{event.location}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="shadow-md mx-auto max-w-md">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No events added yet. Check back soon!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="awards" className="mt-2">
              {awardsError ? (
                renderError("Could not load awards. Please try again later.")
              ) : awardsLoading ? (
                <div className="space-y-6">
                  {renderSkeletons()}
                </div>
              ) : awards.length > 0 ? (
                <div className="space-y-6">
                  {awards.map((award) => (
                    <Link to={`/award/${award.id}`} key={award.id} className="block">
                      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="aspect-video md:aspect-square md:col-span-1 overflow-hidden">
                            <img 
                              src={award.imageUrl || "/placeholder.svg"} 
                              alt={award.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="p-4 md:col-span-3">
                            <div className="flex items-center gap-2 mb-2">
                              <AwardIcon className="h-5 w-5 text-yellow-500" />
                              <h3 className="text-xl font-semibold text-purple-800">{award.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{award.date}</p>
                            <p className="text-gray-700 line-clamp-2">{award.description}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="shadow-md mx-auto max-w-md">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No awards added yet. Check back soon!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Admin Access */}
      <div className="fixed bottom-4 right-4">
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-100"
          onClick={() => setShowAdminLogin(true)}
        >
          Admin
        </Button>
      </div>

      {showAdminLogin && <AdminLogin onClose={() => setShowAdminLogin(false)} />}
    </div>
  );
};

export default Index;
