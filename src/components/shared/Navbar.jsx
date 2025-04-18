import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ExternalLink,
  Search,
  Bell,
  User
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  
  // Check if the current path matches
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  // NavLink component with active state indicator
  const NavLink = ({ to, children, badge, className = "" }) => (
    <Link 
      to={to} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
        isActive(to) 
          ? "text-white" 
          : "text-gray-300 hover:text-white"
      } ${className}`}
      onClick={closeMenu}
    >
      <span className="relative z-10">{children}</span>
      {badge && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600 text-xs flex items-center justify-center">{badge}</span>
        </span>
      )}
      {isActive(to) && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></span>
      )} 
      <span className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </Link>
  );

  // Nav dropdown item
  const DropdownItem = ({ to, icon: Icon, label, description, isNew }) => (
    <Link 
      to={to}
      className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors" 
      onClick={closeMenu}
    >
      <div className="flex items-start">
        {Icon && (
          <div className="mt-0.5 bg-gray-800 p-2 rounded-md text-purple-400 mr-3">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div>
          <div className="flex items-center">
            <span className="text-white font-medium">{label}</span>
            {isNew && (
              <span className="ml-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                New
              </span>
            )}
          </div>
          {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
        </div>
      </div>
    </Link>
  );

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-gray-900/90 backdrop-blur-md shadow-lg shadow-black/10" 
        : "bg-transparent"
    }`}>
      {/* New feature announcement banner */}
      <div className="bg-gradient-to-r from-purple-800 to-blue-800 text-white text-xs text-center py-1.5 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-center">
          <Sparkles className="h-3 w-3 mr-2 text-purple-300" />
          <span>Introducing V3 — Powerful new features are coming soon!</span>
          <Link to="/v3-preview" className="ml-2 underline text-purple-200 hover:text-white font-medium flex items-center">
            Learn more <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center" onClick={closeMenu}>
              <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-white font-bold text-xl ml-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">Bannerly</span>
              <div className="relative ml-2">
                <div className="relative">
                  <button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xs font-bold text-white px-2 py-0.5 rounded flex items-center transition-all duration-300"
                  >
                    v2
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                  <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                    <div className="py-2 px-3">
                      <div className="flex items-center justify-between">
                        <span className="block text-sm font-medium text-white">Version History</span>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-gray-300 text-xs">v2.3.1 (Current)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                          <span className="flex items-center text-purple-300 text-xs font-medium">
                            v3.0.0 
                            <span className="ml-2 bg-purple-800/50 text-purple-300 text-xs px-1.5 rounded">Coming soon</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              <NavLink to="/explore">
                Explore
              </NavLink>
              
              <div className="relative group">
                <button 
                  onClick={toggleDropdown}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                    dropdownOpen ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Features 
                  {dropdownOpen ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                  <span className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
                
                <div className={`absolute z-10 left-0 w-80 mt-1 transform transition-all duration-200 origin-top-left ${
                  dropdownOpen 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible"
                }`}>
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative bg-gray-800 px-3 py-3">
                      <div className="space-y-1">
                        <DropdownItem 
                          to="/features/banners"
                          icon={Sparkles}
                          label="Social Banners"
                          description="Create stunning banners for your social profiles"
                        />
                        <DropdownItem 
                          to="/features/pfp"
                          icon={User}
                          label="AI Profile Pictures"
                          description="Generate unique avatars with our AI system"
                          isNew={true}
                        />
                        <DropdownItem 
                          to="/features/themes"
                          icon={Bell}
                          label="Themes & Templates"
                          description="Ready-to-use designs for any occasion"
                        />
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <Link 
                          to="/features"
                          className="flex items-center justify-between text-sm text-purple-400 hover:text-purple-300 font-medium"
                          onClick={closeMenu}
                        >
                          <span>View all features</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <NavLink to="/gallery">
                Gallery
              </NavLink>
              
              <NavLink to="/pricing">
                Pricing
                <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </NavLink>
              
              <NavLink to="/blog" badge="3">
                Blog
              </NavLink>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full transition-colors ${
                searchActive 
                  ? "bg-purple-700 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {searchActive && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700 transform origin-top-right transition-all duration-300 mr-4">
                <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none focus:outline-none text-white ml-2 w-full"
                    autoFocus
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400">Try: "tech banner", "developer theme"</div>
              </div>
            )}
            
            <Link 
              to="/sign-in"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/get-started" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md shadow-purple-900/20 hover:shadow-purple-900/40"
            >
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
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 animate-fadeDown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile search */}
            <div className="p-3">
              <div className="flex items-center bg-gray-800 rounded-md px-3 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none focus:outline-none text-white ml-2 w-full text-sm"
                />
              </div>
            </div>
            
            <Link
              to="/explore"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/explore') 
                  ? "text-white bg-gray-800" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={closeMenu}
            >
              Explore
            </Link>
            
            <button
              className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                dropdownOpen 
                  ? "text-white bg-gray-800" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Features</span>
              {dropdownOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {dropdownOpen && (
              <div className="pl-4 space-y-1 bg-gray-800/50 rounded-md py-2">
                <Link
                  to="/features/banners"
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  <Sparkles className="h-4 w-4 mr-3 text-purple-400" />
                  Social Banners
                </Link>
                <Link
                  to="/features/pfp"
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4 mr-3 text-purple-400" />
                  AI Profile Pictures
                  <span className="ml-2 bg-purple-600 text-white text-xs px-1.5 rounded">New</span>
                </Link>
                <Link
                  to="/features/themes"
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={closeMenu}
                >
                  <Bell className="h-4 w-4 mr-3 text-purple-400" />
                  Themes & Templates
                </Link>
              </div>
            )}
            
            <Link
              to="/gallery"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/gallery') 
                  ? "text-white bg-gray-800" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            
            <Link
              to="/pricing"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/pricing') 
                  ? "text-white bg-gray-800" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={closeMenu}
            >
              Pricing
              <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </Link>
            
            <Link
              to="/blog"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/blog') 
                  ? "text-white bg-gray-800" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={closeMenu}
            >
              Blog
              <span className="ml-2 flex h-5 w-5 items-center justify-center bg-purple-600 text-white text-xs rounded-full">3</span>
            </Link>

            <div className="pt-4 pb-2 border-t border-gray-700">
              <div className="flex flex-col px-3 gap-2">
                <Link 
                  to="/sign-in"
                  className="bg-gray-800 text-white block px-4 py-2 rounded-md text-base font-medium w-full text-center"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/get-started" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-4 py-2 rounded-md text-base font-medium w-full text-center"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeDown {
          animation: fadeDown 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;