import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search appointments..." }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200
                         focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                         hover:border-[#00B5F1]/50
                         transition-all duration-200 text-sm placeholder:text-gray-400"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#00B5F1]"
                >
                    <span className="text-xl leading-none">&times;</span>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
