import React from "react";
import { ClockIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const DiabetesArticle = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl overflow-hidden">
                {/* Article Header */}
                <div className="relative h-[400px]">
                    <img
                        src="https://ksbtdanang.vn/uploads/chuyen-mon/2023_02/image-20230209100718-1.png"
                        alt="Phát hiện sớm bệnh tiểu đường"
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
                            Cách phát hiện sớm bệnh tiểu đường
                        </motion.h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-white/80">
                                <ClockIcon className="h-5 w-5 mr-1" />
                                <span>5 phút đọc</span>
                            </div>
                            <span className="text-white/60">•</span>
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm">
                                Nội tiết
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
                                <div className="font-medium text-gray-900">Bs. Nguyễn Văn A</div>
                                <div className="text-sm text-gray-500">Chuyên khoa Nội tiết</div>
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
                            Bệnh tiểu đường (đái tháo đường) là một bệnh rối loạn chuyển hóa mạn tính,
                            ảnh hưởng nghiêm trọng đến sức khỏe nếu không được phát hiện và kiểm soát kịp thời.
                        </p>

                        <div className="my-8 p-6 bg-blue-50 rounded-xl">
                            <h2 className="text-2xl font-semibold text-blue-900 flex items-center">
                                <span className="text-2xl mr-2">🔍</span>
                                Những dấu hiệu cần lưu ý
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {[
                                    "Khát nước liên tục và đi tiểu nhiều lần",
                                    "Giảm cân không rõ nguyên nhân",
                                    "Luôn cảm thấy đói, mệt mỏi, dễ cáu gắt",
                                    "Thị lực mờ, vết thương lâu lành"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-800 mr-3 font-medium">
                                            {index + 1}
                                        </span>
                                        <span className="text-blue-900">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold mt-10 mb-6 flex items-center">
                            <span className="text-2xl mr-2">✅</span>
                            Kiểm soát hiệu quả và phòng biến chứng
                        </h2>

                        <p>
                            Nếu có nguy cơ hoặc biểu hiện trên, bạn nên đi kiểm tra đường huyết lúc đói,
                            HbA1c hoặc xét nghiệm dung nạp glucose. Để phòng ngừa biến chứng như tổn thương
                            thận, mắt, thần kinh... cần:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            {[
                                "Ăn uống hợp lý, ít đường và tinh bột nhanh",
                                "Tập thể dục ít nhất 30 phút mỗi ngày",
                                "Không hút thuốc, hạn chế rượu bia",
                                "Tuân thủ điều trị và tái khám định kỳ"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
                                        ✓
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-yellow-50 rounded-xl">
                            <p className="text-lg font-medium text-yellow-900">
                                💡 Chủ động phát hiện sớm chính là chìa khóa để sống khỏe cùng bệnh tiểu đường!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 mt-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Bạn cần tư vấn về bệnh tiểu đường?
                        </h3>
                        <p className="text-blue-100 mb-6">
                            Đội ngũ bác sĩ chuyên khoa của chúng tôi sẵn sàng hỗ trợ bạn
                        </p>
                        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                            Đặt lịch tư vấn ngay
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default DiabetesArticle;
