
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  // IEEE WIE logo
  const logoUrl = "https://brand-experience.ieee.org/wp-content/uploads/2019/01/WIE_purple_stacked.png";
  // Fallback image in case the IEEE WIE logo fails to load
  const logoFallback = "/placeholder.svg";
  
  const navItems = [
    { label: "Home", href: "/", isExternal: false, isScroll: false },
    { label: "About", href: "#about", isExternal: false, isScroll: true },
    { label: "Activities", href: "#activities", isExternal: false, isScroll: true },
    { label: "IEEE WIE", href: "https://wie.ieee.org/", isExternal: true, isScroll: false },
    { label: "Learn More", href: "/learn-more", isExternal: false, isScroll: false },
    { label: "Join Us", href: "https://ieee.socet.edu.in/contact/", isExternal: true, isScroll: false },
  ];
  
  const handleScrollClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    
    // Get the target element and scroll to it
    const targetId = href.substring(1); // Remove the '#' from the href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  const renderNavItem = (item, index) => (
    <li key={index}>
      {item.isExternal ? (
        <a 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`flex items-center gap-1 hover:text-purple-600 ${item.label === "IEEE WIE" ? "flex items-center gap-1" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          {item.label} {item.label === "IEEE WIE" && <ExternalLink className="h-3 w-3" />}
        </a>
      ) : item.isScroll ? (
        <a 
          href={item.href} 
          className="hover:text-purple-600"
          onClick={(e) => handleScrollClick(e, item.href)}
        >
          {item.label}
        </a>
      ) : (
        <Link 
          to={item.href} 
          className="hover:text-purple-600"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
  
  return (
    <nav className={`sticky ${isMobile ? 'top-16 max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-sm rounded-full z-40' : 'top-8 bg-purple-800 text-white z-40'} w-full my-6 py-3 px-4`}>
      {isMobile ? (
        <div className="flex items-center justify-between">
          <Link to="/" className="text-purple-800 font-semibold">IEEE WIE SOU</Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-purple-800">Menu</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <ul className="flex flex-col space-y-4 px-6 text-purple-800 font-medium">
                    {navItems.map(renderNavItem)}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={logoUrl} 
              alt="IEEE WIE Logo" 
              className="h-10"
              onError={(e) => {
                // If image fails to load, set a fallback
                e.currentTarget.src = logoFallback;
              }}
            />
          </Link>
          <ul className="flex items-center gap-x-6 text-sm font-medium text-white">
            {navItems.map(renderNavItem)}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
