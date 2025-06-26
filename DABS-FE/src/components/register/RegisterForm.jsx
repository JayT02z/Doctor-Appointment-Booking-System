// ===================== RegisterForm.jsx =====================
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

const RegisterForm = ({ formData, handleChange, errors }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const fields = [
        {
            id: "username",
            label: "Username",
            type: "text",
            icon: User,
            placeholder: "Enter your username"
        },
        {
            id: "email",
            label: "Email address",
            type: "email",
            icon: Mail,
            placeholder: "you@example.com"
        },
        {
            id: "phone",
            label: "Phone number",
            type: "tel",
            icon: Phone,
            placeholder: "Your phone number"
        },
        {
            id: "password",
            label: "Password",
            type: showPassword ? "text" : "password",
            icon: Lock,
            placeholder: "Create a strong password",
            hasToggle: true,
            showPassword: showPassword,
            setShowPassword: setShowPassword
        },
        {
            id: "confirmPassword",
            label: "Confirm Password",
            type: showConfirmPassword ? "text" : "password",
            icon: Lock,
            placeholder: "Confirm your password",
            hasToggle: true,
            showPassword: showConfirmPassword,
            setShowPassword: setShowConfirmPassword
        },
    ];

    return (
        <div className="space-y-5">
            {fields.map(({ id, label, type, icon: Icon, placeholder, hasToggle, showPassword, setShowPassword }) => (
                <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-gray-700 ml-1"
                    >
                        {label}
                    </label>
                    <div className={`
                        relative group
                        ${errors[id] ? 'animate-shake' : ''}
                    `}>
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-[#00B5F1] transition-colors">
                            <Icon className="w-5 h-5" />
                        </span>
                        <input
                            id={id}
                            name={id}
                            type={type}
                            required
                            placeholder={placeholder}
                            value={formData[id]}
                            onChange={handleChange}
                            className={`
                                w-full pl-11 pr-${hasToggle ? '11' : '4'} py-3 
                                border-2 rounded-xl text-sm
                                bg-gray-50 focus:bg-white
                                transition-all duration-200
                                focus:outline-none
                                ${errors[id] 
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                    : 'border-gray-100 focus:border-[#00B5F1] focus:ring-[#00B5F1]/20'
                                }
                            `}
                            aria-label={label}
                            aria-invalid={errors[id] ? "true" : "false"}
                        />
                        {hasToggle && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400
                                         hover:text-[#00B5F1] focus:outline-none transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        )}
                    </div>
                    {errors[id] && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500 ml-1 flex items-center gap-1"
                        >
                            <span className="text-xs">⚠</span> {errors[id]}
                        </motion.p>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default RegisterForm;
