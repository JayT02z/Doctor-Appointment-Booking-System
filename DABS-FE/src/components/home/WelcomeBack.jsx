import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WelcomeBack = ({ username, showProfileAlert, onCloseAlert }) => {
    if (!username) return null;

    const shortcuts = [
        {
            title: "Lịch hẹn của tôi",
            desc: "Xem và quản lý các cuộc hẹn",
            icon: "📅",
            link: "/patient/appointments",
        },
        {
            title: "Hồ sơ bệnh án",
            desc: "Theo dõi lịch sử khám bệnh",
            icon: "📋",
            link: "/patient/medical-records",
        },
        {
            title: "Đặt lịch mới",
            desc: "Tìm và đặt lịch với bác sĩ",
            icon: "🩺",
            link: "/patient/book-appointment",
        },
    ];

    return (
        <motion.section
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 py-16 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-center max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Chào mừng trở lại, {username}! 👋
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Quản lý lịch hẹn và hồ sơ sức khỏe của bạn một cách dễ dàng
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {shortcuts.map((item, index) => (
                            <Link key={index} to={item.link}>
                                <motion.div
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                >
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {showProfileAlert && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100 dark:border-gray-700"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Hoàn thiện hồ sơ
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Vui lòng cập nhật thông tin cá nhân để sử dụng đầy đủ các tính năng và đặt lịch hẹn.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link to="/patient/profile" className="flex-1">
                                    <button className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-300">
                                        Cập nhật ngay
                                    </button>
                                </Link>
                                <button
                                    onClick={onCloseAlert}
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors duration-300"
                                >
                                    Để sau
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default WelcomeBack;