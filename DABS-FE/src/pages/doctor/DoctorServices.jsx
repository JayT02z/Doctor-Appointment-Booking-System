import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import consele from "react-modal/lib/helpers/bodyTrap.js";
import * as res from "autoprefixer";

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
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Chọn Dịch Vụ Cung Cấp</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableServices.map(service => (
                    <div
                        key={service.id}
                        className={`p-4 rounded border shadow hover:shadow-md transition cursor-pointer ${tempSelectedServices.includes(service.id) ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
                        onClick={() => toggleService(service.id)}
                    >
                        <h4 className="font-semibold text-lg mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm text-gray-700">
                            Giá: {service.price.toLocaleString("vi-VN")}₫
                        </p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-6">Dịch Vụ Đã Chọn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {existingDoctorServices.map(service => (
                    <div key={service.id} className="p-4 rounded border shadow bg-gray-50">
                        <h4 className="font-semibold text-lg mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm text-gray-700">
                            Giá: {service.price.toLocaleString("vi-VN")}₫
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right">
            <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
                >
                    Lưu Dịch Vụ
                </button>
            </div>
        </div>
    );
};

export default DoctorServices;