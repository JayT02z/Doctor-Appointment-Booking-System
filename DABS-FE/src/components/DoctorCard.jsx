// DoctorCard.jsx
import React from 'react';
import { Star, MapPin, Clock, Award } from 'lucide-react';

const DoctorCard = ({ doctor, imageUrl, onBook }) => {
    return (
        <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#00B5F1]/30 hover:-translate-y-2">
            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B5F1] via-[#0099CC] to-[#007ACC]"></div>

            {/* Card Content */}
            <div className="p-6">
                {/* Doctor Image */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        {imageUrl ? (
                            <img
                                src={`http://localhost:8080${imageUrl}`}
                                alt={doctor.fullName}
                                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-[#00B5F1] to-[#0099CC] rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <span className="text-white text-2xl font-bold">
                                    {doctor.fullName.charAt(0)}
                                </span>
                            </div>
                        )}

                        {/* Online Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Doctor Info */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00B5F1] transition-colors">
                        Dr. {doctor.fullName}
                    </h3>

                    <div className="flex items-center justify-center gap-1 mb-3">
                        <Award className="w-4 h-4 text-[#00B5F1]" />
                        <span className="text-sm font-medium text-[#00B5F1] bg-[#E1F5FE] px-3 py-1 rounded-full">
                            {doctor.specialization}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                    </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                    <div className="flex items-center gap-1 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Services Available</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {doctor.services.slice(0, 2).map((service, index) => (
                            <span
                                key={service.id}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                                {service.name}
                            </span>
                        ))}
                        {doctor.services.length > 2 && (
                            <span className="text-xs bg-[#E1F5FE] text-[#00B5F1] px-2 py-1 rounded-full">
                                +{doctor.services.length - 2} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Quick Info */}
                <div className="flex items-center justify-center gap-4 mb-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Today</span>
                    </div>
                </div>

                {/* Book Button */}
                <button
                    onClick={onBook}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#00B5F1] to-[#0099CC] hover:from-[#0099CC] hover:to-[#007ACC] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#00B5F1]/30"
                >
                    Book Appointment
                </button>
            </div>

            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B5F1]/5 to-[#0099CC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
    );
};

export default DoctorCard;