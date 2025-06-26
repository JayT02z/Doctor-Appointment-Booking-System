import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/oauth2/authorization/google`;
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={loading}
            aria-label="Sign in with Google"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
                w-full bg-white border-2 border-gray-100 py-3 px-6 rounded-xl 
                flex items-center justify-center gap-3 
                text-gray-600 font-medium
                transition-all duration-200
                hover:border-gray-200 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/20
                disabled:opacity-70 disabled:cursor-not-allowed
                shadow-sm hover:shadow-md
            `}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5"
            />
            <span className="text-sm">
                {loading ? 'Connecting...' : 'Continue with Google'}
            </span>
        </motion.button>
    );
};

export default GoogleSignInButton;