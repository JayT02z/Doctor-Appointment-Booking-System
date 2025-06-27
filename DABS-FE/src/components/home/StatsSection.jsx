import React from "react";
import { motion } from "framer-motion";
import {
    UserGroupIcon,
    HeartIcon,
    ClockIcon,
    StarIcon
} from "@heroicons/react/24/outline";

const stats = [
    {
        number: "500+",
        label: "Bác sĩ chuyên khoa",
        desc: "Đội ngũ y bác sĩ giàu kinh nghiệm",
        icon: UserGroupIcon,
        color: "blue"
    },
    {
        number: "50K+",
        label: "Bệnh nhân tin tưởng",
        desc: "Phục vụ hơn 50.000 bệnh nhân",
        icon: HeartIcon,
        color: "rose"
    },
    {
        number: "24/7",
        label: "Hỗ trợ khách hàng",
        desc: "Sẵn sàng hỗ trợ mọi lúc",
        icon: ClockIcon,
        color: "indigo"
    },
    {
        number: "98%",
        label: "Đánh giá tích cực",
        desc: "Từ người dùng của chúng tôi",
        icon: StarIcon,
        color: "amber"
    }
];

const StatsSection = () => {
    const getColorVariants = (color) => ({
        bg: `bg-${color}-50 dark:bg-${color}-900/20`,
        text: `text-${color}-600 dark:text-${color}-400`,
        border: `border-${color}-100 dark:border-${color}-800`,
        hover: `hover:bg-${color}-100 dark:hover:bg-${color}-900/30`
    });

    return (
        <section id="stats-section" className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Những con số ấn tượng
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Chúng tôi tự hào về những thành tựu đã đạt được và tiếp tục phấn đấu
                        để mang đến dịch vụ tốt nhất cho bệnh nhân.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const colors = getColorVariants(stat.color);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className={`h-full p-8 rounded-2xl border ${colors.border} ${colors.bg} ${colors.hover} transition-all duration-300 group`}>
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`mb-4 p-3 rounded-xl ${colors.bg} ${colors.text} transition-colors`}>
                                            <stat.icon className="w-8 h-8" />
                                        </div>

                                        <motion.div
                                            className={`text-4xl font-bold mb-2 ${colors.text}`}
                                            initial={{ scale: 1 }}
                                            whileInView={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            {stat.number}
                                        </motion.div>

                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {stat.label}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {stat.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;