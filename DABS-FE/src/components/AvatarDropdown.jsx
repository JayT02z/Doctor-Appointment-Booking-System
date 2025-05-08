import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
          {getInitials(user?.name || "User")}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {user?.role === "PATIENT" && (
            <>
              <Link
                to="/patient/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </Link>
              <Link
                to="/patient/medical-history"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Medical History
              </Link>
              <Link
                to="/patient/appointments"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Appointments
              </Link>
              <Link
                to="/patient/book-appointment"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Book Appointment
              </Link>
            </>
          )}

          {user?.role === "DOCTOR" && (
              <>
                <Link
                    to="/doctor/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Doctor Dashboard
                </Link>
                <Link
                    to="/doctor/information"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Information
                </Link>
                <Link to={`/doctor/services`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Services
                </Link>
                <Link to={`/doctor/schedule`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Schedule
                </Link>
              </>
          )}

          {user?.role === "ADMIN" && (
              <>
                <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin Dashboard
                </Link>
                <Link
                    to="/admin/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Services
                </Link>
              </>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
