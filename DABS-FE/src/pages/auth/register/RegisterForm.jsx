// ===================== RegisterForm.jsx =====================
import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const RegisterForm = ({ formData, handleChange, errors }) => {
    const fields = [
        { id: "username", label: "Username", type: "text", icon: <FaUser /> },
        { id: "email", label: "Email address", type: "email", icon: <FaEnvelope /> },
        { id: "phone", label: "Phone number", type: "tel", icon: <FaPhone /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
        { id: "confirmPassword", label: "Confirm Password", type: "password", icon: <FaLock /> },
    ];

    return (
        <div className="space-y-4">
            {fields.map(({ id, label, type, icon }) => (
                <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div className="flex items-center px-3 py-3 rounded-xl border bg-white text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all ${
            errors[id] ? 'border-red-500' : 'border-gray-300'
          }">
                        <span className="text-gray-400 text-sm mr-2">{icon}</span>
                        <input
                            id={id}
                            name={id}
                            type={type}
                            required
                            placeholder={label}
                            value={formData[id]}
                            onChange={handleChange}
                            className="w-full bg-transparent focus:outline-none text-sm"
                            aria-label={label}
                        />
                    </div>
                    {errors[id] && <p className="mt-1 text-sm text-red-500 ml-2">{errors[id]}</p>}
                </motion.div>
            ))}
        </div>
    );
};

export default RegisterForm;
