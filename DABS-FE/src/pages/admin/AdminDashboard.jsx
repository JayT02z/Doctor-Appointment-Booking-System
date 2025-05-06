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
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
        axios.get("http://localhost:8080/api/doctor/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/patient", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/appointment/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const doctors = doctorsRes.data.data || [];
      const patients = patientsRes.data.data || [];
      const appointments = appointmentsRes.data.data || [];

      setDoctors(doctors);
      setPatients(patients);
      setAppointments(appointments);

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

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );
  }

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
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                  onClick={() => setActiveSection("doctors")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Manage Doctors
              </button>
              <button
                  onClick={() => setActiveSection("patients")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Manage Patients
              </button>
              <button
                  onClick={() => setActiveSection("appointments")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Manage Appointments
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
                    {doctors.map((doctor) => (
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
              </div>
          )}

          {/* Patients List */}
          {activeSection === "patients" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Patients List</h3>
                <ul className="bg-white shadow rounded divide-y divide-gray-200">
                  {patients.map((patient) => (
                      <li key={patient.id} className="px-4 py-3 text-gray-700">
                        {patient.name}
                      </li>
                  ))}
                </ul>
              </div>
          )}

          {/* Appointments List */}
          {activeSection === "appointments" && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointments List</h3>
                <ul className="bg-white shadow rounded divide-y divide-gray-200">
                  {appointments.map((appt) => (
                      <li key={appt.id} className="px-4 py-3 text-gray-700">
                        Appointment #{appt.id} - Status: {appt.status}
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
};

export default AdminDashboard;
