import React from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

/**
 * Dropdown lọc lịch hẹn theo trạng thái
 * @param {string} statusFilter - Trạng thái đang được chọn
 * @param {Function} setStatusFilter - Hàm thay đổi trạng thái lọc
 */
const StatusFilter = ({ statusFilter, setStatusFilter, className = "" }) => {
    const statusOptions = [
        { value: "ALL", label: "All Appointments" },
        { value: "PENDING", label: "Pending" },
        { value: "CONFIRMED", label: "Confirmed" },
        { value: "COMPLETED", label: "Completed" },
        { value: "CANCELLED", label: "Cancelled" }
    ];

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                    block w-full pl-10 pr-10 py-2
                    text-sm text-gray-900
                    bg-white border border-gray-200
                    rounded-lg
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    appearance-none
                    cursor-pointer
                    transition-colors duration-200
                "
            >
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default StatusFilter;