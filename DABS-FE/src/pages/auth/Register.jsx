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
import { UserPlus, ArrowLeft } from "lucide-react";

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
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00B5F1]/10 to-white px-4 py-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white rounded-2xl shadow-[0_0_40px_rgba(0,181,241,0.12)] p-8 space-y-8 backdrop-blur-sm"
            >
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="w-16 h-16 mx-auto bg-[#00B5F1]/10 text-[#00B5F1] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00B5F1]/20"
                    >
                        <UserPlus className="w-8 h-8" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="text-gray-500">Join our healthcare platform today</p>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-500">Already have an account?</span>
                        <Link
                            to="/login"
                            className="text-[#00B5F1] hover:text-[#0090c1] font-medium transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Sign in here
                        </Link>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100"
                    >

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
                                    Sign Up
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