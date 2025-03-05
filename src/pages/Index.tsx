
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";
import AwardCard from "@/components/AwardCard";
import AdminLogin from "@/components/AdminLogin";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { events } = useEvents();
  const { awards } = useAwards();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
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
            <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
              Join Us
            </Button>
            <Button size="lg" variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-100">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">About Our Student Branch</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">Vision</h3>
              <p className="text-gray-700 mb-6">
                To create a vibrant community at Silver Oak University where women in STEM fields can thrive through mentorship, 
                professional development, and collaborative initiatives.
              </p>
              
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">Mission</h3>
              <p className="text-gray-700">
                We strive to inspire and support women in engineering at Silver Oak University through workshops, 
                networking opportunities, and technical projects that build confidence and skills for future leadership.
              </p>
            </div>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Our Leadership Team</CardTitle>
                <CardDescription>The driving force behind our initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="font-medium">Chairperson</span>
                    <span>Ravina Gajipara</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Vice Chairperson</span>
                    <span>Jalak Rajvanshi</span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events and Awards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Our Activities</h2>
          
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="events">Flagship Events</TabsTrigger>
              <TabsTrigger value="awards">Awards & Recognition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-2">
              {events.length > 0 ? (
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {events.map((event) => (
                      <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                        <EventCard event={event} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="relative static mr-2" />
                    <CarouselNext className="relative static ml-2" />
                  </div>
                </Carousel>
              ) : (
                <Card className="shadow-md mx-auto max-w-md">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No events added yet. Check back soon!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="awards" className="mt-2">
              {awards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awards.map((award) => (
                    <AwardCard key={award.id} award={award} />
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
