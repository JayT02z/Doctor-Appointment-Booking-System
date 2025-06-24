// OtpVerification.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const OtpVerification = ({
                             isOpen,
                             onClose,
                             otp,
                             setOtp,
                             errors,
                             otpExpired,
                             otpTimer,
                             handleVerifyOTP,
                             handleResendOTP,
                             otpInputRef,
                             isVerifying,
                             isResendingOtp,
                         }) => {
    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-6 w-full max-w-md relative border border-gray-100 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h4 className="text-lg font-semibold text-center text-gray-800 mb-3">
                        Verify OTP
                    </h4>

                    <input
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        className={`w-full text-center tracking-widest text-lg font-semibold px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ${
                            errors.otp ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        ref={otpInputRef}
                        aria-label="OTP input"
                    />

                    {errors.otp && (
                        <p className="text-sm text-red-500 text-center mt-2">{errors.otp}</p>
                    )}

                    {otpExpired ? (
                        <p className="text-sm font-medium text-red-600 text-center mt-2">
                            OTP has expired. Please resend.
                        </p>
                    ) : (
                        <div className="text-sm text-center text-gray-600 mt-2">
                            OTP expires in{' '}
                            <span className="font-semibold text-gray-800">
                {Math.floor(otpTimer / 60)}:{
                                String(otpTimer % 60).padStart(2, "0")
                            }
              </span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleVerifyOTP}
                            className={`inline-flex items-center justify-center w-full py-3 rounded-xl text-white text-sm font-semibold shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                isVerifying
                                    ? "bg-primary-400 cursor-wait"
                                    : "bg-primary-600 hover:bg-primary-700"
                            }`}
                            disabled={isVerifying}
                        >
                            {isVerifying ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2 h-5 w-5 text-white" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOTP}
                            className="inline-flex items-center justify-center w-full py-3 rounded-xl text-gray-800 text-sm font-medium bg-gray-200 hover:bg-gray-300 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            disabled={otpTimer > 0 || isResendingOtp}
                        >
                            {isResendingOtp ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2 h-5 w-5 text-gray-600" />
                                    Resending...
                                </>
                            ) : (
                                "Resend OTP"
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OtpVerification;