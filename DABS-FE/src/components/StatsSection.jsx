import React from "react";
import { motion } from "framer-motion";

const stats = [
    { number: "500+", label: "Bác sĩ chuyên khoa", icon: "👨‍⚕️" },
    { number: "50K+", label: "Bệnh nhân tin tưởng", icon: "😊" },
    { number: "24/7", label: "Hỗ trợ khách hàng", icon: "🕒" },
    { number: "98%", label: "Đánh giá tích cực", icon: "⭐" },
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl mb-3" role="img" aria-label="{stat.label}">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;