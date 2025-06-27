import React from "react";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PencilSquareIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  StarIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Stethoscope } from "lucide-react";

const formatTimeSlot = (slot) => {
    if (!slot) return "";
    const parts = slot.replace("SLOT_", "").split("_");
    if (parts.length === 2) {
        return `${parts[0]}:00 - ${parts[1]}:00`;
    }
    return slot;
};

const AppointmentCard = ({
    appointment,
    payment,
    onFeedbackClick,
    onPrescriptionClick,
}) => {
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex justify-between items-start space-x-4">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Dr. {appointment.doctorName}
                            </h3>
                            <p className="text-sm font-medium text-blue-600">
                                {appointment.specialization}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <CalendarIcon className="h-5 w-5" />
                            <p className="text-sm">
                                {dayjs(appointment.date).format("DD MMMM, YYYY")}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-600">
                            <ClockIcon className="h-5 w-5" />
                            <p className="text-sm">
                                {formatTimeSlot(appointment.timeSlot)}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-600">
                            <Stethoscope className="h-5 w-5" />
                            <p className="text-sm">
                                {appointment.serviceName}
                            </p>
                        </div>

                        {appointment.notes && (
                            <div className="flex items-start space-x-2 text-gray-600">
                                <PencilSquareIcon className="h-5 w-5 mt-0.5" />
                                <p className="text-sm">
                                    {appointment.notes}
                                </p>
                            </div>
                        )}

                        {payment && (
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <CurrencyDollarIcon className="h-5 w-5" />
                                    <p className="text-sm font-medium">
                                        {payment.amount.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </p>
                                </div>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    payment.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : payment.status === "PAID"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                }`}>
                                    {payment.status}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    appointment.status === "PENDING"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                }`}>
                    {appointment.status}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                {appointment.status === "SCHEDULED" && (
                    <button
                        onClick={() => toast("Cancel functionality not yet implemented.")}
                        className="inline-flex items-center px-4 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 space-x-2"
                    >
                        <XCircleIcon className="h-5 w-5" />
                        <span>Cancel</span>
                    </button>
                )}
                {appointment.meetingLink && (
                    <button
                        onClick={() => window.open(appointment.meetingLink, "_blank")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 space-x-2"
                    >
                        <VideoCameraIcon className="h-5 w-5" />
                        <span>Join Meeting</span>
                    </button>
                )}
                {appointment.status === "COMPLETED" && (
                    <>
                        <button
                            onClick={onFeedbackClick}
                            className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 space-x-2"
                        >
                            <StarIcon className="h-5 w-5" />
                            <span>View Feedback</span>
                        </button>
                        <button
                            onClick={onPrescriptionClick}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 space-x-2"
                        >
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>View Prescription</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;