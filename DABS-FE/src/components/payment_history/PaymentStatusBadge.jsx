import React from "react";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";

const PaymentStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case "PAID":
                return {
                    icon: CheckCircleIcon,
                    text: "Paid",
                    bgColor: "bg-green-50",
                    textColor: "text-green-700",
                    borderColor: "border-green-200",
                    iconColor: "text-green-400"
                };
            case "PENDING":
                return {
                    icon: ClockIcon,
                    text: "Pending",
                    bgColor: "bg-yellow-50",
                    textColor: "text-yellow-700",
                    borderColor: "border-yellow-200",
                    iconColor: "text-yellow-400"
                };
            case "FAILED":
                return {
                    icon: XCircleIcon,
                    text: "Failed",
                    bgColor: "bg-red-50",
                    textColor: "text-red-700",
                    borderColor: "border-red-200",
                    iconColor: "text-red-400"
                };
            default:
                return {
                    icon: ClockIcon,
                    text: status,
                    bgColor: "bg-gray-50",
                    textColor: "text-gray-700",
                    borderColor: "border-gray-200",
                    iconColor: "text-gray-400"
                };
        }
    };

    const config = getStatusConfig(status);
    const StatusIcon = config.icon;

    return (
        <span className={`
            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            border ${config.borderColor} ${config.bgColor} ${config.textColor}
            transition-colors duration-150
        `}>
            <StatusIcon className={`w-3.5 h-3.5 mr-1.5 ${config.iconColor}`} />
            {config.text}
        </span>
    );
};

export default PaymentStatusBadge;
