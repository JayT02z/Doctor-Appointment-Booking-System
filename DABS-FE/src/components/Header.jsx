import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/patient/book-appointment", label: "Find Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50 
      bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm
      transition-all duration-300
      ${isScrolled ? 'shadow-md' : ''}
    `}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            <span>DABS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="
                  px-4 py-2 rounded-lg text-sm font-medium
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors duration-200
                "
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side of header */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="
                p-2 rounded-lg
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500/20
              "
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Authentication Section */}
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
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden
        `}>
          <div className="py-3 space-y-1">
            {navigationLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className="
                  block px-4 py-2 rounded-lg text-base font-medium
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors duration-200
                "
              >
                {label}
              </Link>
            ))}
            {!user && (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="
                    w-full px-4 py-2 text-base font-medium
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    rounded-lg transition-colors duration-200
                  "
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                  className="
                    w-full px-4 py-2 text-base font-medium
                    bg-primary-600 text-white
                    hover:bg-primary-700
                    rounded-lg transition-colors duration-200
                  "
                >
                  Get started
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
