import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Appointments = () => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/patients/${user.id}/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const now = new Date();
    const appointmentDate = new Date(appointment.date);

    if (activeTab === "upcoming") {
      return appointmentDate >= now;
    } else {
      return appointmentDate < now;
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <Link
            to="/patient/book-appointment"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Book New Appointment
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
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
              onClick={() => setActiveTab("past")}
              className={`${
                activeTab === "past"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past
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
                      Dr. {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at{" "}
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {appointment.specialization}
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
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Cancel
                    </button>
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

export default Appointments;
