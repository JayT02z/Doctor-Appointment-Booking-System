import React from "react";
import { ClockIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ImmunityArticle = () => {
    const immunityTips = [
        {
            title: "Dinh dưỡng cân bằng",
            items: ["Vitamin C", "Vitamin D", "Kẽm", "Protein", "Chất xơ"]
        },
        {
            title: "Luyện tập thể dục",
            items: ["30 phút/ngày", "Vận động nhẹ nhàng", "Yoga", "Đi bộ"]
        },
        {
            title: "Nghỉ ngơi hợp lý",
            items: ["7-8 tiếng/ngày", "Giấc ngủ sâu", "Thư giãn"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl overflow-hidden">
                {/* Article Header */}
                <div className="relative h-[400px]">
                    <img
                        src="https://duocanphuc.vn/wp-content/uploads/2022/06/Tang-Cuong-He-Mien-Dich.jpg"
                        alt="Tăng cường hệ miễn dịch"
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
                            5 Cách tăng cường hệ miễn dịch tự nhiên
                        </motion.h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-white/80">
                                <ClockIcon className="h-5 w-5 mr-1" />
                                <span>6 phút đọc</span>
                            </div>
                            <span className="text-white/60">•</span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">
                                Sức khỏe & Dinh dưỡng
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
                                <div className="font-medium text-gray-900">Bs. Lê Thị C</div>
                                <div className="text-sm text-gray-500">Chuyên khoa Dinh dưỡng</div>
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
                            Hệ miễn dịch khỏe mạnh đóng vai trò quan trọng trong việc bảo vệ cơ thể khỏi các bệnh tật.
                            Dưới đây là những cách tự nhiên giúp tăng cường sức đề kháng hiệu quả.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                            {immunityTips.map((tip, index) => (
                                <div key={index} className="bg-purple-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                                        {tip.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {tip.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center text-purple-800">
                                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-semibold mt-10 mb-6">
                            Thói quen sinh hoạt lành mạnh
                        </h2>

                        <div className="bg-gray-50 rounded-xl p-6 my-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Buổi sáng",
                                        items: [
                                            "Uống nước ấm",
                                            "Tập thể dục 15-20 phút",
                                            "Ăn sáng đầy đủ dinh dưỡng"
                                        ]
                                    },
                                    {
                                        title: "Buổi tối",
                                        items: [
                                            "Tránh ăn muộn",
                                            "Thư giãn trước khi ngủ",
                                            "Ngủ đủ giấc"
                                        ]
                                    }
                                ].map((routine, index) => (
                                    <div key={index} className="space-y-3">
                                        <h3 className="font-medium text-gray-900">{routine.title}</h3>
                                        <ul className="space-y-2">
                                            {routine.items.map((item, idx) => (
                                                <li key={idx} className="flex items-center text-gray-700">
                                                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                                                        ✓
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl my-8">
                            <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                                <span className="text-2xl mr-2">⚠️</span>
                                Dấu hiệu sức đề kháng yếu
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Hay mệt mỏi, uể oải
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Dễ bị cảm, viêm họng
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    Thường xuyên stress
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 mt-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Cần tư vấn về sức khỏe?
                        </h3>
                        <p className="text-purple-100 mb-6">
                            Đội ngũ bác sĩ của chúng tôi luôn sẵn sàng hỗ trợ bạn
                        </p>
                        <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                            Tư vấn miễn phí
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ImmunityArticle;
