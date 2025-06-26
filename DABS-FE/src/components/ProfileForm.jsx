import React from "react";
import FormField from "./FormField";
import GenderSelect from "./GenderSelect";
import { User2, ClipboardList, Save } from 'lucide-react';

const ProfileForm = ({ formData, handleChange, handleSubmit, isFirstTime }) => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                <User2 className="h-6 w-6 text-[#00B5F1]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
                {isFirstTime ? "Complete Your Profile" : "Profile Information"}
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="rounded-xl border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                 transition-all duration-200"
                    />
                    {!isFirstTime && (
                        <>
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="rounded-xl border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                         transition-all duration-200"
                            />
                            <FormField
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="rounded-xl border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                         transition-all duration-200"
                            />
                        </>
                    )}
                    <GenderSelect
                        value={formData.gender}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="rounded-xl border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                 transition-all duration-200"
                    />
                    <FormField
                        label="Address"
                        name="address"
                        value={formData.address} onChange={handleChange}
                        className="rounded-xl border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Medical History Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="h-5 w-5 text-[#00B5F1]" />
                    <h3 className="text-lg font-semibold text-gray-700">Medical History</h3>
                </div>
                <div className="relative">
                    <textarea
                        name="medicalHistory"
                        id="medicalHistory"
                        rows={4}
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200
                                 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                 transition-all duration-200 resize-none"
                        placeholder="Enter any relevant medical history, conditions, or concerns..."
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    className="group relative inline-flex items-center gap-2 px-6 py-2.5
                             bg-gradient-to-r from-[#00B5F1] to-[#0099cc] text-white font-medium
                             rounded-xl hover:shadow-lg hover:shadow-[#00B5F1]/20
                             active:scale-[0.98] transition-all duration-200"
                >
                    <Save className="w-4 h-4" />
                    {isFirstTime ? "Complete Profile" : "Save Changes"}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                                  translate-x-[-100%] animate-shimmer rounded-xl" />
                </button>
            </div>
        </form>
    </div>
);

export default ProfileForm;