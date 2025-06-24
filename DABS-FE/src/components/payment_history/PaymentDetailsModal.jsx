import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, DocumentTextIcon, UserIcon, ClockIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import PaymentStatusBadge from "./PaymentStatusBadge";
import PaymentMethodBadge from "./PaymentMethodBadge";

const PaymentDetailsModal = ({ isOpen, onClose, payment }) => {
    if (!payment) return null;

    const appointment = payment.appointment || {};
    const patient = appointment.patientName || {};

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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
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
                                                Chi tiết thanh toán
                                            </Dialog.Title>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">Mã giao dịch</span>
                                                    <span className="text-sm font-medium">#{payment.id}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">Số tiền</span>
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        {payment.amount?.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2">
                                                    <PaymentMethodBadge method={payment.paymentMethod} />
                                                    <PaymentStatusBadge status={payment.status} />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3">
                                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Bệnh nhân</p>
                                                        <p className="text-sm font-medium text-gray-900">{patient.username}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Bác sĩ</p>
                                                        <p className="text-sm font-medium text-gray-900">{appointment.doctorName}</p>
                                                        <p className="text-sm text-gray-500">{appointment.serviceName}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <ClockIcon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Thời gian khám</p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {appointment.date?.join("/")}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {appointment.timeSlot?.replace("SLOT_", "").replace("_", ":00 - ") + ":00"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Thời gian thanh toán</p>
                                                        <p className="text-sm font-medium text-gray-900">{payment.createdAt}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 flex justify-end">
                                        <button
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            Đóng
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

export default PaymentDetailsModal;