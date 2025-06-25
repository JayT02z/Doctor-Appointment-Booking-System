import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    icon: Icon,
    className = "",
    placeholder,
    disabled = false,
    hint
}) => (
    <div className="group relative">
        {/* Label */}
        <label
            htmlFor={name}
            className="flex items-center gap-2 mb-1.5 text-sm font-medium text-gray-700"
        >
            {Icon && <Icon className="w-4 h-4 text-gray-400 group-focus-within:text-[#00B5F1] transition-colors duration-200" />}
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>

        {/* Input Container */}
        <div className="relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                className={`
                    w-full px-4 py-2.5 rounded-xl 
                    border border-gray-200 
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    transition-all duration-200
                    ${error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                        : 'focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10'
                    }
                    ${Icon ? 'pl-10' : ''}
                    ${className}
                `}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
            />

            {/* Icon Display */}
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#00B5F1]'} transition-colors duration-200`} />
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div
                    className="flex items-center gap-1.5 mt-1.5 text-sm text-red-500"
                    id={`${name}-error`}
                >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            {/* Hint Text */}
            {!error && hint && (
                <p
                    className="mt-1.5 text-sm text-gray-500"
                    id={`${name}-hint`}
                >
                    {hint}
                </p>
            )}
        </div>
    </div>
);

export default FormField;