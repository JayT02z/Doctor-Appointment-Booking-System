import React from 'react';
import { Users, ChevronDown } from 'lucide-react';

const GenderSelect = ({ value, onChange, error }) => (
    <div className="group relative">
        {/* Label */}
        <label
            htmlFor="gender"
            className="flex items-center gap-2 mb-1.5 text-sm font-medium text-gray-700"
        >
            <Users className="w-4 h-4 text-gray-400 group-focus-within:text-[#00B5F1] transition-colors duration-200" />
            Gender
        </label>

        {/* Select Container */}
        <div className="relative">
            <select
                id="gender"
                name="gender"
                value={value || ""}
                onChange={onChange}
                className={`
                    w-full px-4 py-2.5 pl-10 pr-10 
                    appearance-none
                    rounded-xl border border-gray-200
                    text-gray-900 
                    disabled:bg-gray-50 disabled:text-gray-500
                    transition-all duration-200
                    cursor-pointer
                    ${error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                        : 'focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10'
                    }
                `}
            >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            {/* Icons */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Users className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#00B5F1]'} transition-colors duration-200`} />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400 group-focus-within:text-[#00B5F1] transition-colors duration-200" />
            </div>

            {/* Custom Select Styles - Hover Effect */}
            <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00B5F1]/5 to-transparent"></div>
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-red-500"></span>
                {error}
            </p>
        )}
    </div>
);

export default GenderSelect;