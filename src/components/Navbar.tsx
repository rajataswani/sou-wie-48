
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="relative w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-sm rounded-full my-6 py-3 px-4">
      <ul className={`flex items-center ${isMobile ? "flex-wrap justify-center gap-y-2" : "justify-between"} gap-x-2 text-sm font-medium text-purple-800`}>
        <li>
          <Link to="/" className="hover:text-purple-600">Home</Link>
        </li>
        <li>
          <a href="#about" className="hover:text-purple-600">About</a>
        </li>
        <li>
          <a href="#activities" className="hover:text-purple-600">Activities</a>
        </li>
        <li>
          <a 
            href="https://wie.ieee.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-purple-600"
          >
            IEEE WIE <ExternalLink className="h-3 w-3" />
          </a>
        </li>
        <li>
          <Link to="/learn-more" className="hover:text-purple-600">Learn More</Link>
        </li>
        <li>
          <a 
            href="https://ieee.socet.edu.in/contact/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-purple-600"
          >
            Join Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
