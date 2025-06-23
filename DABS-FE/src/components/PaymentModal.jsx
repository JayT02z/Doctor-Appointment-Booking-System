// PaymentModal.jsx
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const PaymentModal = ({
                          isOpen,
                          paymentData,
                          selectedServicePrice,
                          onPaymentMethodChange,
                          onPay,
                          onCancel,
                          onConfirmCancel,
                          onCloseCancelConfirm,
                          showCancelConfirm,
                      }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-[#00B5F1] to-[#0288D1] px-6 py-8 text-white">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.11 3.89 21 5 21H11V19H5V3H13V9H21Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <Dialog.Title className="text-2xl font-bold text-center">
                                            Thông tin thanh toán
                                        </Dialog.Title>
                                        <p className="text-center text-white/80 mt-2">
                                            Xác nhận chi tiết thanh toán của bạn
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="px-6 py-6">
                                        {/* Price Display */}
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6 border border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 font-medium">Tổng tiền:</span>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-[#00B5F1]">
                                                        {selectedServicePrice.toLocaleString('vi-VN')}
                                                    </span>
                                                    <span className="text-gray-500 ml-1">VND</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Method */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Phương thức thanh toán
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={paymentData.paymentMethod}
                                                    onChange={(e) => onPaymentMethodChange(e.target.value)}
                                                    className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1]/20 transition-all duration-200"
                                                >
                                                    <option value="CASH">💵 Tiền mặt</option>
                                                    <option value="VNPAYQR">📱 VNPAYQR</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={onCancel}
                                                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                type="button"
                                                onClick={onPay}
                                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00B5F1] to-[#0288D1] text-white rounded-xl font-semibold hover:from-[#0288D1] hover:to-[#0277BD] transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/30 shadow-lg"
                                            >
                                                Xác nhận thanh toán
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Cancel Confirmation Modal */}
            <Transition appear show={showCancelConfirm} as={Fragment}>
                <Dialog as="div" className="relative z-[60]" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                                    <div className="p-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="bg-red-100 rounded-full p-3">
                                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                                            Xác nhận hủy
                                        </h3>
                                        <p className="text-gray-600 text-center mb-6">
                                            Bạn có chắc chắn muốn hủy thanh toán không?
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={onCloseCancelConfirm}
                                                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                                            >
                                                Không
                                            </button>
                                            <button
                                                onClick={onConfirmCancel}
                                                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                                            >
                                                Có, hủy
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default PaymentModal;