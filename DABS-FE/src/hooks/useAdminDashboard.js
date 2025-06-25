// hooks/useAdminDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export const useAdminDashboard = () => {
    const { token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalDoctors: 0, totalPatients: 0, totalAppointments: 0, activeAppointments: 0 });
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [selectedPatientPayments, setSelectedPatientPayments] = useState([]);

    const [activeSection, setActiveSection] = useState(null);
    const [editingAppointmentStatus, setEditingAppointmentStatus] = useState(null);
    const [newAppointmentStatus, setNewAppointmentStatus] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState("");

    const [doctorPage, setDoctorPage] = useState(1);
    const [patientPage, setPatientPage] = useState(1);
    const [appointmentPage, setAppointmentPage] = useState(1);
    const [userPage, setUserPage] = useState(1);
    const itemsPerPage = 10;

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [userRoleFilter, setUserRoleFilter] = useState("");

    const doctorPageState = { page: doctorPage, setPage: setDoctorPage, itemsPerPage };
    const patientPageState = { page: patientPage, setPage: setPatientPage, itemsPerPage };
    const appointmentPageState = { page: appointmentPage, setPage: setAppointmentPage, itemsPerPage };
    const userPageState = { page: userPage, setPage: setUserPage, itemsPerPage };

    const fetchStats = async () => {
        try {
            const [doctorsRes, patientsRes, appointmentsRes, usersRes, paymentsRes] = await Promise.all([
                axios.get("http://localhost:8080/api/doctor/all", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get("http://localhost:8080/api/patient", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get("http://localhost:8080/api/appointment/all", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get("http://localhost:8080/api/v1/auth/users/all", { headers: { Authorization: `Bearer ${token}` } }),
                axios.get("http://localhost:8080/api/payment", { headers: { Authorization: `Bearer ${token}` } }),
            ]);

            setDoctors(doctorsRes.data.data || []);
            setPatients(patientsRes.data.data || []);
            setAppointments(appointmentsRes.data.data || []);
            setUsers(usersRes.data.data || []);
            setPayments(paymentsRes.data.data || []);

            const activeAppointments = appointmentsRes.data.data.filter((appt) => appt.status === "COMPLETED").length;

            setStats({
                totalDoctors: doctorsRes.data.data.length,
                totalPatients: patientsRes.data.data.length,
                totalAppointments: appointmentsRes.data.data.length,
                activeAppointments,
            });
        } catch (err) {
            toast.error("Failed to fetch dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    const fetchPatientPayments = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/payment/patient/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.statusCode === 200) {
                setSelectedPatientPayments(response.data.data);
            } else {
                toast.error("Failed to fetch payment history");
            }
        } catch (err) {
            toast.error("Error fetching payment data");
        }
    };

    const handleDeletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/patient/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setPatients((prev) => prev.filter((p) => p.id !== id));
            toast.success("Patient deleted");
        } catch {
            toast.error("Failed to delete patient");
        }
    };

    const handleUpdateAppointmentStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8080/api/appointment/status/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
            setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
            toast.success("Appointment status updated");
        } catch {
            toast.error("Update failed");
        } finally {
            setEditingAppointmentStatus(null);
        }
    };

    const handleUpdatePaymentStatus = async (id, status) => {
        const toastId = toast.loading("Proccessing...");
        try {
            await axios.put(`http://localhost:8080/api/payment/confirmpayment/${id}`, {
                status,
            });

            setPayments((prev) =>
                prev.map((p) => (p.id === id ? { ...p, status } : p))
            );

            toast.success(`Status updated: ${status}`, { id: toastId });
        } catch (err) {
            toast.error("Update failed", { id: toastId });
        }
    };


    const handleConfirmPayment = async (id) => {
        const toastId = toast.loading("Confirming...");
        try {
            await axios.put(
                `http://localhost:8080/api/payment/confirmpayment/${id}`,
                { status: "PAID" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPayments((prev) =>
                prev.map((p) => (p.id === id ? { ...p, status: "PAID" } : p))
            );
            toast.success("Payment Confirm", { id: toastId });
        } catch {
            toast.error("Payment False", { id: toastId });
        }
    };

    const handleEditRole = (user) => {
        setEditingUser(user);
        setNewRole(user.role);
    };

    const handleSaveRole = async (role) => {
        try {
            await axios.post("http://localhost:8080/api/v1/auth/changerole", {
                id: editingUser.id,
                role: [role],
            });
            setUsers((prev) => prev.map((u) =>
                u.id === editingUser.id ? { ...u, role } : u
            ));
            toast.success("Role updated");
        } catch {
            toast.error("Update failed");
        } finally {
            setEditingUser(null);
        }
    };

    const filteredDoctors = doctors.filter(d => d.fullName.toLowerCase().includes(search.toLowerCase()));
    const filteredPatients = patients.filter(p => p.username.toLowerCase().includes(search.toLowerCase()));
    const filteredAppointments = appointments.filter(appt => {
        const keyword = search.toLowerCase();
        const matchSearch =
            appt.patientName.username.toLowerCase().includes(keyword) ||
            appt.doctorName.toLowerCase().includes(keyword);
        const matchStatus = statusFilter ? appt.status === statusFilter : true;
        const matchPayment = paymentFilter
            ? payments.find(p => p.appointment.id === appt.id)?.status === paymentFilter
            : true;
        return matchSearch && matchStatus && matchPayment;
    });
    const filteredUsers = users.filter(u => {
        const matchesSearch =
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = userRoleFilter ? u.role === userRoleFilter : true;
        return matchesSearch && matchesRole;
    });

    useEffect(() => { fetchStats(); }, []);

    return {
        loading, stats, doctors, patients, appointments, users, payments,
        activeSection, setActiveSection,
        editingAppointmentStatus, newAppointmentStatus, setNewAppointmentStatus, setEditingAppointmentStatus,
        editingUser, newRole, setNewRole, handleEditRole, handleSaveRole,
        handleDeletePatient, handleUpdateAppointmentStatus, handleUpdatePaymentStatus , handleConfirmPayment,
        doctorPageState, patientPageState, appointmentPageState, userPageState,
        search, setSearch, statusFilter, setStatusFilter, paymentFilter, setPaymentFilter,
        filteredDoctors, filteredPatients, filteredAppointments, filteredUsers,selectedPatientPayments,
        fetchPatientPayments, userRoleFilter, setUserRoleFilter, setEditingUser,
    };
};