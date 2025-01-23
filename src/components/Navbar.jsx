import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBell, 
  FaEnvelope, 
  FaCog, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="hero.jpeg" 
            alt="Logo" 
            className="h-10 w-auto mr-4 rounded-3xl"
          />
        </div>

        {/* Search Bar */}
        <div className="w-[70rem] mx-4 relative hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Icons and Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Toggle */}
          <button className="md:hidden text-gray-600">
            <FaSearch />
          </button>

          {/* Message Icon */}
          <div className="relative">
            <FaEnvelope className="text-gray-600 text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              5
            </span>
          </div>

          {/* Settings Icon */}
          <button>
            <FaCog className="text-gray-600 text-xl" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          {/* Mobile Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Items (if needed) */}
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Add menu items as needed */}
            <a href="#" className="block py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="#" className="block py-2 text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block py-2 text-gray-700 hover:bg-gray-100">Settings</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;