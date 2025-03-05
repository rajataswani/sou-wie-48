
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, Mail } from "lucide-react";

const JoinUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Construction className="h-24 w-24 text-purple-800 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Under Construction</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          We're currently working on our membership portal. In the meantime, if you'd like to join IEEE WIE Silver Oak University Student Branch Affinity Group, please reach out to us via email.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-purple-700 hover:bg-purple-800 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </Button>
          
          <Button variant="outline" className="border-purple-300" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Benefits of Joining IEEE WIE</h2>
          
          <ul className="text-gray-700 text-left space-y-3">
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span>Access to technical workshops and seminars</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span>Networking opportunities with industry professionals</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span>Leadership development through organizing events</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span>Mentorship from senior IEEE members</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">•</span>
              <span>Recognition for technical and volunteer achievements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
