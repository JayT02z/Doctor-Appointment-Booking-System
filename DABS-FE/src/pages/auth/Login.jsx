import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import GoogleSignInButton from "../../components/GoogleSignInButton.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import {
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

const MAX_FAILED_ATTEMPTS = 3;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [showRecaptcha, setShowRecaptcha] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (showRecaptcha && !captchaValue) {
            toast.error("Please complete the reCAPTCHA");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/login",
                formData
            );

            if (response.data.statusCode === 200 && response.data.data) {
                const { token, userId, doctorId, patientId } = response.data.data;
                const result = await login(token, userId, doctorId, patientId);
                if (!result.success) {
                    setError(result.error || "Login failed");
                } else {
                    // Reset failed attempt & recaptcha nếu login thành công
                    setFailedAttempts(0);
                    setShowRecaptcha(false);
                    setCaptchaValue(null);
                }
            } else {
                setError(response.data.message || "Login failed");
                setFailedAttempts((prev) => {
                    const newCount = prev + 1;
                    if (newCount >= MAX_FAILED_ATTEMPTS) {
                        setShowRecaptcha(true);
                    }
                    return newCount;
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
            setFailedAttempts((prev) => {
                const newCount = prev + 1;
                if (newCount >= MAX_FAILED_ATTEMPTS) {
                    setShowRecaptcha(true);
                }
                return newCount;
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00B5F1]/10 to-white p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-[0_0_40px_rgba(0,181,241,0.12)] p-8 max-w-md w-full backdrop-blur-sm"
            >
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="w-16 h-16 mx-auto bg-[#00B5F1]/10 text-[#00B5F1] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#00B5F1]/20"
                >
                    <Lock className="w-8 h-8" />
                </motion.div>

                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign in to access your account
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                            <User className="w-5 h-5" />
                        </span>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            placeholder="Username"
                            aria-label="Username"
                            tabIndex="0"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <div className="relative group">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                            <Lock className="w-5 h-5" />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            aria-label="Password"
                            tabIndex="0"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-11 pr-11 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#00B5F1] transition-all bg-gray-50 focus:bg-white"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#00B5F1] focus:outline-none transition-colors"
                            aria-label="Toggle password visibility"
                            tabIndex="0"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg">{error}</p>
                    )}

                    {showRecaptcha && (
                        <div className="flex justify-center p-2 bg-gray-50 rounded-xl">
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                onChange={handleCaptchaChange}
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm py-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="remember"
                                type="checkbox"
                                className="rounded-md border-gray-300 text-[#00B5F1] focus:ring-[#00B5F1]"
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-[#00B5F1] hover:text-[#0090c1] transition-colors font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00B5F1] text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-[#0090c1] transition-all shadow-lg shadow-[#00B5F1]/25"
                    >
                        Sign In <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 my-4">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-sm text-gray-500">or continue with</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>
                    <GoogleSignInButton />

                    <p className="text-center text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-[#00B5F1] hover:text-[#0090c1] font-medium">
                            Sign up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;