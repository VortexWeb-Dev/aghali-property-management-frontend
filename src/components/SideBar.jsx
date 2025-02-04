import { Menu, X } from "lucide-react";
import { useState } from "react";
import { links } from "../dummyData/data";
import SidebarLink from "./SideBarLink";

const SideBar = ({ isOpen, toggleSidebar }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    return (
      <div className={`sticky top-0 left-0 bottom-0 h-full bg-gray-800 text-white transition-all duration-300
        ${isOpen ? 'w-64' : 'w-30 text-center'} md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className={`font-bold ${isOpen ? 'block' : 'hidden md:block'}`}>Dashboard</h1>
          <button onClick={toggleSidebar} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav className="mt-8 min-h-screen w-64 overflow-hidden">
          {links.map((link, index) => (
            <SidebarLink 
              key={index} 
              {...link} 
              isOpen={isOpen} 
              isActive={index === activeIndex} 
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </nav>
      </div>
    );
};

export default SideBar;
