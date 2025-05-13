import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import FeedbackModal from "./Feedbacks.jsx";

const Appointments = () => {
  const { user, token, patientId } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [payments, setPayments] = useState({}); // State để lưu trữ thông tin thanh toán

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
          `http://localhost:8080/api/appointment/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      if (response.data.statusCode === 200) {
        setAppointments(response.data.data);
        // Sau khi lấy được thông tin appointment, gọi API để lấy thông tin thanh toán
        fetchPayments();
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const paymentResponse = await axios.get(
          `http://localhost:8080/api/payment/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      if (paymentResponse.data.statusCode === 200) {
        // Chuyển đổi dữ liệu thanh toán sang một object để dễ dàng truy cập
        const paymentsData = {};
        paymentResponse.data.data.forEach((payment) => {
          paymentsData[payment.appointmentId] = payment;
        });
        setPayments(paymentsData);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payment information");
    }
  };

  const filterAppointments = (tab) => {
    const now = dayjs();
    return appointments.filter((appointment) => {
      const appointmentDate = dayjs(appointment.date);
      if (tab === "today") {
        return appointmentDate.isSame(now, "day");
      } else if (tab === "upcoming") {
        return appointmentDate.isAfter(now, "day");
      } else {
        return appointmentDate.isBefore(now, "day");
      }
    });
  };

  const openFeedbackModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setSelectedAppointment(null);
    setShowFeedbackModal(false);
  };

  const formatTimeSlot = (slot) => {
    if (!slot) return "";
    const parts = slot.replace("SLOT_", "").split("_");
    if (parts.length === 2) {
      return `${parts[0]}:00 - ${parts[1]}:00`;
    }
    return slot;
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );
  }

  const filteredAppointments = filterAppointments(activeTab);

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
              {["today", "upcoming", "past"].map((tab) => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                          activeTab === tab
                              ? "border-primary-500 text-primary-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
              ))}
            </nav>
          </div>

          {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab} appointments found.</p>
              </div>
          ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => {
                  const payment = payments[appointment.id];
                  return (
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
                              {dayjs(appointment.date).format("DD-MM-YYYY")} at{" "}
                              {formatTimeSlot(appointment.timeSlot)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              specialization: {appointment.specialization}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Note of patient: {appointment.notes}
                            </p>
                            {payment && (
                                <>
                                  <p className="text-sm text-gray-700 mt-1">
                                    Price: ${payment.amount}
                                  </p>
                                  <p
                                      className={`text-sm font-medium mt-1 ${
                                          payment.status === "PENDING"
                                              ? "text-yellow-600"
                                              : payment.status === "PAID"
                                                  ? "text-green-600"
                                                  : "text-red-600"
                                      }`}
                                  >
                                    Payment Status: {payment.status}
                                  </p>
                                </>
                            )}
                          </div>
                          <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                  appointment.status === "PENDING"
                                      ? "bg-blue-100 text-blue-800"
                                      : appointment.status === "COMPLETED"
                                          ? "bg-green-100 text-green-800"
                                          : appointment.status === "CANCELLED"
                                              ? "bg-red-100 text-red-800"
                                              : "bg-gray-100 text-gray-800"
                              }`}
                          >
                      {appointment.status}
                    </span>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          {appointment.status === "SCHEDULED" && (
                              <button
                                  onClick={() =>
                                      toast("Cancel functionality not yet implemented.")
                                  }
                                  className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                              >
                                Cancel
                              </button>
                          )}
                          {appointment.meetingLink && (
                              <button
                                  onClick={() =>
                                      window.open(appointment.meetingLink, "_blank")
                                  }
                                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                              >
                                Join Meeting
                              </button>
                          )}
                          {appointment.status === "COMPLETED" && (
                              <button
                                  onClick={() => openFeedbackModal(appointment)}
                                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                              >
                                {appointment.feedback ? "Update Feedback" : "Give Feedback"}
                              </button>
                          )}
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </div>

        {showFeedbackModal && selectedAppointment && (
            <FeedbackModal
                isOpen={showFeedbackModal}
                onClose={closeFeedbackModal}
                appointment={selectedAppointment}
                patientId={user.id}
            />
        )}
      </div>
  );
};

export default Appointments;