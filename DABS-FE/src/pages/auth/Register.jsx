// Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import RegisterForm from "../../components/register/RegisterForm.jsx";
import OtpVerification from "../../components/register/OtpVerification.jsx";
import { useRegisterForm } from "../../hooks/useRegisterForm.jsx";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Register = () => {
    const {
        formData,
        handleChange,
        errors,
        otp,
        setOtp,
        otpTimer,
        otpExpired,
        isOtpLoading,
        isSendingOtp,
        isVerifying,
        isResendingOtp,
        otpInputRef,
        handleSendOTP,
        handleVerifyOTP,
        handleFinalRegister,
        isLoading,
        otpVerified,
        validateForm,
    } = useRegisterForm();

    const [isOtpModalOpen, setOtpModalOpen] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        await handleSendOTP();
        setOtpModalOpen(true);
    };

    const handleCloseModal = () => {
        setOtpModalOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4 py-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg space-y-8"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 w-14 h-14 bg-[#0369A1] rounded-xl flex items-center justify-center shadow-lg">
                        <div className="w-7 h-7">🏥</div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="text-sm text-gray-600">Join our healthcare platform today</p>
                    <p className="mt-1 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#0369A1] hover:underline font-medium">
                            Sign in here
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100"
                    >
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-12 h-12 bg-[#0369A1] rounded-xl flex items-center justify-center shadow">
                                <span className="text-white text-lg">✨</span>
                            </div>
                            <h3 className="mt-2 text-lg font-semibold text-gray-800">Personal Information</h3>
                            <p className="text-sm text-gray-500">Fill in your details to get started</p>
                        </div>

                        <RegisterForm
                            formData={formData}
                            handleChange={handleChange}
                            errors={errors}
                        />
                    </motion.div>

                    <Tippy
                        content="Please complete all required fields and verify OTP if sent."
                        visible={!formData.username || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword}
                        placement="bottom"
                    >
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={isOtpLoading || isLoading}
                            className={`w-full py-3 rounded-2xl text-white font-semibold text-sm shadow-lg transition duration-300 ${
                                isOtpLoading || isLoading
                                    ? "bg-sky-300 cursor-not-allowed"
                                    : "bg-[#0369A1] hover:bg-sky-700"
                            }`}
                        >
                            {isSendingOtp ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2 h-5 w-5 inline-block" /> Sending OTP...
                                </>
                            ) : isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2 h-5 w-5 inline-block" /> Registering...
                                </>
                            ) : (
                                <span className="inline-flex items-center gap-2 justify-center">
                                    ✨ Get Started
                                </span>
                            )}
                        </motion.button>
                    </Tippy>
                </form>

                <OtpVerification
                    isOpen={isOtpModalOpen}
                    onClose={handleCloseModal}
                    otp={otp}
                    setOtp={setOtp}
                    errors={errors}
                    otpExpired={otpExpired}
                    otpTimer={otpTimer}
                    handleVerifyOTP={handleVerifyOTP}
                    handleResendOTP={handleSendOTP}
                    otpInputRef={otpInputRef}
                    isVerifying={isVerifying}
                    isResendingOtp={isResendingOtp}
                />
            </motion.div>
        </motion.div>
    );
};

export default Register;