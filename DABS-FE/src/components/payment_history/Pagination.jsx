import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <nav
            className="flex items-center justify-center mt-6 gap-2"
            aria-label="Pagination"
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                    inline-flex items-center p-2 rounded-lg
                    ${
                        currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                    transition-colors duration-200
                `}
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            typeof page === "number" ? onPageChange(page) : null
                        }
                        disabled={typeof page !== "number"}
                        className={`
                            min-w-[2.25rem] h-9 px-2
                            inline-flex items-center justify-center
                            text-sm font-medium rounded-lg
                            ${
                                typeof page !== "number"
                                    ? "text-gray-500 cursor-default"
                                    : page === currentPage
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-700 hover:bg-gray-100"
                            }
                            transition-colors duration-200
                        `}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                    inline-flex items-center p-2 rounded-lg
                    ${
                        currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                    transition-colors duration-200
                `}
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </nav>
    );
};

export default Pagination;