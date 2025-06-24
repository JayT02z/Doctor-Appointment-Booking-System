// File: components/HeroBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, HeartIcon, ClockIcon } from "@heroicons/react/24/outline";

const HeroBanner = () => {
    const features = [
        { icon: HeartIcon, text: "Chăm sóc chất lượng" },
        { icon: ClockIcon, text: "Đặt lịch 24/7" }
    ];

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90"
                    style={{
                        backgroundImage: "url('https://images3.alphacoders.com/101/1010294.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "overlay",
                    }}
                />

                {/* Animated background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6"
                        >
                            ✨ Nền tảng đặt lịch khám hàng đầu Việt Nam
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        >
                            Sức khỏe của bạn
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-300">
                                là ưu tiên hàng đầu
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-lg text-gray-300 mb-8 max-w-lg"
                        >
                            Đặt lịch hẹn với bác sĩ chuyên khoa hàng đầu chỉ trong vài giây.
                            Trải nghiệm chăm sóc sức khỏe hiện đại và tiện lợi.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                to="/patient/book-appointment"
                                className="group inline-flex items-center px-6 py-3 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
                            >
                                Đặt lịch ngay
                                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button
                                className="inline-flex items-center px-6 py-3 text-base font-medium bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                Tìm hiểu thêm
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="mt-8 flex items-center gap-6"
                        >
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <feature.icon className="h-5 w-5 text-blue-400" />
                                    <span className="text-gray-300">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right content - Doctor image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <img
                            src="/doctor.png"
                            alt="Doctor"
                            className="w-full max-w-lg mx-auto drop-shadow-2xl"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroBanner;