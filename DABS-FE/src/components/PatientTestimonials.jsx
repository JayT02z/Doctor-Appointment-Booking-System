import React from "react";
import { motion } from "framer-motion";

const feedbacks = [
    {
        name: "Nguyễn Thị Hoa",
        feedback:
            "Dịch vụ tuyệt vời! Bác sĩ rất tận tâm, hướng dẫn chi tiết và chu đáo. Tôi cảm thấy rất an tâm khi được chăm sóc ở đây.",
        avatar:
            "https://cdn.medpro.vn/prod-partner/3126ceaa-54ae-4916-a2a0-9d83d45b5561-mai-vy.jpg",
        rating: 5,
    },
    {
        name: "Trần Văn Tài",
        feedback:
            "Giao diện ứng dụng thân thiện, đặt lịch nhanh chóng. Quy trình khám bệnh chuyên nghiệp và hiệu quả.",
        avatar:
            "https://cdn.medpro.vn/prod-partner/d86082a5-b561-4904-a6c5-0122d8965ba9-nhan-nguyen.jpg",
        rating: 5,
    },
    {
        name: "Lê Hồng Nhung",
        feedback:
            "Hệ thống quản lý hồ sơ bệnh án rất tiện lợi. Có thể theo dõi lịch hẹn và kết quả khám một cách dễ dàng.",
        avatar:
            "https://cdn.medpro.vn/prod-partner/c76c323f-452f-4675-81b1-2c6fcd56e6a0-moc-tra.jpg",
        rating: 5,
    },
];

const PatientTestimonials = () => {
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
                        Phản hồi từ bệnh nhân
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Những chia sẻ chân thực từ khách hàng đã sử dụng dịch vụ
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedbacks.map((fb, index) => (
                        <motion.div
                            key={index}
                            className="group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 h-full border border-gray-100 dark:border-gray-600 group-hover:-translate-y-2">
                                <div className="flex items-center mb-6">
                                    <img
                                        src={fb.avatar}
                                        alt={fb.name}
                                        loading="lazy"
                                        className="w-16 h-16 object-cover rounded-full border-3 border-white dark:border-gray-600 shadow-md"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {fb.name}
                                        </h4>
                                        <div className="flex text-yellow-400">
                                            {[...Array(fb.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                                    "{fb.feedback}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PatientTestimonials;