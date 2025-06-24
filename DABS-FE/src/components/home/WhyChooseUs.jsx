import React from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const reasons = [
    {
        title: "Đội ngũ y bác sĩ chuyên môn cao",
        desc: "Các bác sĩ có trình độ chuyên môn cao, nhiều năm kinh nghiệm và được đào tạo tại các trường y khoa hàng đầu.",
        icon: UserGroupIcon,
        color: "blue"
    },
    {
        title: "Cơ sở vật chất hiện đại",
        desc: "Trang thiết bị y tế hiện đại, phòng khám đạt chuẩn quốc tế với môi trường sạch sẽ và thoải mái.",
        icon: BuildingOffice2Icon,
        color: "indigo"
    },
    {
        title: "Đặt lịch linh hoạt",
        desc: "Dễ dàng đặt lịch khám 24/7 thông qua hệ thống trực tuyến với nhiều khung giờ linh hoạt.",
        icon: ClockIcon,
        color: "purple"
    },
    {
        title: "An toàn & Bảo mật",
        desc: "Thông tin cá nhân và hồ sơ y tế của bạn được bảo vệ nghiêm ngặt theo tiêu chuẩn quốc tế.",
        icon: ShieldCheckIcon,
        color: "green"
    },
    {
        title: "Chi phí hợp lý",
        desc: "Mức giá cạnh tranh và minh bạch, không có chi phí phát sinh. Nhiều hình thức thanh toán linh hoạt.",
        icon: CurrencyDollarIcon,
        color: "yellow"
    },
    {
        title: "Chăm sóc tận tâm",
        desc: "Đội ngũ nhân viên thân thiện, tận tâm và luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.",
        icon: HeartIcon,
        color: "red"
    }
];

const WhyChooseUs = () => {
    const colorVariants = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        green: "bg-green-50 text-green-600 border-green-100",
        yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
        red: "bg-red-50 text-red-600 border-red-100"
    };

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Tại sao chọn
                        <span className="text-blue-600"> DABS</span>?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Chúng tôi cam kết mang đến trải nghiệm chăm sóc sức khỏe tốt nhất với đội ngũ bác sĩ chuyên môn cao
                        và công nghệ hiện đại, đặt sự an tâm của bạn lên hàng đầu.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${colorVariants[item.color]}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
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