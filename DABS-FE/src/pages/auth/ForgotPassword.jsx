import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, KeyRound, Timer } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00B5F1]/10 to-white p-4">
            <motion.div
                className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_40px_rgba(0,181,241,0.12)] p-8 space-y-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="w-16 h-16 mx-auto bg-[#00B5F1]/10 text-[#00B5F1] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#00B5F1]/20"
                >
                    <KeyRound className="w-8 h-8" />
                </motion.div>

                <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-center text-gray-500 mb-8">
                    {stage === 1 && "Enter your email to receive a reset code"}
                    {stage === 2 && "Enter the verification code sent to your email"}
                    {stage === 3 && "Create your new password"}
                </p>

                <AnimatePresence mode="wait">
                    {stage === 1 && (
                        <motion.div key="stage1" {...transitionProps} className="space-y-4">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm
                                           focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                disabled={sendingOtp}
                                onClick={handleSendOtp}
                                className="w-full bg-[#00B5F1] text-white rounded-xl py-3 font-medium
                                         hover:bg-[#0090c1] transition-all shadow-lg shadow-[#00B5F1]/25
                                         disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {sendingOtp ? "Sending..." : "Send Reset Code"}
                            </button>
                        </motion.div>
                    )}

                    {stage === 2 && (
                        <motion.div key="stage2" {...transitionProps} className="space-y-4">
                            <div className="bg-[#00B5F1]/5 rounded-xl p-4 flex items-center gap-3">
                                <Timer className="w-5 h-5 text-[#00B5F1]" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        {otpTimer > 0 ? (
                                            <span>Code expires in <span className="text-[#00B5F1] font-medium">{formatTime(otpTimer)}</span></span>
                                        ) : (
                                            <span>Code expired. <button onClick={handleResendOtp} className="text-[#00B5F1] font-medium hover:underline">Resend code</button></span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                                    <KeyRound className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter verification code"
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm
                                           focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                                    maxLength={6}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="w-full bg-[#00B5F1] text-white rounded-xl py-3 font-medium
                                         hover:bg-[#0090c1] transition-all shadow-lg shadow-[#00B5F1]/25"
                            >
                                Verify Code
                            </button>
                        </motion.div>
                    )}

                    {stage === 3 && (
                        <motion.div key="stage3" {...transitionProps} className="space-y-4">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm
                                           focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm
                                           focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="w-full bg-[#00B5F1] text-white rounded-xl py-3 font-medium
                                         hover:bg-[#0090c1] transition-all shadow-lg shadow-[#00B5F1]/25"
                            >
                                Reset Password
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-6 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-[#00B5F1] hover:text-[#0090c1] font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;