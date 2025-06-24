import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * Thanh tìm kiếm trong danh sách thanh toán
 * @param {string} keyword - Giá trị đang nhập
 * @param {Function} setKeyword - Hàm cập nhật keyword
 */
const SearchBar = ({ keyword, setKeyword }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by code, doctor, patient..."
                className="
                    w-full pl-10 pr-4 py-2.5
                    text-sm text-gray-900 placeholder:text-gray-500
                    bg-white border border-gray-200 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    transition-colors duration-200
                "
            />
        </div>
    );
};

export default SearchBar;