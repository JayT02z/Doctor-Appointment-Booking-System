import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useDoctor} from "../../context/DoctorContext.jsx";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { doctorId } = useDoctor();

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [activeTab, doctorId, statusFilter]);

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
            (activeTab === "today" && apptDate.getTime() === todayDate.getTime()) ||
            (activeTab === "upcoming" && apptDate.getTime() > todayDate.getTime()) ||
            (activeTab === "past" && apptDate.getTime() < todayDate.getTime()) ||
            (activeTab === "completed" && appt.status === "COMPLETED") ||
            (activeTab === "cancelled" && appt.status === "CANCELLED");

        const matchStatus =
            activeTab === "today" || activeTab === "upcoming"
                ? statusFilter === "ALL" || appt.status === statusFilter
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
          `http://localhost:8080/api/appointment/${appointmentId}/status`,
          { status }
      );
      if (res.data.statusCode === 200) {
        toast.success("Appointment status updated");

        // Automatically switch to correct tab after update
        if (status === "COMPLETED") {
          setActiveTab("completed");
        } else if (status === "CANCELLED") {
          setActiveTab("cancelled");
        } else {
          fetchAppointments(); // fallback for other statuses
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Update failed");
    }
  };

  const formatTimeSlot = (slot) => {
    const match = slot.match(/SLOT_(\d+)_*(\d*)/);
    if (!match) return slot;
    const from = match[1];
    const to = match[2];
    return to ? `${from}h - ${to}h` : `${from}h`;
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h2>
          </div>

          {/* Tabs */}
          {["today", "upcoming"].includes(activeTab) && (
              <div className="mb-4">
                <label className="text-sm font-medium mr-2">Filter status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                >
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                </select>
              </div>
          )}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                ["today", "Today's Appointments"],
                ["upcoming", "Upcoming"],
                ["past", "Past Appointments"],
                ["completed", "Completed"],
                ["cancelled", "Cancelled"],
              ].map(([key, label]) => (
                  <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`${
                          activeTab === key
                              ? "border-primary-500 text-primary-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {label}
                  </button>
              ))}
            </nav>
          </div>

          {appointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab} appointments found.</p>
              </div>
          ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.patientName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.date?.join("-")} at {formatTimeSlot(appointment.timeSlot)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            <strong>Service:</strong> {appointment.serviceName}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            <strong>Specialization:</strong> {appointment.specialization}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                                appointment.status === "PENDING"
                                    ? "bg-blue-100 text-blue-800"
                                    : appointment.status === "CONFIRMED"
                                        ? "bg-indigo-100 text-indigo-800"
                                        : appointment.status === "COMPLETED"
                                            ? "bg-green-100 text-green-800"
                                            : appointment.status === "CANCELLED"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-200 text-gray-800"
                            }`}
                        >
                    {appointment.status}
                  </span>
                      </div>

                      {["today", "upcoming"].includes(activeTab) && appointment.status === "PENDING" && (
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => handleUpdateStatus(appointment.id, "CONFIRMED")}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              Accept
                            </button>
                            <button
                                onClick={() => handleUpdateStatus(appointment.id, "CANCELLED")}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default DoctorDashboard;
