import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
            <div className="max-w-4xl mx-auto text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Sẵn sàng chăm sóc sức khỏe của bạn?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Đừng để sức khỏe chờ đợi. Đặt lịch hẹn ngay hôm nay để được tư vấn từ các chuyên gia hàng đầu.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/patient/book-appointment">
                            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                                Đặt lịch ngay
                            </button>
                        </Link>
                        <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-300">
                            Gọi tư vấn: 1900 2115
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;