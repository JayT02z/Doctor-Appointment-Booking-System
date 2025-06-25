// doctor-dashboard/components/AppointmentCard.jsx
import React, { useState } from 'react';
import { formatTimeSlot } from '../../utils/format';
import { Calendar, Clock, Stethoscope, FileText, User, MessageCircle, Check, X, Loader2, ClipboardList } from 'lucide-react';

const AppointmentCard = ({ appointment, activeTab, onUpdateStatus, onOpenPatientDetail, onOpenPrescription, onViewPrescription, onViewFeedback }) => {
    const { patientName, date, timeSlot, serviceName, specialization, notes, status, id } = appointment;
    const [loadingAction, setLoadingAction] = useState(null);

    const handleStatusUpdate = async (newStatus) => {
        setLoadingAction(newStatus);
        await onUpdateStatus(id, newStatus);
        setLoadingAction(null);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "CONFIRMED":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "COMPLETED":
                return "bg-green-50 text-green-700 border-green-200";
            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="p-5 space-y-4">
                {/* Header with Status */}
                <div className="flex justify-between items-start">
                    <button
                        onClick={onOpenPatientDetail}
                        className="group flex items-center gap-2 hover:text-[#00B5F1] transition-colors duration-200"
                    >
                        <User className="h-5 w-5 text-[#00B5F1]" />
                        <h3 className="text-lg font-semibold group-hover:text-[#00B5F1] transition-colors duration-200">
                            {patientName.fullName}
                        </h3>
                    </button>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(status)}`}>
                        {status}
                    </span>
                </div>

                {/* Appointment Details */}
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-[#00B5F1]" />
                        <span>{date?.join("-")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-[#00B5F1]" />
                        <span>{formatTimeSlot(timeSlot)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Stethoscope className="h-4 w-4 text-[#00B5F1]" />
                        <span>{serviceName} - {specialization}</span>
                    </div>
                    {notes && (
                        <div className="flex items-start gap-2 text-gray-600 mt-1">
                            <ClipboardList className="h-4 w-4 text-[#00B5F1] mt-0.5" />
                            <p className="flex-1">{notes}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons - using existing updated code */}
                <div className="mt-4 flex justify-end">
                    {status === "CONFIRMED" && (
                        <button
                            onClick={onOpenPrescription}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                        >
                            Send Prescription
                        </button>
                    )}

                    {["today", "upcoming"].includes(activeTab) && status === "PENDING" && (
                        <div className="mt-4 pt-4 flex justify-end gap-2 border-t border-gray-100">
                            <button
                                onClick={() => handleStatusUpdate("CANCELLED")}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 text-sm font-medium disabled:opacity-50"
                                disabled={!!loadingAction}
                            >
                                {loadingAction === "CANCELLED" ? (
                                    <span className="animate-spin">
                                        <Loader2 className="h-4 w-4" />
                                    </span>
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                                Reject
                            </button>
                            <button
                                onClick={() => handleStatusUpdate("CONFIRMED")}
                                className="flex items-center gap-2 px-4 py-2 bg-[#00B5F1] text-white hover:bg-[#009cd3] rounded-lg transition-all duration-200 text-sm font-medium disabled:opacity-50 shadow-sm hover:shadow"
                                disabled={!!loadingAction}
                            >
                                {loadingAction === "CONFIRMED" ? (
                                    <span className="animate-spin">
                                        <Loader2 className="h-4 w-4" />
                                    </span>
                                ) : (
                                    <Check className="h-4 w-4" />
                                )}
                                Accept
                            </button>
                        </div>
                    )}

                    {status === "COMPLETED" && (
                        <div className="mt-4 pt-4 flex justify-end gap-2 border-t border-gray-100">
                            <button
                                onClick={onViewFeedback}
                                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition-all duration-200 text-sm font-medium"
                            >
                                <MessageCircle className="h-4 w-4" />
                                View Feedback
                            </button>
                            <button
                                onClick={onViewPrescription}
                                className="flex items-center gap-2 px-4 py-2 bg-[#00B5F1] bg-opacity-10 text-[#00B5F1] hover:bg-opacity-20 rounded-lg transition-all duration-200 text-sm font-medium"
                            >
                                <FileText className="h-4 w-4" />
                                View Prescription
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;