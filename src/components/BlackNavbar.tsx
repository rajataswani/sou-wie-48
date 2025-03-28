
import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BlackNavbar = () => {
  const isMobile = useIsMobile();
  
  const ieeeLinks = [
    { label: "IEEE.org", href: "https://www.ieee.org/" },
    { label: "IEEE Xplore Digital Library", href: "https://ieeexplore.ieee.org/Xplore/home.jsp" },
    { label: "IEEE Standards", href: "https://standards.ieee.org/" },
    { label: "IEEE Spectrum", href: "https://spectrum.ieee.org/" },
    { label: "More Sites", href: "https://www.ieee.org/sitemap.html" }
  ];
  
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/ieeewomeninengineering/" },
    { icon: Twitter, href: "https://twitter.com/ieeewie" },
    { icon: Instagram, href: "https://www.instagram.com/ieeewomeninengineering/" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UClrcXvuwAbpdE6o9NUXaLxA" },
    { icon: Linkedin, href: "https://www.linkedin.com/groups/7426706/profile" }
  ];
  
  return (
    <nav className="w-full bg-[#f2e9f2] text-[#7f2c82] py-1 px-4 border-t border-b border-black fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {isMobile ? (
          <div className="w-full flex flex-col items-center gap-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-[#7f2c82] hover:bg-gray-200 font-bold">
                  IEEE Menu <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ieeeLinks.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer text-[#7f2c82] hover:text-[#5a1e5d] font-bold"
                    >
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex gap-4 py-2">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#7f2c82] hover:text-[#5a1e5d] font-bold"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
            
            <a 
              href="https://ieee-collabratec.ieee.org/app/community/35/wie-global-network/activities"
              target="_blank" 
              rel="noopener noreferrer"
              className="py-2"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                WIE Global Network
              </Button>
            </a>
          </div>
        ) : (
          <>
            <ul className="flex gap-4 text-xs font-bold">
              {ieeeLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#7f2c82] hover:text-[#5a1e5d] font-bold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#7f2c82] hover:text-[#5a1e5d] font-bold"
                  >
                    <link.icon size={16} />
                  </a>
                ))}
              </div>
              
              <a 
                href="https://ieee-collabratec.ieee.org/app/community/35/wie-global-network/activities"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-3 h-auto font-bold">
                  WIE Global Network
                </Button>
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default BlackNavbar;
