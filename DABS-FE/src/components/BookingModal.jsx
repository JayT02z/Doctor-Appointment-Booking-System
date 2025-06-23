// BookingModal.jsx
import React from 'react';
import { Dialog } from '@headlessui/react';
import { formatTimeSlot } from '../utils/format';
import { X, Calendar, Clock, FileText, DollarSign, User, Stethoscope } from 'lucide-react';

const BookingModal = ({
                          isOpen,
                          doctor,
                          formData,
                          schedule,
                          onInputChange,
                          onSubmit,
                          onClose,
                          selectedServicePrice,
                          formatCurrency,
                      }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            <div className="flex items-center justify-center min-h-screen p-4">
                <Dialog.Panel className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                    {/* Header with gradient */}
                    <div className="relative bg-gradient-to-r from-[#00B5F1] via-[#0099CC] to-[#007ACC] px-8 py-6">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <Dialog.Title className="text-2xl font-bold text-white">
                                        Book with Dr. {doctor?.fullName}
                                    </Dialog.Title>
                                    <p className="text-[#B3E5FC] text-sm">
                                        {doctor?.specialization}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Notes Section */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText className="w-4 h-4" />
                                    Notes or Reason for Visit
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={onInputChange}
                                    placeholder="Please describe your symptoms or reason for this appointment..."
                                    required
                                    rows={4}
                                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#00B5F1]/20 focus:border-[#00B5F1] transition-all resize-none placeholder-gray-400"
                                />
                            </div>

                            {/* Service Selection */}
                            {doctor?.services?.length > 0 && (
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Stethoscope className="w-4 h-4" />
                                        Select Service
                                    </label>
                                    <select
                                        name="serviceId"
                                        value={formData.serviceId}
                                        onChange={onInputChange}
                                        required
                                        className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#00B5F1]/20 focus:border-[#00B5F1] transition-all bg-white"
                                    >
                                        <option value="">Choose a service...</option>
                                        {doctor.services.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Service Description */}
                                    {formData.serviceId && (
                                        <div className="p-4 bg-gradient-to-r from-[#E1F5FE] to-[#E0F2F1] border border-[#00B5F1]/30 rounded-2xl">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                                                    <Stethoscope className="w-4 h-4 text-[#00B5F1]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800 mb-1">Service Description:</p>
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {
                                                            doctor.services.find(
                                                                (s) => s.id === Number(formData.serviceId)
                                                            )?.description || 'No description available'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Service Price */}
                                    {selectedServicePrice > 0 && (
                                        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-2xl">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                            <span className="text-green-800 font-semibold">
                                                Service Fee: <span className="text-xl font-bold">{formatCurrency(selectedServicePrice)}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Date Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Calendar className="w-4 h-4" />
                                    Select Date
                                </label>
                                <select
                                    name="date"
                                    value={formData.date}
                                    onChange={onInputChange}
                                    required
                                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#00B5F1]/20 focus:border-[#00B5F1] transition-all bg-white"
                                >
                                    <option value="">Choose a date...</option>
                                    {schedule.map((s) => (
                                        <option key={s.date} value={s.date}>
                                            {s.date}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Time Slot Selection */}
                            {formData.date && (
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Clock className="w-4 h-4" />
                                        Available Time Slots
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {schedule.find((s) => s.date === formData.date)?.timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => onInputChange({ target: { name: 'timeSlot', value: slot } })}
                                                className={`p-3 rounded-2xl border-2 text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                                                    formData.timeSlot === slot
                                                        ? 'bg-gradient-to-r from-[#00B5F1] to-[#0099CC] text-white border-transparent shadow-lg'
                                                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                {formatTimeSlot(slot)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00B5F1] to-[#0099CC] hover:from-[#0099CC] hover:to-[#007ACC] text-white font-semibold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#00B5F1]/30"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default BookingModal;