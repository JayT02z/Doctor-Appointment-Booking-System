// components/admin/AppointmentDetailModal.jsx
import React from "react";
import { formatTimeSlot, formatDate } from "../utils/format.js";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User2, Stethoscope, FileText, CheckCircle, ClipboardList, X } from 'lucide-react';

const AppointmentDetailModal = ({ isOpen, onClose, appointment }) => {
    if (!isOpen || !appointment) return null;

    const { id, doctorName, serviceName, date, timeSlot, status, notes, patientName, specialization } = appointment;

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'PENDING':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'CANCELLED':
                return 'bg-red-50 text-red-600 border-red-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="min-h-screen px-4 flex items-center justify-center">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                                            <ClipboardList className="h-6 w-6 text-[#00B5F1]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Appointment #{id}
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                View appointment details
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Status Badge */}
                                <div className="flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
                                        {status}
                                    </span>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <User2 className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Patient</p>
                                                <p className="font-medium text-gray-900">{patientName?.fullName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Doctor</p>
                                                <p className="font-medium text-gray-900">{doctorName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Service</p>
                                                <p className="font-medium text-gray-900">{serviceName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-medium text-gray-900">{formatDate(date)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Time</p>
                                                <p className="font-medium text-gray-900">{formatTimeSlot(timeSlot)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-[#00B5F1]" />
                                            <div>
                                                <p className="text-sm text-gray-500">Specialization</p>
                                                <p className="font-medium text-gray-900">{specialization}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                {notes && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500 mb-2">Notes</p>
                                        <p className="text-gray-700">{notes}</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200
                                             hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AppointmentDetailModal;