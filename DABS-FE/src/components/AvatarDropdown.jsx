import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutId = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
          "http://localhost:8080/api/v1/auth/logout",
          {},
          { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  const getInitials = (name) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
  };

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

    const menuItems = {
        PATIENT: [
            { to: "/patient/profile", icon: UserCircleIcon, label: "Profile Settings" },
            { to: "/patient/appointments", icon: CalendarIcon, label: "My Appointments" },
            { to: "/patient/book-appointment", icon: ClockIcon, label: "Book Appointment" },
            { to: "/patient/payment", icon: CreditCardIcon, label: "Payment History" }
        ],
        DOCTOR: [
            { to: "/doctor/dashboard", icon: ChartBarIcon, label: "Doctor Dashboard" },
            { to: "/doctor/information", icon: UserCircleIcon, label: "Information" },
            { to: "/doctor/services", icon: ClipboardDocumentListIcon, label: "Services" },
            { to: "/doctor/schedule", icon: CalendarIcon, label: "Schedule" }
        ],
        ADMIN: [
            { to: "/admin/dashboard", icon: ChartBarIcon, label: "Admin Dashboard" },
            { to: "/admin/manage-users", icon: UserCircleIcon, label: "User Management" },
            { to: "/admin/manage-appointments", icon: CalendarIcon, label: "Appointments Management" },
            { to : "/admin/manage-patients", icon: UserCircleIcon, label: "Patients Management" },
            { to: "/admin/manage-doctors", icon: UserCircleIcon, label: "Doctors Management" },
            { to: "/admin/manage-payments", icon: CreditCardIcon, label: "Payment Management" },
            { to: "/admin/services", icon: BuildingOfficeIcon, label: "Services" },
            { to: "/admin/chat", icon: ChatBubbleLeftRightIcon, label: "Chat Management" }
        ]
    };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center space-x-2 focus:outline-none group"
      >
        <div className="
          w-10 h-10 rounded-full
          bg-gradient-to-br from-blue-500 to-blue-600
          flex items-center justify-center
          text-white font-medium
          ring-2 ring-white
          shadow-sm
          transition-transform duration-200
          group-hover:scale-105
        ">
          {getInitials(user?.name || "User")}
        </div>
      </button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-56
          bg-white rounded-xl
          shadow-lg ring-1 ring-black ring-opacity-5
          divide-y divide-gray-100
          transform opacity-100 scale-100
          transition duration-200 ease-out
          z-50
        ">
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user?.email}
            </p>
          </div>

          <div className="py-1">
            {menuItems[user?.role]?.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className="
                    flex items-center px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-50 transition-colors duration-150
                    group
                  "
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="py-1">
            <button
              onClick={handleLogout}
              className="
                flex items-center w-full px-4 py-2 text-sm text-red-600
                hover:bg-red-50 transition-colors duration-150
                group
              "
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-red-400 group-hover:text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
