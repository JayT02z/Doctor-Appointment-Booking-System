import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const [stage, setStage] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
    const [sendingOtp, setSendingOtp] = useState(false); // New state for "Sending..."
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (stage === 2 && otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [stage, otpTimer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const handleSendOtp = async () => {
        setSendingOtp(true); //  Start "Sending..." effect
        try {
            await axios.post("http://localhost:8080/api/v1/auth/sendOTP", { email });
            toast.success("OTP sent to your email!");
            setStage(2);
            setOtpTimer(300);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setSendingOtp(false); // End "Sending..." effect regardless of result
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/auth/verifyOTP", { email, otp: otp });
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                {stage === 1 && (
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="button"
                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            onClick={handleSendOtp}
                            disabled={sendingOtp} // Disable button while sending
                        >
                            {sendingOtp ? "Sending..." : "Send OTP"}  {/* Show "Sending..." */}
                        </button>
                    </div>
                )}

                {stage === 2 && (
                    <div>
                        <p className="text-sm text-gray-600">
                            Enter the 6-digit verification code we sent to your email.
                            {otpTimer > 0 && <span className="font-semibold">  OTP expires in: {formatTime(otpTimer)}</span>}
                            {otpTimer === 0 && (
                                <button
                                    type="button"
                                    className="ml-2 text-primary-600 hover:text-primary-500"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </p>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="OTP (6 digits)"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        />
                        <button
                            type="button"
                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {stage === 3 && (
                    <div>
                        <label htmlFor="newPassword" className="sr-only">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        />
                        <label htmlFor="confirmPassword" className="sr-only">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm mt-4"
                        />
                        <button
                            type="button"
                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    </div>
                )}

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-primary-600 hover:text-primary-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;