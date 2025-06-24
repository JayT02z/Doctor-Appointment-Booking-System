import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

/**
 * Hook xử lý toàn bộ dữ liệu lịch hẹn và thanh toán
 * @param {string} token - JWT token từ AuthContext
 * @param {string} patientId - ID của bệnh nhân
 */
const useAppointmentsData = (token, patientId) => {
    const [appointments, setAppointments] = useState([]);
    const [payments, setPayments] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("today");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/appointment/patient/${patientId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.data.statusCode === 200) {
                const fetchedAppointments = res.data.data;
                setAppointments(fetchedAppointments);
                fetchPayments(fetchedAppointments);
            }
        } catch (err) {
            console.error("Error fetching appointments:", err);
            toast.error("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async (appointments) => {
        try {
            const data = {};
            await Promise.all(
                appointments.map(async (appointment) => {
                    const res = await axios.get(
                        `http://localhost:8080/api/payment/appointment/${appointment.id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    if (res.data.statusCode === 200) {
                        data[appointment.id] = res.data.data[0];
                    }
                })
            );
            setPayments(data);
        } catch (err) {
            console.error("Error fetching payments:", err);
            toast.error("Failed to fetch payment information");
        }
    };

    const filterAppointments = () => {
        const now = dayjs();
        return appointments.filter((appointment) => {
            const appointmentDate = dayjs(appointment.date);
            const dateFilter =
                activeTab === "today"
                    ? appointmentDate.isSame(now, "day")
                    : activeTab === "upcoming"
                        ? appointmentDate.isAfter(now, "day")
                        : appointmentDate.isBefore(now, "day");

            const statusCondition =
                statusFilter === "ALL" || appointment.status === statusFilter;

            return dateFilter && statusCondition;
        });
    };

    return {
        loading,
        appointments,
        payments,
        activeTab,
        setActiveTab,
        statusFilter,
        setStatusFilter,
        filterAppointments,
        refreshAppointments: fetchAppointments,
    };
};

export default useAppointmentsData;