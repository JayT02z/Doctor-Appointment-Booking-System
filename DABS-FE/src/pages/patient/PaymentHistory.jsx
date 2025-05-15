import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { FaMoneyBillAlt, FaUniversity, FaQrcode, FaMoneyCheckAlt } from "react-icons/fa";

const PaymentHistory = () => {
    const { patientId } = useAuth();
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/payment/patient/${patientId}`
                );
                setPaymentHistory(response.data.data || []);
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError(err.message || "Could not fetch payment history");
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPaymentHistory();
        }
    }, [patientId]);

    const formatCurrency = (amount) =>
        amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

    const formatDate = (dateArr) => {
        if (!dateArr || dateArr.length < 3) return "N/A";
        const [year, month, day] = dateArr;
        return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    };

    const formatTimeSlot = (slot) => {
        const timeParts = slot.replace('SLOT_', '').split('_');
        if (timeParts.length === 2) {
            return `${timeParts[0]}:00 - ${timeParts[1]}:00`;
        }
        return slot;
    };

    const renderPaymentMethod = (method) => {
        const baseClass = "inline-flex items-center gap-1 font-medium px-2 py-1 rounded-full text-sm";
        switch (method) {
            case "VNPAYQR":
                return <span className={`${baseClass} text-blue-600 bg-blue-100`}><FaQrcode /> VNPAY</span>;
            case "CASH":
                return <span className={`${baseClass} text-green-600 bg-green-100`}><FaMoneyBillAlt /> Tiền mặt</span>;
            case "BANKING":
                return <span className={`${baseClass} text-purple-600 bg-purple-100`}><FaUniversity /> Chuyển khoản</span>;
            case "MOMO":
                return <span className={`${baseClass} text-pink-600 bg-pink-100`}><FaMoneyCheckAlt /> MOMO</span>;
            default:
                return <span className={`${baseClass} text-gray-600 bg-gray-100`}>{method}</span>;
        }
    };

    const renderStatus = (status) => {
        const baseClass = "px-2 py-1 rounded-full text-xs font-semibold";
        switch (status) {
            case "PAID":
                return <span className={`${baseClass} bg-green-100 text-green-700`}>Đã thanh toán</span>;
            case "PENDING":
                return <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>Đang xử lý</span>;
            default:
                return <span className={`${baseClass} bg-gray-100 text-gray-700`}>{status}</span>;
        }
    };

    if (loading) return <div className="text-center py-10">Đang tải lịch sử thanh toán...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Payment History</h1>
            {paymentHistory.length === 0 ? (
                <p className="text-center text-gray-500">Không có lịch sử thanh toán.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow">
                    <table className="table-auto w-full bg-white text-sm text-left text-gray-700 border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-gray-800 uppercase text-xs">
                            <th className="py-3 px-4 border">Mã</th>
                            <th className="py-3 px-4 border">Bệnh Nhân</th>
                            <th className="py-3 px-4 border">Bác Sĩ</th>
                            <th className="py-3 px-4 border">Dịch Vụ</th>
                            <th className="py-3 px-4 border">Ngày</th>
                            <th className="py-3 px-4 border">Giờ</th>
                            <th className="py-3 px-4 border">Phương Thức</th>
                            <th className="py-3 px-4 border">Số Tiền</th>
                            <th className="py-3 px-4 border">Trạng Thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paymentHistory.map((payment) => {
                            const appointment = payment.appointment || {};
                            const patient = appointment.patientName || {};

                            return (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border">{payment.id}</td>
                                    <td className="py-3 px-4 border">{patient.username}</td>
                                    <td className="py-3 px-4 border">{appointment.doctorName}</td>
                                    <td className="py-3 px-4 border">{appointment.serviceName}</td>
                                    <td className="py-3 px-4 border">{formatDate(appointment.date)}</td>
                                    <td className="py-3 px-4 border">{formatTimeSlot(appointment.timeSlot)}</td>
                                    <td className="py-3 px-4 border">{renderPaymentMethod(payment.paymentMethod)}</td>
                                    <td className="py-3 px-4 border">{formatCurrency(payment.amount)}</td>
                                    <td className="py-3 px-4 border">{renderStatus(payment.status)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;