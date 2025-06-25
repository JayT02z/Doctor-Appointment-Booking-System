import React from 'react';
import { ChevronDown, Clock, Check, HourglassIcon, Filter } from 'lucide-react';

const StatusFilter = ({ value, onChange }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    color: 'text-amber-600',
                    bgColor: 'bg-amber-50',
                    borderColor: 'border-amber-200',
                    icon: <HourglassIcon className="h-4 w-4" />
                };
            case 'CONFIRMED':
                return {
                    color: 'text-emerald-600',
                    bgColor: 'bg-emerald-50',
                    borderColor: 'border-emerald-200',
                    icon: <Check className="h-4 w-4" />
                };
            default:
                return {
                    color: 'text-[#00B5F1]',
                    bgColor: 'bg-[#00B5F1]/5',
                    borderColor: 'border-[#00B5F1]/20',
                    icon: <Clock className="h-4 w-4" />
                };
        }
    };

    return (
        <div className="mb-6">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-[#00B5F1]/10 rounded-lg">
                    <Filter className="h-4 w-4 text-[#00B5F1]" />
                </div>
                <label className="text-sm font-medium text-gray-700">Filter by Status</label>
            </div>

            {/* Select Container */}
            <div className="relative group">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-white pl-11 pr-10 py-3 rounded-xl border border-gray-200
                             focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                             group-hover:border-[#00B5F1]/50 group-hover:shadow-sm
                             transition-all duration-200 cursor-pointer text-sm font-medium"
                >
                    {['ALL', 'PENDING', 'CONFIRMED'].map((status) => {
                        const config = getStatusConfig(status);
                        return (
                            <option
                                key={status}
                                value={status}
                                className={`font-medium ${config.color}`}
                            >
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                            </option>
                        );
                    })}
                </select>

                {/* Right Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#00B5F1] transition-colors duration-200" />
                </div>

                {/* Left Icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    {value !== 'ALL' ? (
                        <div className={`p-1 ${getStatusConfig(value).bgColor} rounded-md transition-colors duration-200`}>
                            {getStatusConfig(value).icon}
                        </div>
                    ) : (
                        <div className="p-1 bg-[#00B5F1]/5 rounded-md">
                            <Clock className="h-4 w-4 text-[#00B5F1]" />
                        </div>
                    )}
                </div>

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00B5F1]/5 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default StatusFilter;