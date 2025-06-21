import React from "react";
import { motion } from "framer-motion";

const reasons = [
    {
        title: "Bác sĩ chuyên môn cao",
        desc:
            "Đội ngũ bác sĩ dày dạn kinh nghiệm với bằng cấp quốc tế, luôn cập nhật kiến thức y khoa mới nhất để đảm bảo chất lượng điều trị tốt nhất.",
        icon: "🩺",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Cơ sở vật chất hiện đại",
        desc:
            "Trang thiết bị y tế tiên tiến nhất thế giới, phòng khám đạt chuẩn quốc tế với môi trường sạch sẽ, thoải mái và an toàn tuyệt đối.",
        icon: "🏥",
        gradient: "from-purple-500 to-pink-500",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Tại sao chọn chúng tôi?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất với công nghệ hiện đại
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700`}
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    role="img"
                                    aria-label={item.title}
                                >
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;