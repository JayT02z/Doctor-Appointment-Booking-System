import React from "react";
import { motion } from "framer-motion";

const doctors = [
    {
        name: "TS. BS. Nguyễn Phúc Thiện",
        spec: "Tim mạch",
        img: "https://cdn.medpro.vn/prod-partner/29e26328-649d-413c-9b1d-3a1a131688ab-baac_saa(c)_thiaaan.jpg",
        experience: "15+ năm kinh nghiệm",
    },
    {
        name: "ThS. BS. Trần Thị Oanh",
        spec: "Sản khoa",
        img: "https://cdn.medpro.vn/prod-partner/0478ff2f-00fd-478a-a52f-49396cf6ac75-bs_traaoan_thaaa_oanh.png",
        experience: "12+ năm kinh nghiệm",
    },
    {
        name: "BS. Vũ Đình Khôi",
        spec: "Nhi khoa",
        img: "https://cdn.medpro.vn/prod-partner/fed8b62f-6f24-46bf-bfd4-7378a6bee398-bs_vaa(c)_aaaanh_khaai.png",
        experience: "10+ năm kinh nghiệm",
    },
];

const FeaturedDoctors = () => {
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
                        Bác sĩ nổi bật
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Đội ngũ chuyên gia y tế hàng đầu với nhiều năm kinh nghiệm
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 dark:border-gray-700">
                                <div className="relative mb-6 inline-block">
                                    <img
                                        src={doc.img}
                                        alt={doc.name}
                                        loading="lazy"
                                        className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {doc.name}
                                </h3>
                                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                    {doc.spec}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {doc.experience}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDoctors;