// File: components/HeroBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroBanner = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 dark:from-blue-800 dark:via-purple-800 dark:to-teal-800"
                style={{
                    backgroundImage:
                        "url('https://cdn.medpro.vn/prod-partner/92b6d682-4b5a-4c94-ac54-97a077c0c6c5-homepage_banner.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                }}
            ></div>

            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <motion.div
                className="relative z-10 text-center max-w-4xl mx-auto px-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Sức khỏe của bạn
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            là ưu tiên hàng đầu
          </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Đặt lịch hẹn với bác sĩ chuyên khoa hàng đầu chỉ trong vài giây.
                    Trải nghiệm chăm sóc sức khỏe hiện đại và tiện lợi.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/patient/book-appointment">
                        <button
                            className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                            aria-label="Đặt lịch ngay"
                        >
                            <span>Đặt lịch ngay</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </Link>

                    <button
                        className="px-8 py-4 text-lg font-semibold bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300"
                        aria-label="Tìm hiểu thêm"
                    >
                        Tìm hiểu thêm
                    </button>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroBanner;