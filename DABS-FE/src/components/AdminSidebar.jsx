import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ChartBarIcon,
    UserCircleIcon,
    CalendarIcon,
    CreditCardIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
    { to: "/admin/dashboard", icon: ChartBarIcon, label: "Dashboard" },
    { to: "/admin/manage-users", icon: UserCircleIcon, label: "User Management" },
    { to: "/admin/manage-appointments", icon: CalendarIcon, label: "Appointments" },
    { to: "/admin/manage-patients", icon: UserCircleIcon, label: "Patients" },
    { to: "/admin/manage-doctors", icon: UserCircleIcon, label: "Doctors" },
    { to: "/admin/manage-payments", icon: CreditCardIcon, label: "Payments" },
    { to: "/admin/services", icon: BuildingOfficeIcon, label: "Services" },
    { to: "/admin/chat", icon: ChatBubbleLeftRightIcon, label: "Chat" }
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-white fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-gray-200 shadow-lg z-40">
            <div className="px-3 py-4 h-full overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.to;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl
                  transition-all duration-200
                  ${isActive
                                    ? 'bg-[#00B5F1] text-white'
                                    : 'text-gray-600 hover:bg-gray-50'}
                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}