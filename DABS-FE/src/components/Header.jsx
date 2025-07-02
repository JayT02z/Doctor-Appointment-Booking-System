import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Home, Search, Info, PhoneCall, BarChart2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavigationLinks = () => {
    const baseNavigation = [
      { to: "/", label: "Home", icon: Home },
      { to: "/about", label: "About", icon: Info },
      { to: "/contact", label: "Contact", icon: PhoneCall },
    ];
    if (!user || (user && user.role === 'PATIENT')) {
      baseNavigation.splice(1, 0, {
        to: "/patient/book-appointment",
        label: "Find Doctors",
        icon: Search
      });
    }
    if (user && user.role === 'ADMIN') {
      baseNavigation.push({
        to: "/admin/dashboard",
        icon: BarChart2,
        label: "Admin Dashboard"
      });
    }
    return baseNavigation;
  };

  const navigationLinks = getNavigationLinks();
  const currentPath = location.pathname;

  return (
      <header className={`
      fixed top-0 left-0 w-full z-50 
      bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm
      transition-all duration-300
      ${isScrolled ? 'shadow-md' : ''}
    `}>
        <nav className="w-full max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 overflow-x-clip">
          {/* Logo */}
          <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            <span>DABS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map(({ to, label, icon: Icon }) => {
              const isActive = currentPath === to;
              return (
                  <Link
                      key={to}
                      to={to}
                      className={`
                  group relative px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200 ease-in-out
                  hover:text-[#00B5F1]
                  ${isActive
                          ? 'text-[#00B5F1] bg-blue-50/50'
                          : 'text-gray-700 hover:bg-blue-50/50'
                      }
                `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 transition-all duration-200
                    ${isActive ? 'text-[#00B5F1]' : 'text-gray-400 group-hover:text-[#00B5F1]'}
                  `} />
                      <span>{label}</span>
                    </div>
                    {isActive && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#00B5F1] rounded-full" />
                    )}
                  </Link>
              );
            })}
          </div>

          {/* Right side of header */}
          <div className="flex items-center space-x-4">
            {user ? (
                <AvatarDropdown />
            ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                      onClick={() => navigate("/login")}
                      className="
                  px-4 py-2 text-sm font-medium
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  rounded-lg transition-colors duration-200
                "
                  >
                    Sign in
                  </button>
                  <button
                      onClick={() => navigate("/register")}
                      className="
                  px-4 py-2 text-sm font-medium
                  bg-primary-600 text-white
                  hover:bg-primary-700
                  rounded-lg transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                "
                  >
                    Get started
                  </button>
                </div>
            )}

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="
              md:hidden p-2 rounded-lg
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500/20
            "
            >
              {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
              ) : (
                  <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`
        md:hidden fixed inset-0 z-[999] bg-black/40
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{overflowX:'clip'}}>
          <div
              className="absolute inset-0"
              onClick={() => setIsMenuOpen(false)}
              style={{zIndex:1}}
          />
          <div className="relative w-64 max-w-full h-full bg-white dark:bg-gray-800 shadow-xl z-10">
            <div className="p-6 space-y-4">
              {navigationLinks.map(({ to, label, icon: Icon }) => {
                const isActive = currentPath === to;
                return (
                    <Link
                        key={to}
                        to={to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isActive
                            ? 'text-[#00B5F1] bg-blue-50/50'
                            : 'text-gray-700 hover:bg-blue-50/50 hover:text-[#00B5F1]'
                        }
                  `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#00B5F1]' : 'text-gray-400'}`} />
                      {label}
                    </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
