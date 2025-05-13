import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            DABS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <Link
              to="/patient/book-appointment"
              className="text-gray-600 hover:text-primary-600"
            >
              Find Doctors
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600">
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary-600"
            >
              Contact
            </Link>
          </div>

          {/* Right side of header */}
          <div className="flex items-center space-x-4">
            {/* Show AvatarDropdown when logged in */}
            {user ? (
              <AvatarDropdown />
            ) : (
              /* Show Auth Buttons when not logged in */
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-600 hover:text-primary-600"
              onClick={handleMenuToggle}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className="block text-gray-600 hover:text-primary-600"
              onClick={handleMenuToggle}
            >
              Find Doctors
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 hover:text-primary-600"
              onClick={handleMenuToggle}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 hover:text-primary-600"
              onClick={handleMenuToggle}
            >
              Contact
            </Link>
            {/* Mobile Auth Buttons - Only show when not logged in */}
            {!user && (
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    handleMenuToggle();
                  }}
                  className="w-full px-4 py-2 text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    handleMenuToggle();
                  }}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
