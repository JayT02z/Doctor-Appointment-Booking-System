import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/doctor/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200 && Array.isArray(response.data.data)) {
        setAppointments(response.data.data);
      } else {
        setAppointments([]); // fallback to empty array to prevent .filter() crash
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/appointments/${appointmentId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        toast.success("Appointment status updated successfully");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === "today") {
      return (
        appointmentDate.toDateString() === today.toDateString() &&
        appointment.status === "SCHEDULED"
      );
    } else if (activeTab === "upcoming") {
      return appointmentDate > today && appointment.status === "SCHEDULED";
    } else {
      return appointment.status === "COMPLETED";
    }
  });

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
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Welcome, Dr. {user?.username}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("today")}
              className={`${
                activeTab === "today"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Today's Appointments
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`${
                activeTab === "upcoming"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`${
                activeTab === "completed"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Completed
            </button>
          </nav>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No {activeTab} appointments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
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
                      {new Date(appointment.date).toLocaleDateString()} at{" "}
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Reason: {appointment.reason}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === "SCHEDULED"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  {appointment.status === "SCHEDULED" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(appointment.id, "COMPLETED")
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(appointment.id, "CANCELLED")
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() =>
                      window.open(appointment.meetingLink, "_blank")
                    }
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
