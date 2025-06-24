import React from "react";
import {
    FaCreditCard,
    FaMoneyBillWave,
    FaUniversity,
    FaQrcode,
    FaMobile,
} from "react-icons/fa";

const PaymentMethodBadge = ({ method }) => {
    const getMethodConfig = (method) => {
        switch (method) {
            case "VNPAYQR":
                return {
                    icon: FaQrcode,
                    text: "VNPAY QR",
                    bgColor: "bg-blue-50",
                    textColor: "text-blue-700",
                    iconColor: "text-blue-500",
                    borderColor: "border-blue-100",
                };
            case "CASH":
                return {
                    icon: FaMoneyBillWave,
                    text: "Cash",
                    bgColor: "bg-emerald-50",
                    textColor: "text-emerald-700",
                    iconColor: "text-emerald-500",
                    borderColor: "border-emerald-100",
                };
            case "BANKING":
                return {
                    icon: FaUniversity,
                    text: "Bank Transfer",
                    bgColor: "bg-violet-50",
                    textColor: "text-violet-700",
                    iconColor: "text-violet-500",
                    borderColor: "border-violet-100",
                };
            case "MOMO":
                return {
                    icon: FaMobile,
                    text: "MoMo",
                    bgColor: "bg-pink-50",
                    textColor: "text-pink-700",
                    iconColor: "text-pink-500",
                    borderColor: "border-pink-100",
                };
            case "CREDIT_CARD":
                return {
                    icon: FaCreditCard,
                    text: "Credit Card",
                    bgColor: "bg-indigo-50",
                    textColor: "text-indigo-700",
                    iconColor: "text-indigo-500",
                    borderColor: "border-indigo-100",
                };
            default:
                return {
                    icon: FaCreditCard,
                    text: method,
                    bgColor: "bg-gray-50",
                    textColor: "text-gray-700",
                    iconColor: "text-gray-500",
                    borderColor: "border-gray-100",
                };
        }
    };

    const config = getMethodConfig(method);
    const Icon = config.icon;

    return (
        <span
            className={`
            inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md
            border ${config.borderColor} ${config.bgColor} ${config.textColor}
            transition-colors duration-150
        `}
        >
            <Icon className={`h-3 w-3 ${config.iconColor}`} />
            {config.text}
        </span>
    );
};

export default PaymentMethodBadge;
