import React from "react";
import { ClockIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const HealthCheckupArticle = () => {
    const checkupTypes = [
        {
            title: "Khám sức khỏe cơ bản",
            desc: "Kiểm tra các chỉ số sinh tồn và xét nghiệm máu cơ bản",
            time: "1-2 giờ",
            price: "Từ 500.000đ"
        },
        {
            title: "Khám sức khỏe nâng cao",
            desc: "Bao gồm các xét nghiệm chuyên sâu và chẩn đoán hình ảnh",
            time: "2-3 giờ",
            price: "Từ 2.000.000đ"
        },
        {
            title: "Khám sức khỏe toàn diện",
            desc: "Kiểm tra toàn diện với các chuyên khoa và thiết bị hiện đại",
            time: "4-5 giờ",
            price: "Từ 5.000.000đ"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl overflow-hidden">
                {/* Article Header */}
                <div className="relative h-[400px]">
                    <img
                        src="https://login.medlatec.vn//ImagePath/images/20200512/20200512_kham-suc-khoe-dinh-ki-01.jpg"
                        alt="Khám sức khỏe định kỳ"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.h1
                            className="text-4xl font-bold text-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Tầm quan trọng của việc khám sức khỏe định kỳ
                        </motion.h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-white/80">
                                <ClockIcon className="h-5 w-5 mr-1" />
                                <span>7 phút đọc</span>
                            </div>
                            <span className="text-white/60">•</span>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-200 text-sm">
                                Sức khỏe tổng quát
                            </span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/doctor.png"
                                alt="Author"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <div className="font-medium text-gray-900">Bs. Trần Thị B</div>
                                <div className="text-sm text-gray-500">Chuyên khoa Nội tổng quát</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <BookmarkIcon className="h-5 w-5 text-gray-600" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <ShareIcon className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p className="lead text-xl text-gray-600">
                            Khám sức khỏe định kỳ là một trong những biện pháp hiệu quả nhất để phòng ngừa
                            và phát hiện sớm các vấn đề sức khỏe. Việc này giúp bạn chủ động trong việc
                            bảo vệ sức khỏe của mình và gia đình.
                        </p>

                        <div className="my-8 p-6 bg-green-50 rounded-xl">
                            <h2 className="text-2xl font-semibold text-green-900">
                                Lợi ích của khám sức khỏe định kỳ
                            </h2>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Phát hiện sớm các bệnh lý tiềm ẩn",
                                    "Theo dõi các chỉ số sức khỏe quan trọng",
                                    "Tiết kiệm chi phí điều trị về lâu dài",
                                    "An tâm hơn về tình trạng sức khỏe"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
                                            ✓
                                        </span>
                                        <span className="text-green-900">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mt-10 mb-6">
                            Các gói khám sức khỏe
                        </h2>

                        <div className="grid grid-cols-1 gap-6 my-8">
                            {checkupTypes.map((type, index) => (
                                <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-green-200 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                                            <p className="text-gray-600 mt-1">{type.desc}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-600 font-medium">{type.price}</div>
                                            <div className="text-sm text-gray-500">{type.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl my-8">
                            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                                💡 Lưu ý khi đi khám
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Nhịn ăn 6-8 tiếng trước khi xét nghiệm máu
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Mang theo kết quả xét nghiệm/khám bệnh trước đây (nếu có)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Thông báo cho bác sĩ về các thuốc đang sử dụng
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 mt-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Đặt lịch khám sức khỏe ngay hôm nay
                        </h3>
                        <p className="text-green-100 mb-6">
                            Chủ động bảo vệ sức khỏe của bạn và người thân
                        </p>
                        <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                            Xem các gói khám
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default HealthCheckupArticle;
