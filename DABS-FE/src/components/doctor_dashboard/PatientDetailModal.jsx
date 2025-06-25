import React from 'react';
import Modal from 'react-modal';
import { formatDOB } from '../../utils/format';

Modal.setAppElement('#root');

const PatientDetailModal = ({ isOpen, onClose, patient }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md outline-none border-t-4 border-[#00B5F1]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#00B5F1]">Patient Details</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-[#00B5F1] transition-colors duration-200 focus:outline-none"
                >
                    <svg className="h-6 w-6 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
            {patient && (
                <div className="space-y-4">
                    <div className="bg-[#00B5F1] bg-opacity-5 p-4 rounded-xl">
                        <div className="grid gap-4">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Full Name</span>
                                <span className="text-lg font-semibold text-gray-800">{patient.fullName}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Date of Birth</span>
                                    <span className="font-medium text-gray-800">{formatDOB(patient.dob)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Gender</span>
                                    <span className="font-medium text-gray-800">{patient.gender}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Email</span>
                                <span className="font-medium text-gray-800">{patient.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Address</span>
                                <span className="font-medium text-gray-800">{patient.address}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Medical History</span>
                                <span className="font-medium text-gray-800 whitespace-pre-wrap">{patient.medicalHistory}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-end mt-6">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-[#00B5F1] text-white rounded-lg hover:bg-[#009cd3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-50"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default PatientDetailModal;
