import React from "react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Khám tổng quát",
        desc: "Đánh giá tổng thể tình trạng sức khỏe với quy trình khám toàn diện và chuyên nghiệp.",
        icon: "🔍",
        color: "bg-blue-500",
    },
    {
        title: "Khám chuyên khoa",
        desc: "Điều trị chuyên sâu theo từng lĩnh vực như tim mạch, nội tiết, thần kinh...",
        icon: "⚕️",
        color: "bg-green-500",
    },
    {
        title: "Xét nghiệm & Chẩn đoán",
        desc: "Công nghệ xét nghiệm hiện đại với kết quả chính xác và nhanh chóng.",
        icon: "🧪",
        color: "bg-purple-500",
    },
];

const FeaturedServices = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Dịch vụ nổi bật
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Đa dạng dịch vụ y tế toàn diện cho mọi nhu cầu của bạn
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 dark:border-gray-600 group-hover:border-primary-500/50">
                                <div
                                    className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    role="img"
                                    aria-label={service.title}
                                >
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;