import React from "react";
import { motion } from "framer-motion";

const articles = [
    {
        title: "Cách phát hiện sớm bệnh tiểu đường",
        desc: "Những dấu hiệu cần lưu ý và phương pháp kiểm soát hiệu quả để ngăn ngừa biến chứng.",
        image: "https://ksbtdanang.vn/uploads/chuyen-mon/2023_02/image-20230209100718-1.png",
        readTime: "5 phút đọc",
        category: "Nội tiết",
    },
    {
        title: "Bí quyết tăng cường miễn dịch tự nhiên",
        desc: "Hướng dẫn dinh dưỡng và lối sống để xây dựng hệ miễn dịch khỏe mạnh từ bên trong.",
        image: "https://duocanphuc.vn/wp-content/uploads/2022/06/Tang-Cuong-He-Mien-Dich.jpg",
        readTime: "7 phút đọc",
        category: "Dinh dưỡng",
    },
    {
        title: "Tầm quan trọng của khám sức khỏe định kỳ",
        desc: "Vì sao nên khám định kỳ 6 tháng một lần và những điều cần lưu ý để bảo vệ sức khỏe.",
        image: "https://login.medlatec.vn//ImagePath/images/20200512/20200512_kham-suc-khoe-dinh-ki-01.jpg",
        readTime: "6 phút đọc",
        category: "Tổng quát",
    },
];

const LatestArticles = () => {
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
                        Bài viết y tế mới nhất
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Cập nhật kiến thức sức khỏe và các mẹo chăm sóc bản thân
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((blog, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 dark:border-gray-700">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {blog.readTime}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {blog.desc}
                                    </p>
                                    <div className="flex items-center mt-4 text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        <span>Đọc thêm</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestArticles;