import React from 'react';
import Modal from 'react-modal';
import { X, FileText, Clock, Pill, CalendarClock, User, Stethoscope } from 'lucide-react';

Modal.setAppElement('#root');

const ViewPrescriptionModal = ({ isOpen, onClose, prescription }) => {
    const formatFrequency = (freq) => {
        switch (freq) {
            case 'ONCE': return 'Once a day';
            case 'TWICE': return 'Twice a day';
            case 'THREE_TIMES': return 'Three times a day';
            case 'FOUR_TIMES': return 'Four times a day';
            default: return freq;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl outline-none border-t-4 border-[#00B5F1]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-[#00B5F1]" />
                    <h2 className="text-2xl font-bold text-gray-900">Prescription Details</h2>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-[#00B5F1] transition-colors duration-200 focus:outline-none rounded-full p-1 hover:bg-gray-100"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {prescription && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Pill className="h-4 w-4 text-[#00B5F1]" />
                                Dosage
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{prescription.dosage}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 text-[#00B5F1]" />
                                Duration
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{prescription.duration} days</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CalendarClock className="h-4 w-4 text-[#00B5F1]" />
                            Frequency
                        </div>
                        <p className="font-medium text-gray-900">{formatFrequency(prescription.frequency)}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FileText className="h-4 w-4 text-[#00B5F1]" />
                            Description
                        </div>
                        <p className="font-medium text-gray-900 whitespace-pre-wrap">{prescription.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Stethoscope className="h-4 w-4 text-[#00B5F1]" />
                                Doctor
                            </div>
                            <p className="font-medium text-gray-900">{prescription.doctorName}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <User className="h-4 w-4 text-[#00B5F1]" />
                                Patient
                            </div>
                            <p className="font-medium text-gray-900">{prescription.patientName}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Pill className="h-4 w-4 text-[#00B5F1]" />
                            Medicines
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {prescription.medicineNames?.map((medicine, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                                >
                                    {medicine}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
                <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#00B5F1] text-white rounded-lg hover:bg-[#009cd3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-50 font-medium"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ViewPrescriptionModal;