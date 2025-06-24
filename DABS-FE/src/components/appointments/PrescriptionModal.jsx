import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const PrescriptionModal = ({ isOpen, prescription, onClose }) => {
    if (!isOpen || !prescription) return null;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                <div className="relative">
                                    <div className="absolute right-4 top-4">
                                        <button
                                            onClick={onClose}
                                            className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="px-6 pt-6 pb-4">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <Dialog.Title className="text-xl font-bold text-gray-900">
                                                Prescription Details
                                            </Dialog.Title>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">
                                                        Doctor
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900">
                                                        {prescription.doctorName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">
                                                        Patient
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900">
                                                        {prescription.patientName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">
                                                        Duration
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900">
                                                        {prescription.duration}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">
                                                        Dosage
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900">
                                                        {prescription.dosage}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">
                                                        Frequency
                                                    </label>
                                                    <p className="mt-1 text-sm text-gray-900">
                                                        {prescription.frequency}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500">
                                                    Medicines
                                                </label>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {prescription.medicineNames.map(
                                                        (medicine, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                                            >
                                                                {medicine}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-500">
                                                    Description
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                                                    {prescription.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PrescriptionModal;
