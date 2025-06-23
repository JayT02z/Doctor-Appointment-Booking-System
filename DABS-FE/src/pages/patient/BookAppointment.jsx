// Entry file - BookAppointment.jsx
import React from 'react';
import useBookAppointment from '../../hooks/useBookAppointment';
import DoctorCard from '../../components/DoctorCard';
import BookingModal from '../../components/BookingModal';
import PaymentModal from '../../components/PaymentModal';
import { Search, Calendar, Stethoscope } from 'lucide-react';

const BookAppointment = () => {
    const {
        searchTerm,
        handleSearch,
        suggestions,
        selectSuggestion,
        filteredDoctors,
        doctorImages,
        openBookingModal,
        showModal,
        selectedDoctor,
        formData,
        schedule,
        handleInput,
        handleSubmit,
        closeBookingModal,
        selectedServicePrice,
        showPaymentModal,
        paymentData,
        handlePaymentMethodChange,
        handlePayment,
        handleCancelPayment,
        showCancelConfirm,
        setShowCancelConfirm,
        cancelPayment,
        formatCurrency,
    } = useBookAppointment();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E1F5FE] via-white to-[#E0F2F1]">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#00B5F1] via-[#0099CC] to-[#007ACC]">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative px-6 py-16 mx-auto max-w-7xl">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                                <Stethoscope className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Book Your Appointment
                        </h1>
                        <p className="text-xl text-[#B3E5FC] mb-8 max-w-2xl mx-auto">
                            Connect with top healthcare professionals and schedule your visit with ease
                        </p>

                        {/* Modern Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search doctors, specializations, or services..."
                                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl shadow-lg focus:ring-4 focus:ring-[#00B5F1]/25 focus:outline-none backdrop-blur-sm bg-white/95 placeholder-gray-500 transition-all duration-300"
                            />

                            {suggestions.length > 0 && (
                                <ul className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
                                    {suggestions.map((s, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => selectSuggestion(s)}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Grid Section */}
            <div className="px-6 py-12 mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Our Medical Experts
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose from our network of qualified healthcare professionals
                    </p>
                </div>

                {filteredDoctors.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
                        <p className="text-gray-600">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDoctors.map((doc) => (
                            <DoctorCard
                                key={doc.id}
                                doctor={doc}
                                imageUrl={doctorImages.get(doc.id)}
                                onBook={() => openBookingModal(doc)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <BookingModal
                isOpen={showModal}
                doctor={selectedDoctor}
                formData={formData}
                schedule={schedule}
                onInputChange={handleInput}
                onSubmit={handleSubmit}
                onClose={closeBookingModal}
                selectedServicePrice={selectedServicePrice}
                formatCurrency={formatCurrency}
            />

            <PaymentModal
                isOpen={showPaymentModal}
                paymentData={paymentData}
                selectedServicePrice={selectedServicePrice}
                onPaymentMethodChange={handlePaymentMethodChange}
                onPay={handlePayment}
                onCancel={handleCancelPayment}
                onConfirmCancel={cancelPayment}
                showCancelConfirm={showCancelConfirm}
                onCloseCancelConfirm={() => setShowCancelConfirm(false)}
            />
        </div>
    );
};

export default BookAppointment;