// useRegisterForm.js
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export const useRegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        role: "patient",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(300);
    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [otpExpired, setOtpExpired] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isResendingOtp, setIsResendingOtp] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();
    const otpInputRef = useRef(null);

    useEffect(() => {
        let timer;
        if (otpSent && otpTimer > 0) {
            timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
        }
        if (otpSent && otpTimer === 0) {
            setOtpExpired(true);
        }
        return () => clearInterval(timer);
    }, [otpSent, otpTimer]);

    useEffect(() => {
        if (otpSent && otpInputRef.current) otpInputRef.current.focus();
    }, [otpSent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOTP = async () => {
        if (!validateForm()) return;
        setIsOtpLoading(true);
        setIsSendingOtp(true);
        try {
            await axios.post("http://localhost:8080/api/v1/auth/sendOTP", {
                email: formData.email,
            });
            toast.success("OTP sent to your email");
            setOtpSent(true);
            setOtpTimer(300);
            setOtpExpired(false);
        } catch (err) {
            toast.error("Failed to send OTP");
            console.error(err);
        } finally {
            setIsSendingOtp(false);
            setIsOtpLoading(false);
        }
    };

    const handleFinalRegister = async () => {
        if (!validateForm()) return false;
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
            if (res.data.message === "Success") {
                toast.success("Registration successful!");
                await register(formData.username, formData.password, formData.role);
                navigate("/login");
            } else {
                toast.error(res.data.message || "Registration failed");
                if (res.data.message.includes("Username")) {
                    setErrors((prev) => ({ ...prev, username: res.data.message }));
                }
                if (res.data.message.includes("Email")) {
                    setErrors((prev) => ({ ...prev, email: res.data.message }));
                }
                if (res.data.message.includes("Phone")) {
                    setErrors((prev) => ({ ...prev, phone: res.data.message }));
                }
                return false;
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setIsVerifying(true);
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/verifyOTP", {
                email: formData.email,
                otp,
            });
            if (res.data.data === true) {
                toast.success("OTP verified");
                setOtpVerified(true);
                await handleFinalRegister();
            } else {
                toast.error("Invalid OTP");
                setErrors((prev) => ({ ...prev, otp: "Invalid OTP" }));
            }
        } catch (err) {
            toast.error("OTP verification failed");
            setErrors((prev) => ({ ...prev, otp: "OTP verification failed" }));
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOTP = async () => {
        setIsResendingOtp(true);
        try {
            await axios.post("http://localhost:8080/api/v1/auth/resendOTP", {
                email: formData.email,
            });
            toast.success("OTP resent");
            setOtpTimer(300);
            setOtpExpired(false);
        } catch (err) {
            toast.error("Failed to resend OTP");
        } finally {
            setIsResendingOtp(false);
        }
    };

    return {
        formData,
        handleChange,
        errors,
        otp,
        setOtp,
        otpSent,
        otpVerified,
        otpTimer,
        otpExpired,
        isOtpLoading,
        isSendingOtp,
        isVerifying,
        isResendingOtp,
        otpInputRef,
        handleSendOTP,
        handleVerifyOTP,
        handleResendOTP,
        handleFinalRegister,
        handleSubmit: () => {},
        isLoading,
        validateForm,
    };
};