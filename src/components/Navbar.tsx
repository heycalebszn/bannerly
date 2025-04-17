import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-bold text-xl">Bannerly</span>
              <div className="relative ml-2 group">
                <button 
                  className="bg-purple-600 text-xs font-bold text-white px-2 py-0.5 rounded flex items-center hover:bg-purple-700"
                >
                  v2
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                <div className="absolute z-10 mt-1 w-24 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <div className="py-1">
                    <span className="block px-3 py-1 text-xs text-gray-300">v2 (Current)</span>
                    <span className="block px-3 py-1 text-xs text-gray-400">v3 (Coming Soon)</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
            //   to="/explore" 
            to="/explore"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Explore
              </Link>
              
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Features <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link 
                        // to="/features/banners" 
                        to="/coming-soon"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" 
                        onClick={closeMenu}
                      >
                        Social Banners
                      </Link>
                      <Link 
                        // to="/features/pfp" 
                        to="/coming-soon"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" 
                        onClick={closeMenu}
                      >
                        AI Profile Pictures
                      </Link>
                      <Link 
                        // to="/features/themes" 
                        to="/coming-soon"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" 
                        onClick={closeMenu}
                      >
                        Themes & Templates
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
              // to="/examples" 
              to="/gallery"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Gallery
              </Link>
              
              <div className="relative">
                <Link 
                // to="/pricing" 
                to="/coming-soon"
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Pricing
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                    Coming Soon
                  </span>
                </Link>
              </div>
              
              <Link 
              // to="/blog" 
              to="/blog"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </Link>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
            // to="/login" 
            to="/sign-in"
            className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Sign In
            </Link>
            <Link to="/get-started" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/explore"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              Explore
            </Link>
            
            <button
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Features
              <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            
            {dropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link
                //   to="/features/banners"
                to="/coming-soon"
                className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                onClick={closeMenu}
                >
                  Social Banners
                </Link>
                <Link
                //   to="/features/pfp"
                to="/coming-soon"
                className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                onClick={closeMenu}
                >
                  AI Profile Pictures
                </Link>
                <Link
                //   to="/features/themes"
                to="/coming-soon"
                className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                onClick={closeMenu}
                >
                  Themes & Templates
                </Link>
              </div>
            )}
            
            <Link
            //   to="/examples"
            to="/gallery"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
            >
              Gallery
            </Link>
            
            <Link
            //   to="/pricing" 
            to="/coming-soon"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
            >
              Pricing
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                Coming Soon
              </span>
            </Link>
            
            <Link
            //   to="/blog" 
            to="/blog"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
            >
              Blog
            </Link>

            <div className="pt-4 pb-2 border-t border-gray-700">
              <div className="flex items-center px-3">
                <Link 
                //   to="/login" 
                to="/coming-soon"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/get-started" 
                  className="bg-purple-600 hover:bg-purple-700 text-white block px-4 py-2 rounded-md text-base font-medium ml-2"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;