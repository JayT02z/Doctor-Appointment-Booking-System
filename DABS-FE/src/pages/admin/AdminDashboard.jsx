import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    activeAppointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [payments, setPayments] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState([]);
  const [editingAppointmentStatus, setEditingAppointmentStatus] = useState(null);
  const [newAppointmentStatus, setNewAppointmentStatus] = useState("");

  const itemsPerPage = 15;
  const [doctorPage, setDoctorPage] = useState(1);
  const [patientPage, setPatientPage] = useState(1);
  const [appointmentPage, setAppointmentPage] = useState(1);
  const [userPage, setUserPage] = useState(1);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [doctorsRes, patientsRes, appointmentsRes, usersRes, paymentsRes] = await Promise.all([
        axios.get("http://localhost:8080/api/doctor/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/patient", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/appointment/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/auth/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/payment", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const doctors = doctorsRes.data.data || [];
      const patients = patientsRes.data.data || [];
      const appointments = appointmentsRes.data.data || [];
      const users = usersRes.data.data || [];
      const payments = paymentsRes.data.data || [];

      setDoctors(doctors);
      setPatients(patients);
      setAppointments(appointments);
      setUsers(users);
      setPayments(payments);

      const activeAppointments = appointments.filter(
          (appt) => appt.status === "ACTIVE"
      ).length;

      setStats({
        totalDoctors: doctors.length,
        totalPatients: patients.length,
        totalAppointments: appointments.length,
        activeAppointments,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái cuộc hẹn này?")) {
        await axios.put(
            `http://localhost:8080/api/appointment/status/${appointmentId}`,
            { status: newStatus },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
        );
        toast.success("Trạng thái cuộc hẹn đã được cập nhật");

        // Cập nhật state appointments
        setAppointments(
            appointments.map((appt) =>
                appt.id === appointmentId ? { ...appt, status: newStatus } : appt
            )
        );
        setEditingAppointmentStatus(null); // Reset trạng thái chỉnh sửa
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái cuộc hẹn:", error);
      toast.error("Không thể cập nhật trạng thái cuộc hẹn");
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/patient/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Patient deleted successfully");
      setPatients(patients.filter((patient) => patient.id !== id));
      setStats((prevStats) => ({
        ...prevStats,
        totalPatients: prevStats.totalPatients - 1,
      }));
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient");
    }
  };

  const handleConfirmPayment = async (paymentId) => {
    try {
      // Optimistic update (cập nhật giao diện ngay lập tức)
      const updatedPayments = payments.map((payment) =>
          payment.id === paymentId
              ? { ...payment, status: "PAID" }
              : payment
      );
      setPayments(updatedPayments);

      await axios.put(
          `http://localhost:8080/api/payment/confirmpayment/${paymentId}`,
          { status: "PAID" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );

      toast.success("Payment confirmed successfully");
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error(
          error.response?.data?.message || "Failed to confirm payment"
      );
      setPayments(
          payments.map((payment) =>
              payment.id === paymentId
                  ? { ...payment, status: "PENDING" }
                  : payment
          )
      );
    }
  };

  const handleEditRole = (user) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleSaveRole = async () => {
    try {
      console.log("Saving role:", newRole, editingUser.id);
      await axios.post(
          "http://localhost:8080/api/v1/auth/changerole",
          { id: editingUser.id, role: [newRole] },
      );
      toast.success("Role updated successfully");

      // Cập nhật state users
      setUsers(
          users.map((user) =>
              user.id === editingUser.id ? { ...user, role: newRole } : user
          )
      );

      setEditingUser(null); // Reset trạng thái chỉnh sửa
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );
  }

  const paginatedDoctors = doctors.slice((doctorPage - 1) * itemsPerPage, doctorPage * itemsPerPage);
  const paginatedPatients = patients.slice((patientPage - 1) * itemsPerPage, patientPage * itemsPerPage);
  const paginatedAppointments = appointments.slice((appointmentPage - 1) * itemsPerPage, appointmentPage * itemsPerPage);
  const paginatedUsers = users.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);

  return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Dashboard
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-100 p-4 rounded">
              <h4 className="text-lg font-semibold">Doctors</h4>
              <p>{stats.totalDoctors}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h4 className="text-lg font-semibold">Patients</h4>
              <p>{stats.totalPatients}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded">
              <h4 className="text-lg font-semibold">Appointments</h4>
              <p>{stats.totalAppointments}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <h4 className="text-lg font-semibold">Active Appointments</h4>
              <p>{stats.activeAppointments}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button onClick={() => setActiveSection("doctors")}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">Manage
                Doctors
              </button>
              <button onClick={() => setActiveSection("patients")}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">Manage
                Patients
              </button>
              <button onClick={() => setActiveSection("appointments")}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">Manage
                Appointments
              </button>
              <button onClick={() => setActiveSection("users")}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">Manage
                Users
              </button>
            </div>
          </div>

          {/* Doctors List */}
          {activeSection === "doctors" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Doctors List
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Specialization
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Experience
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Qualification
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Hospital
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedDoctors.map((doctor) => (
                        <tr key={doctor.id}>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {doctor.fullName}
                          </td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {doctor.specialization}
                          </td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {doctor.experience} years
                          </td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {doctor.qualification}
                          </td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {doctor.hospital}
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => setDoctorPage((p) => Math.max(1, p - 1))} disabled={doctorPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50">Prev
                  </button>
                  <button onClick={() => setDoctorPage((p) => p + 1)}
                          disabled={doctorPage * itemsPerPage >= doctors.length}
                          className="px-3 py-1 border rounded disabled:opacity-50">Next
                  </button>
                </div>
              </div>
          )}

          {/* Patients List */}
          {activeSection === "patients" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Patients List</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Username</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Date of
                        Birth
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Gender</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Address</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Medical
                        History
                      </th>
                      <th className="px-6 py-3 border-b"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{patient.username}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{patient.dob?.join("-")}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{patient.gender}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{patient.address}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{patient.medicalHistory}</td>
                          <td className="px-6 py-4 border-b text-sm text-right">
                            <button
                                onClick={() => handleDeletePatient(patient.id)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => setPatientPage((p) => Math.max(1, p - 1))} disabled={patientPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50">Prev
                  </button>
                  <button onClick={() => setPatientPage((p) => p + 1)}
                          disabled={patientPage * itemsPerPage >= patients.length}
                          className="px-3 py-1 border rounded disabled:opacity-50">Next
                  </button>
                </div>
              </div>
          )}

          {/* Appointments List */}
          {activeSection === "appointments" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointments List</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Patient</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Doctor</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Time
                        Slot
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 border-b">
                        Actions
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedAppointments.map((appt) => {
                      const payment = payments.find(
                          (p) => p.appointment.id === appt.id
                      );

                      return (
                          <tr key={appt.id}>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {appt.patientName.username}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {appt.doctorName}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {appt.serviceName}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {appt.date?.join("-")}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {appt.timeSlot}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {editingAppointmentStatus === appt.id ? (
                                  <select
                                      value={newAppointmentStatus}
                                      onChange={(e) => setNewAppointmentStatus(e.target.value)}
                                  >
                                    <option value="PENDING">PENDING</option>
                                    <option value="CONFIRMED">CONFIRMED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                  </select>
                              ) : (
                                  appt.status
                              )}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-right">
                              {editingAppointmentStatus === appt.id ? (
                                  <>
                                    <button
                                        onClick={() => handleUpdateAppointmentStatus(appt.id, newAppointmentStatus)}
                                        className="bg-green-500 hover:bg-green-700 text-white text-xs px-2 py-1 rounded mr-2"
                                    >
                                      Lưu
                                    </button>
                                    <button
                                        onClick={() => setEditingAppointmentStatus(null)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs px-2 py-1 rounded"
                                    >
                                      Hủy
                                    </button>
                                  </>
                              ) : (
                                  <button
                                      onClick={() => {
                                        setEditingAppointmentStatus(appt.id);
                                        setNewAppointmentStatus(appt.status);
                                      }}
                                      className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                                  >
                                    Sửa
                                  </button>
                              )}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-gray-700">
                              {payment ? payment.status : "N/A"}
                            </td>
                            <td className="px-6 py-4 border-b text-sm text-right">
                              {payment && payment.status === "PENDING" && (
                                  <button
                                      onClick={() => handleConfirmPayment(payment.id)}
                                      className="bg-green-500 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                                  >
                                    Confirm
                                  </button>
                              )}
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => setAppointmentPage((p) => Math.max(1, p - 1))} disabled={appointmentPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50">Prev
                  </button>
                  <button onClick={() => setAppointmentPage((p) => p + 1)}
                          disabled={appointmentPage * itemsPerPage >= appointments.length}
                          className="px-3 py-1 border rounded disabled:opacity-50">Next
                  </button>
                </div>
              </div>
          )}

          {/* Users List */}
          {activeSection === "users" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Users List</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Username</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Created
                        At
                      </th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.username}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.email}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.phone}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.role}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.createdAt?.slice(0, 3).join("-")}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">{user.status}</td>
                          <td className="px-6 py-4 border-b text-sm text-gray-700">
                            {editingUser === user ? (
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                  <option value="DOCTOR">DOCTOR</option>
                                  <option value="PATIENT">PATIENT</option>
                                </select>
                            ) : (
                                user.role
                            )}
                          </td>
                          <td className="px-6 py-4 border-b text-sm text-right">
                            {editingUser === user ? (
                                <>
                                  <button
                                      onClick={handleSaveRole}
                                      className="bg-green-500 hover:bg-green-700 text-white text-xs px-2 py-1 rounded mr-2"
                                  >
                                    Save
                                  </button>
                                  <button
                                      onClick={() => setEditingUser(null)}
                                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    Cancel
                                  </button>
                                </>
                            ) : (
                                user.role === "PATIENT" || user.role === "DOCTOR" ? (
                                    <button
                                        onClick={() => handleEditRole(user)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                                    >
                                      Edit Role
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-white text-xs px-2 py-1 rounded cursor-not-allowed"
                                    >
                                      Edit Role
                                    </button>
                                )
                            )}
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button onClick={() => setUserPage((p) => Math.max(1, p - 1))} disabled={userPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50">Prev
                  </button>
                  <button onClick={() => setUserPage((p) => p + 1)} disabled={userPage * itemsPerPage >= users.length}
                          className="px-3 py-1 border rounded disabled:opacity-50">Next
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default AdminDashboard;
