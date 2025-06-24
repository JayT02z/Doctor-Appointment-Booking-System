import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
    const [stage, setStage] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpTimer, setOtpTimer] = useState(300);
    const [sendingOtp, setSendingOtp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (stage === 2 && otpTimer > 0) {
            timer = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [stage, otpTimer]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const handleSendOtp = async () => {
        setSendingOtp(true);
        try {
            await axios.post("http://localhost:8080/api/v1/auth/sendOTP", { email });
            toast.success("OTP sent to your email!");
            setStage(2);
            setOtpTimer(300);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/auth/verifyOTP", { email, otp });
            toast.success("OTP verified successfully!");
            setStage(3);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify OTP");
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/auth/resendOTP", { email });
            toast.success("New OTP sent!");
            setOtpTimer(300);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/v1/auth/forgetpassword", {
                email,
                password: newPassword,
            });
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    };

    const transitionProps = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
            <motion.div
                className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6"
                {...transitionProps}
            >
                <h2 className="text-center text-3xl font-bold text-gray-800">Forgot Password</h2>

                <AnimatePresence mode="wait">
                    {stage === 1 && (
                        <motion.div key="stage1" {...transitionProps}>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="button"
                                disabled={sendingOtp}
                                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all duration-150"
                                onClick={handleSendOtp}
                            >
                                {sendingOtp ? "Sending..." : "Send OTP"}
                            </button>
                        </motion.div>
                    )}

                    {stage === 2 && (
                        <motion.div key="stage2" {...transitionProps}>
                            <p className="text-sm text-gray-600 mb-2">
                                Enter the 6-digit code sent to your email.{" "}
                                {otpTimer > 0 ? (
                                    <span className="text-indigo-600 font-medium">OTP expires in {formatTime(otpTimer)}</span>
                                ) : (
                                    <button onClick={handleResendOtp} className="text-indigo-500 underline">Resend OTP</button>
                                )}
                            </p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                            >
                                Verify OTP
                            </button>
                        </motion.div>
                    )}

                    {stage === 3 && (
                        <motion.div key="stage3" {...transitionProps}>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <label className="block text-sm font-medium text-gray-700 mt-4" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                            >
                                Reset Password
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center pt-4">
                    <Link to="/login" className="text-sm text-indigo-600 hover:underline">
                        ← Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
