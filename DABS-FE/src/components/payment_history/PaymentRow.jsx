import React from "react";
import PaymentStatusBadge from "./PaymentStatusBadge";
import PaymentMethodBadge from "./PaymentMethodBadge";
import { EyeIcon } from "@heroicons/react/24/outline";

const formatCurrency = (amount) =>
    amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });

const formatDate = (dateArr) => {
    if (!dateArr || dateArr.length < 3) return "N/A";
    const [year, month, day] = dateArr;
    return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
};

/**
 * Dòng trong bảng thanh toán (rút gọn + nút xem chi tiết)
 * @param {object} payment
 * @param {Function} onViewDetails
 */
const PaymentRow = ({ payment, onViewDetails }) => {
    const appointment = payment.appointment || {};

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                #{payment.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                            {appointment.doctorName?.charAt(0) || "D"}
                        </span>
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                            {appointment.doctorName}
                        </div>
                        <div className="text-xs text-gray-500">
                            {appointment.specialization}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {formatDate(appointment.date)}
                </div>
                <div className="text-xs text-gray-500">
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(payment.amount)}
                </div>
                <PaymentMethodBadge method={payment.paymentMethod} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <PaymentStatusBadge status={payment.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                    onClick={() => onViewDetails(payment)}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                >
                    <EyeIcon className="w-4 h-4 mr-1.5" />
                    View Details
                </button>
            </td>
        </tr>
    );
};

export default PaymentRow;