import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

        // Nếu vượt quá số lần sai và chưa xác thực captcha
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
            >
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"
                >
                    <Lock className="w-7 h-7" />
                </motion.div>

                <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Sign in to access your account
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <User className="w-4 h-4" />
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
                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Lock className="w-4 h-4" />
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
                            className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle password visibility"
                            tabIndex="0"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}

                    {showRecaptcha && (
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                onChange={handleCaptchaChange}
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="remember"
                                type="checkbox"
                                className="rounded-sm border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Remember me</span>
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-blue-600 hover:underline transition"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                    >
                        Sign In <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium transition"
                    >
                        Create one now
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
