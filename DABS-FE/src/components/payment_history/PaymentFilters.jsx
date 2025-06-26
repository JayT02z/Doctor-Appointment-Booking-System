import React from "react";
import { FunnelIcon, CreditCardIcon } from "@heroicons/react/24/outline";

/**
 * Bộ lọc trạng thái thanh toán & phương thức thanh toán
 * @param {string} statusFilter
 * @param {Function} setStatusFilter
 * @param {string} methodFilter
 * @param {Function} setMethodFilter
 */
const PaymentFilters = ({
    statusFilter,
    setStatusFilter,
    methodFilter,
    setMethodFilter,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="
                        pl-10 pr-10 py-2
                        appearance-none
                        bg-white text-sm text-gray-900
                        rounded-lg border border-gray-200
                        focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        cursor-pointer
                        transition-colors duration-200
                    "
                >
                    <option value="ALL">Tất cả</option>
                    <option value="PAID">Đã thanh toán</option>
                    <option value="PENDING">Đang xử lý</option>
                    <option value="FAILED">Thất bại</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCardIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="
                        pl-10 pr-10 py-2
                        appearance-none
                        bg-white text-sm text-gray-900
                        rounded-lg border border-gray-200
                        focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        cursor-pointer
                        transition-colors duration-200
                    "
                >
                    <option value="ALL">Tất cả</option>
                    <option value="VNPAYQR">VNPAY QR</option>
                    <option value="CASH">Tiền mặt</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PaymentFilters;