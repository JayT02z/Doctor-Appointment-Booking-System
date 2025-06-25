import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAppointments = (doctorId, activeTab, statusFilter) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/appointment/doctor/${doctorId}`);
            const allAppointments = res.data.data || [];

            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);

            const filtered = allAppointments.filter((appt) => {
                const apptDate = new Date(appt.date[0], appt.date[1] - 1, appt.date[2]);
                apptDate.setHours(0, 0, 0, 0);

                const matchTab =
                    (activeTab === 'today' && apptDate.getTime() === todayDate.getTime()) ||
                    (activeTab === 'upcoming' && apptDate.getTime() > todayDate.getTime()) ||
                    (activeTab === 'past' && apptDate.getTime() < todayDate.getTime()) ||
                    (activeTab === 'completed' && appt.status === 'COMPLETED') ||
                    (activeTab === 'cancelled' && appt.status === 'CANCELLED');

                const matchStatus =
                    ['today', 'upcoming'].includes(activeTab)
                        ? statusFilter === 'ALL' || appt.status === statusFilter
                        : true;

                return matchTab && matchStatus;
            });

            setAppointments(filtered);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
            toast.error("Failed to load appointments");
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const res = await axios.put(
                `http://localhost:8080/api/appointment/status/${appointmentId}`,
                { status }
            );
            if (res.data.statusCode === 200) {
                toast.success("Appointment status updated");
                fetchAppointments();
            }
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error("Update failed");
        }
    };

    return {
        appointments,
        fetchAppointments,
        loading,
        handleUpdateStatus
    };
};