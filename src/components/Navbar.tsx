
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm py-3">
      <div className="max-w-3xl mx-auto px-4">
        <ul className="flex items-center justify-between gap-x-2 text-sm font-medium text-purple-800">
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
            <Link to="/join-us" className="hover:text-purple-600">Join Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
