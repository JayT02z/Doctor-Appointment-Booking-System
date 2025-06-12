import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
    const { user, patientId } = useAuth();
    const [showProfileAlert, setShowProfileAlert] = useState(false);

    useEffect(() => {
        if (user?.role === "PATIENT" && !patientId) {
            setShowProfileAlert(true);
        }
    }, [user, patientId]);

    const closeProfileAlert = () => setShowProfileAlert(false);

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* === Hero Banner === */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 dark:from-blue-800 dark:via-purple-800 dark:to-teal-800"
                    style={{
                        backgroundImage: `url('https://cdn.medpro.vn/prod-partner/92b6d682-4b5a-4c94-ac54-97a077c0c6c5-homepage_banner.webp')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay'
                    }}
                ></div>

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Sức khỏe của bạn
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                            là ưu tiên hàng đầu
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Đặt lịch hẹn với bác sĩ chuyên khoa hàng đầu chỉ trong vài giây.
                        Trải nghiệm chăm sóc sức khỏe hiện đại và tiện lợi.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/patient/book-appointment">
                            <button className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                                <span>Đặt lịch ngay</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>

                        <button className="px-8 py-4 text-lg font-semibold bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300">
                            Tìm hiểu thêm
                        </button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                    </div>
                </motion.div>
            </section>

            {/* === Stats Section === */}
            <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "500+", label: "Bác sĩ chuyên khoa", icon: "👨‍⚕️" },
                            { number: "50K+", label: "Bệnh nhân tin tưởng", icon: "😊" },
                            { number: "24/7", label: "Hỗ trợ khách hàng", icon: "🕒" },
                            { number: "98%", label: "Đánh giá tích cực", icon: "⭐" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === Why Choose Us === */}
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
                        {[
                            {
                                title: "Bác sĩ chuyên môn cao",
                                desc: "Đội ngũ bác sĩ dày dạn kinh nghiệm với bằng cấp quốc tế, luôn cập nhật kiến thức y khoa mới nhất để đảm bảo chất lượng điều trị tốt nhất.",
                                icon: "🩺",
                                gradient: "from-blue-500 to-cyan-500"
                            },
                            {
                                title: "Cơ sở vật chất hiện đại",
                                desc: "Trang thiết bị y tế tiên tiến nhất thế giới, phòng khám đạt chuẩn quốc tế với môi trường sạch sẽ, thoải mái và an toàn tuyệt đối.",
                                icon: "🏥",
                                gradient: "from-purple-500 to-pink-500"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

            {/* === Featured Services === */}
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
                        {[
                            {
                                title: "Khám tổng quát",
                                desc: "Đánh giá tổng thể tình trạng sức khỏe với quy trình khám toàn diện và chuyên nghiệp.",
                                icon: "🔍",
                                color: "bg-blue-500"
                            },
                            {
                                title: "Khám chuyên khoa",
                                desc: "Điều trị chuyên sâu theo từng lĩnh vực như tim mạch, nội tiết, thần kinh...",
                                icon: "⚕️",
                                color: "bg-green-500"
                            },
                            {
                                title: "Xét nghiệm & Chẩn đoán",
                                desc: "Công nghệ xét nghiệm hiện đại với kết quả chính xác và nhanh chóng.",
                                icon: "🧪",
                                color: "bg-purple-500"
                            }
                        ].map((service, index) => (
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
                                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

            {/* === Featured Doctors === */}
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
                        {[
                            {
                                name: "TS. BS. Nguyễn Phúc Thiện",
                                spec: "Tim mạch",
                                img: "https://cdn.medpro.vn/prod-partner/29e26328-649d-413c-9b1d-3a1a131688ab-baac_saa(c)_thiaaan.jpg",
                                experience: "15+ năm kinh nghiệm"
                            },
                            {
                                name: "ThS. BS. Trần Thị Oanh",
                                spec: "Sản khoa",
                                img: "https://cdn.medpro.vn/prod-partner/0478ff2f-00fd-478a-a52f-49396cf6ac75-bs_traaoan_thaaa_oanh.png",
                                experience: "12+ năm kinh nghiệm"
                            },
                            {
                                name: "BS. Vũ Đình Khôi",
                                spec: "Nhi khoa",
                                img: "https://cdn.medpro.vn/prod-partner/fed8b62f-6f24-46bf-bfd4-7378a6bee398-bs_vaa(c)_aaaanh_khaai.png",
                                experience: "10+ năm kinh nghiệm"
                            }
                        ].map((doc, index) => (
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

            {/* === Patient Testimonials === */}
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
                        {[
                            {
                                name: "Nguyễn Thị Hoa",
                                feedback: "Dịch vụ tuyệt vời! Bác sĩ rất tận tâm, hướng dẫn chi tiết và chu đáo. Tôi cảm thấy rất an tâm khi được chăm sóc ở đây.",
                                avatar: "https://cdn.medpro.vn/prod-partner/3126ceaa-54ae-4916-a2a0-9d83d45b5561-mai-vy.jpg",
                                rating: 5
                            },
                            {
                                name: "Trần Văn Tài",
                                feedback: "Giao diện ứng dụng thân thiện, đặt lịch nhanh chóng. Quy trình khám bệnh chuyên nghiệp và hiệu quả.",
                                avatar: "https://cdn.medpro.vn/prod-partner/d86082a5-b561-4904-a6c5-0122d8965ba9-nhan-nguyen.jpg",
                                rating: 5
                            },
                            {
                                name: "Lê Hồng Nhung",
                                feedback: "Hệ thống quản lý hồ sơ bệnh án rất tiện lợi. Có thể theo dõi lịch hẹn và kết quả khám một cách dễ dàng.",
                                avatar: "https://cdn.medpro.vn/prod-partner/c76c323f-452f-4675-81b1-2c6fcd56e6a0-moc-tra.jpg",
                                rating: 5
                            }
                        ].map((fb, index) => (
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
                                            className="w-16 h-16 object-cover rounded-full border-3 border-white dark:border-gray-600 shadow-md"
                                        />
                                        <div className="ml-4">
                                            <h4 className="font-bold text-gray-900 dark:text-white">
                                                {fb.name}
                                            </h4>
                                            <div className="flex text-yellow-400">
                                                {[...Array(fb.rating)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
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

            {/* === Latest Health Articles === */}
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
                        {[
                            {
                                title: "Cách phát hiện sớm bệnh tiểu đường",
                                desc: "Những dấu hiệu cần lưu ý và phương pháp kiểm soát hiệu quả để ngăn ngừa biến chứng.",
                                image: "https://ksbtdanang.vn/uploads/chuyen-mon/2023_02/image-20230209100718-1.png",
                                readTime: "5 phút đọc",
                                category: "Nội tiết"
                            },
                            {
                                title: "Bí quyết tăng cường miễn dịch tự nhiên",
                                desc: "Hướng dẫn dinh dưỡng và lối sống để xây dựng hệ miễn dịch khỏe mạnh từ bên trong.",
                                image: "https://duocanphuc.vn/wp-content/uploads/2022/06/Tang-Cuong-He-Mien-Dich.jpg",
                                readTime: "7 phút đọc",
                                category: "Dinh dưỡng"
                            },
                            {
                                title: "Tầm quan trọng của khám sức khỏe định kỳ",
                                desc: "Vì sao nên khám định kỳ 6 tháng một lần và những điều cần lưu ý để bảo vệ sức khỏe.",
                                image: "https://login.medlatec.vn//ImagePath/images/20200512/20200512_kham-suc-khoe-dinh-ki-01.jpg",
                                readTime: "6 phút đọc",
                                category: "Tổng quát"
                            }
                        ].map((blog, index) => (
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA Section === */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Sẵn sàng chăm sóc sức khỏe của bạn?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Đừng để sức khỏe chờ đợi. Đặt lịch hẹn ngay hôm nay để được tư vấn từ các chuyên gia hàng đầu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/patient/book-appointment">
                                <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                                    Đặt lịch ngay
                                </button>
                            </Link>
                            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-300">
                                Gọi tư vấn: 1900 2115
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === Welcome Section for logged-in users === */}
            {user && (
                <motion.section
                    className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 py-16 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Chào mừng trở lại, {user.username}! 👋
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Quản lý lịch hẹn và hồ sơ sức khỏe của bạn một cách dễ dàng
                            </p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {[
                                    {
                                        title: "Lịch hẹn của tôi",
                                        desc: "Xem và quản lý các cuộc hẹn",
                                        icon: "📅",
                                        link: "/patient/appointments"
                                    },
                                    {
                                        title: "Hồ sơ bệnh án",
                                        desc: "Theo dõi lịch sử khám bệnh",
                                        icon: "📋",
                                        link: "/patient/medical-records"
                                    },
                                    {
                                        title: "Đặt lịch mới",
                                        desc: "Tìm và đặt lịch với bác sĩ",
                                        icon: "🩺",
                                        link: "/patient/book-appointment"
                                    }
                                ].map((item, index) => (
                                    <Link key={index} to={item.link}>
                                        <motion.div
                                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
                                            whileHover={{ y: -5 }}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                        >
                                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                                {item.icon}
                                            </div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Profile completion alert */}
                        {showProfileAlert && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100 dark:border-gray-700"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Hoàn thiện hồ sơ
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Vui lòng cập nhật thông tin cá nhân để sử dụng đầy đủ các tính năng và đặt lịch hẹn.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link to="/patient/profile" className="flex-1">
                                            <button className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-300">
                                                Cập nhật ngay
                                            </button>
                                        </Link>
                                        <button
                                            onClick={closeProfileAlert}
                                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors duration-300"
                                        >
                                            Để sau
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </motion.section>
            )}
        </div>
    );
};

export default Home;

