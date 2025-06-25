import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5; // Number of page buttons to show
        let start = Math.max(1, currentPage - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);

        // Adjust start if we're near the end
        if (end - start + 1 < showPages) {
            start = Math.max(1, end - showPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-[#00B5F1]/10 text-gray-500 hover:text-[#00B5F1] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors duration-200"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-[#00B5F1]/10 text-gray-500 hover:text-[#00B5F1] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors duration-200"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1 mx-2">
                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                                ${currentPage === page 
                                    ? 'bg-[#00B5F1] text-white' 
                                    : 'text-gray-600 hover:bg-[#00B5F1]/10 hover:text-[#00B5F1]'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-[#00B5F1]/10 text-gray-500 hover:text-[#00B5F1] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors duration-200"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-[#00B5F1]/10 text-gray-500 hover:text-[#00B5F1] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors duration-200"
                >
                    <ChevronsRight className="h-4 w-4" />
                </button>
            </div>

            <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;
