// pages/ProfileSettings.jsx
import React from "react";
import { motion } from "framer-motion";
import { useProfileForm } from "../../hooks/useProfileForm";
import ProfileForm from "../../components/ProfileForm";
import { User2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
    const { formData, handleChange, handleSubmit, isFirstTime } = useProfileForm();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Navigation and Title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-500" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isFirstTime ? "Complete Your Profile" : "Profile Settings"}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {isFirstTime
                                    ? "Please complete your profile to continue using our services"
                                    : "Update your personal information and medical history"
                                }
                            </p>
                        </div>
                    </div>

                    {!isFirstTime && (
                        <div className="flex items-center gap-3 px-4 py-2 bg-[#00B5F1]/5 rounded-lg">
                            <User2 className="h-5 w-5 text-[#00B5F1]" />
                            <div className="text-sm">
                                <span className="text-gray-500">Profile Status:</span>
                                <span className="ml-1 font-medium text-[#00B5F1]">Complete</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Progress Indicator for First Time Users */}
                {isFirstTime && (
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                                    <span className="text-sm font-medium text-[#00B5F1]">Step 1 of 2</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-1/2 bg-gradient-to-r from-[#00B5F1] to-[#0099cc] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <ProfileForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        isFirstTime={isFirstTime}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileSettings;