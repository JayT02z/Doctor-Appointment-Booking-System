import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { user, patientId } = useAuth();
  const [showProfileAlert, setShowProfileAlert] = useState(false);

  useEffect(() => {
    if (user && user.role === "PATIENT" && !patientId) {
      setShowProfileAlert(true);
    }
  }, [user, patientId]);

  const closeProfileAlert = () => setShowProfileAlert(false);

  return (
      <div className="w-full">
        {/* === Banner === */}
        <div className="relative w-full h-[400px] bg-[url('https://cdn.medpro.vn/prod-partner/92b6d682-4b5a-4c94-ac54-97a077c0c6c5-homepage_banner.webp')] bg-cover bg-center flex items-center justify-center">
          <div className="bg-black/50 p-10 rounded-xl text-center text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Chăm sóc sức khỏe của bạn là sứ mệnh của chúng tôi</h1>
            <p className="mb-6 text-lg">Đặt lịch hẹn với bác sĩ chuyên khoa hàng đầu chỉ trong vài cú click.</p>
            <Link to="/patient/book-appointment">
              <button className="text-lg px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                Đặt lịch ngay
              </button>
            </Link>
          </div>
        </div>

        {/* === Giới thiệu nhanh === */}
        <div className="py-16 px-4 md:px-20 bg-white text-center">
          <h2 className="text-3xl font-semibold mb-6">Tại sao chọn chúng tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img src="../../public/doctor.png" className="w-16 h-16 mb-4" alt="Doctor Icon" />
              <h3 className="text-xl font-bold mb-2">Bác sĩ chuyên môn cao</h3>
              <p>Đội ngũ bác sĩ dày dặn kinh nghiệm, luôn đặt sức khỏe của bạn lên hàng đầu.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="../../public/hospital.png" className="w-16 h-16 mb-4" alt="Hospital Icon" />
              <h3 className="text-xl font-bold mb-2">Cơ sở vật chất hiện đại</h3>
              <p>Trang thiết bị tiên tiến, phòng khám tiện nghi và sạch sẽ đạt chuẩn quốc tế.</p>
            </div>
          </div>
        </div>

        {/* === Dịch vụ nổi bật === */}
        <div className="py-16 px-4 md:px-20 bg-gray-50 text-center">
          <h2 className="text-3xl font-semibold mb-6">Dịch vụ nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Khám tổng quát", desc: "Đánh giá tổng thể tình trạng sức khỏe của bạn." },
              { title: "Khám chuyên khoa", desc: "Chuyên sâu theo từng chuyên ngành như tim mạch, nội tiết..." },
              { title: "Xét nghiệm & Chẩn đoán", desc: "Cung cấp kết quả chính xác và nhanh chóng." }
            ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-primary-600 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
            ))}
          </div>
        </div>

        {/* === Bác sĩ nổi bật === */}
        <div className="py-16 px-4 md:px-20 bg-white text-center">
          <h2 className="text-3xl font-semibold mb-6">Bác sĩ nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "TS. BS. Nguyễn Phúc Thiện", spec: "Tim mạch", img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F29e26328-649d-413c-9b1d-3a1a131688ab-baac_saa(c)_thiaaan.jpg&w=384&q=75" },
              { name: "ThS. BS. Trần Thị Oanh", spec: "Sản khoa", img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F0478ff2f-00fd-478a-a52f-49396cf6ac75-bs_traaoan_thaaa_oanh.png&w=384&q=75" },
              { name: "BS. Vũ Đình Khôi", spec: "Nhi khoa", img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Ffed8b62f-6f24-46bf-bfd4-7378a6bee398-bs_vaa(c)_aaaanh_khaai.png&w=384&q=75" },
            ].map((doctor, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                  <img src={doctor.img} alt={doctor.name} className="w-24 h-24 object-cover mx-auto rounded-full mb-4" />
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-primary-600">{doctor.spec}</p>
                </div>
            ))}
          </div>
        </div>

        {/* === Feedback khách hàng === */}
        <div className="py-16 px-4 md:px-20 bg-gray-50 text-center">
          <h2 className="text-3xl font-semibold mb-6">Phản hồi từ bệnh nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thị Hoa",
                feedback: "Dịch vụ rất tốt, bác sĩ tận tâm và hướng dẫn rõ ràng. Tôi rất hài lòng!",
                avatar: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F3126ceaa-54ae-4916-a2a0-9d83d45b5561-mai-vy.jpg&w=1920&q=75"
              },
              {
                name: "Trần Văn Tài",
                feedback: "Giao diện dễ sử dụng, đặt lịch cực kỳ nhanh chóng.",
                avatar: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fd86082a5-b561-4904-a6c5-0122d8965ba9-nhan-nguyen.jpg&w=1920&q=75"
              },
              {
                name: "Lê Hồng Nhung",
                feedback: "Cảm ơn hệ thống đã giúp tôi theo dõi lịch hẹn và bệnh án dễ dàng hơn.",
                avatar: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc76c323f-452f-4675-81b1-2c6fcd56e6a0-moc-tra.jpg&w=1920&q=75"
              }
            ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                  <img src={item.avatar} alt={item.name} className="w-16 h-16 object-cover mx-auto rounded-full mb-4" />
                  <p className="italic text-gray-600">"{item.feedback}"</p>
                  <p className="mt-4 font-semibold">{item.name}</p>
                </div>
            ))}
          </div>
        </div>

          {/* === Blog y tế === */}
          <div className="py-16 px-4 md:px-20 bg-white text-center">
              <h2 className="text-3xl font-semibold mb-6">Bài viết y tế mới nhất</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                      {
                          title: "Cách phát hiện sớm bệnh tiểu đường",
                          desc: "Những dấu hiệu đầu tiên và cách kiểm soát hiệu quả...",
                          image: "https://ksbtdanang.vn/uploads/chuyen-mon/2023_02/image-20230209100718-1.png",
                      },
                      {
                          title: "Bí quyết tăng cường miễn dịch tự nhiên",
                          desc: "Ăn gì, sinh hoạt ra sao để có hệ miễn dịch khỏe mạnh...",
                          image: "https://duocanphuc.vn/wp-content/uploads/2022/06/Tang-Cuong-He-Mien-Dich.jpg",
                      },
                      {
                          title: "Tầm quan trọng của khám sức khỏe định kỳ",
                          desc: "Vì sao nên khám mỗi 6 tháng và những gì cần lưu ý...",
                          image: "https://login.medlatec.vn//ImagePath/images/20200512/20200512_kham-suc-khoe-dinh-ki-01.jpg",
                      },
                  ].map((blog, index) => (
                      <motion.div
                          key={index}
                          className="bg-gray-50 rounded-lg shadow hover:shadow-lg overflow-hidden"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          viewport={{ once: true }}
                      >
                          <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                          <div className="p-6 text-left">
                              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                              <p className="text-gray-600 mb-4">{blog.desc}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>

          {/* === Patient Dashboard Section (nếu đã đăng nhập) === */}
        {user && (
            <div className="bg-gray-50 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Welcome back, {user.username}!
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Manage your appointments and health records
                  </p>

                  {showProfileAlert && (
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Complete Your Profile
                                  </h3>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Please complete your profile information to access all features.
                                      <Link to="/patient/profile" className="text-blue-500 hover:underline ml-2">
                                        Go to Profile
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                  type="button"
                                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50"
                                  onClick={closeProfileAlert}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Home;
