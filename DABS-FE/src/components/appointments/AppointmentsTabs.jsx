import React from "react";
import { CalendarDaysIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

const AppointmentsTabs = ({ activeTab, setActiveTab, className = "" }) => {
    const tabs = [
        { id: "today", label: "Today", icon: ClockIcon },
        { id: "upcoming", label: "Upcoming", icon: CalendarIcon },
        { id: "past", label: "Past", icon: CalendarDaysIcon },
    ];

    return (
        <nav className={`flex rounded-lg ${className}`} role="tablist">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center justify-center flex-1 px-4 py-2.5 text-sm font-medium
                            transition-all duration-200 rounded-lg
                            ${activeTab === tab.id
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                            }
                        `}
                    >
                        <Icon className="h-4 w-4 mr-2 -ml-0.5" />
                        {tab.label}
                    </button>
                );
            })}
        </nav>
    );
};

export default AppointmentsTabs;