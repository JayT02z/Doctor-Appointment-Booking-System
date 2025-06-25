import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { motion } from 'framer-motion';
import { Plus, Check, Package, ListChecks, Save } from 'lucide-react';

const DoctorServices = () => {
    const { doctorId } = useAuth();
    const [allServices, setAllServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [existingDoctorServices, setExistingDoctorServices] = useState([]);
    const [tempSelectedServices, setTempSelectedServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Lấy tất cả dịch vụ
                const allServicesResponse = await axios.get("http://localhost:8080/api/services/all");
                if (allServicesResponse.data.statusCode === 200 && Array.isArray(allServicesResponse.data.data)) {
                    setAllServices(allServicesResponse.data.data);
                } else {
                    toast.error("Lỗi định dạng dữ liệu trả về từ API lấy tất cả dịch vụ");
                }

                // Lấy thông tin bác sĩ và dịch vụ đã chọn
                const doctorResponse = await axios.get(`http://localhost:8080/api/doctor/doctor/${doctorId}`);
                if (doctorResponse.data.statusCode === 200 && doctorResponse.data.data) {
                    const doctorData = doctorResponse.data.data;
                    setExistingDoctorServices(doctorData.services || []);
                    setSelectedServices((doctorData.services || []).map(service => service.id));
                    setTempSelectedServices((doctorData.services || []).map(service => service.id));
                } else {
                    toast.error("Lỗi định dạng dữ liệu trả về từ API lấy thông tin bác sĩ");
                }

            } catch (error) {
                console.error(error);
                toast.error("Không thể tải dữ liệu dịch vụ");
            }
        };

        fetchServices();
    }, [doctorId]);

    const toggleService = (id) => {
        setTempSelectedServices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/services/doctor/addservice", {
                doctorId,
                services: tempSelectedServices
            });

            if (response.data.statusCode === 200) {
                toast.success("Cập nhật dịch vụ thành công");
            } else {
                toast.error("Cập nhật dịch vụ thất bại");
                console.log(response.data.message); // Assuming the error message is in response.data.message
            }

            // Sau khi lưu, tải lại thông tin bác sĩ để cập nhật danh sách dịch vụ đã chọn
            const doctorResponse = await axios.get(`http://localhost:8080/api/doctor/doctor/${doctorId}`);
            if (doctorResponse.data.statusCode === 200 && doctorResponse.data.data) {
                const doctorData = doctorResponse.data.data;
                setExistingDoctorServices(doctorData.services || []);
                setSelectedServices((doctorData.services || []).map(service => service.id));
                setTempSelectedServices((doctorData.services || []).map(service => service.id));
            }

        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật dịch vụ");
        }
    };

    // Lọc các dịch vụ chưa được chọn (dựa trên existingDoctorServices)
    const availableServices = allServices.filter(service => !existingDoctorServices.some(existingService => existingService.id === service.id));

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                    <Package className="h-6 w-6 text-[#00B5F1]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Quản Lý Dịch Vụ</h2>
            </div>

            {/* Available Services Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                    <Plus className="h-5 w-5 text-[#00B5F1]" />
                    <h3 className="text-lg font-semibold text-gray-700">Chọn Dịch Vụ Cung Cấp</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableServices.map(service => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => toggleService(service.id)}
                            className={`group relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                ${tempSelectedServices.includes(service.id)
                                    ? 'border-[#00B5F1] bg-[#00B5F1]/5 shadow-lg shadow-[#00B5F1]/10'
                                    : 'border-gray-100 bg-white hover:border-[#00B5F1]/30 hover:shadow-md'
                                }`}
                        >
                            {tempSelectedServices.includes(service.id) && (
                                <div className="absolute top-3 right-3">
                                    <Check className="h-5 w-5 text-[#00B5F1]" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg text-gray-900 pr-8">{service.name}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                                <div className="pt-2">
                                    <span className="inline-block px-3 py-1 bg-[#00B5F1]/10 text-[#00B5F1] rounded-lg text-sm font-medium">
                                        {service.price.toLocaleString("vi-VN")}₫
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Selected Services Section */}
            <div className="space-y-4 mt-12">
                <div className="flex items-center gap-2 mb-6">
                    <ListChecks className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-700">Dịch Vụ Đã Chọn</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {existingDoctorServices.map(service => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50"
                        >
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg text-gray-900">{service.name}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                                <div className="pt-2">
                                    <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                                        {service.price.toLocaleString("vi-VN")}₫
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-10 flex justify-end">
                <button
                    onClick={handleSave}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00B5F1] to-[#0099cc]
                             text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00B5F1]/20
                             active:scale-[0.98] transition-all duration-200"
                >
                    <Save className="h-5 w-5" />
                    Lưu Dịch Vụ
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                                  translate-x-[-100%] animate-shimmer rounded-xl" />
                </button>
            </div>
        </div>
    );
};

export default DoctorServices;