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
  const [payments, setPayments] = useState({});
  const [statusFilter, setStatusFilter] = useState("ALL"); // New state for status filter
  const [prescription, setPrescription] = useState(null); // New state for prescription
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); // New state for modal visibility

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchPayments = async (appointments) => {
    try {
      const paymentsData = {};
      await Promise.all(
          appointments.map(async (appointment) => {
                const paymentResponse = await axios.get(
                    `http://localhost:8080/api/payment/patient/${appointment.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                );
                if (paymentResponse.data.statusCode === 200) {
                  paymentsData[appointment.id] = paymentResponse.data.data[0];
                } else {
                  console.warn(
                      `Failed to fetch payment for appointment ID ${appointment.id}`
                  );
                }
              }
          )
      );
      setPayments(paymentsData);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payment information");
    }
  };

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
        fetchPayments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescription = async (appointmentId) => {
    try {
      const response = await axios.get(
          `http://localhost:8080/api/prescription/appointment/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      if (response.data.statusCode === 200) {
        setPrescription(response.data.data);
        setShowPrescriptionModal(true); // Show the modal
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast.error("Failed to fetch prescription information");
    }
  };

  const filterAppointments = (tab) => {
    const now = dayjs();
    return appointments.filter((appointment) => {
      const appointmentDate = dayjs(appointment.date);
      const dateFilter =
          tab === "today"
              ? appointmentDate.isSame(now, "day")
              : tab === "upcoming"
                  ? appointmentDate.isAfter(now, "day")
                  : appointmentDate.isBefore(now, "day");

      const statusCondition =
          statusFilter === "ALL" || appointment.status === statusFilter;

      return dateFilter && statusCondition;
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

  const closePrescriptionModal = () => {
    setShowPrescriptionModal(false);
    setPrescription(null);
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
            <h2 className="text-2xl font-bold text-gray-900">
              My Appointments
            </h2>
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

          {/* Status Filters */}
          <div className="mb-4">
            <label className="mr-2 font-semibold">Filter by Status:</label>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No {activeTab} appointments found.
                </p>
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
                              {dayjs(appointment.date).format("DD-MM-YYYY")}{" "}
                              at {formatTimeSlot(appointment.timeSlot)}
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
                                      toast(
                                          "Cancel functionality not yet implemented."
                                      )
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
                              <>
                                <button
                                    onClick={() => openFeedbackModal(appointment)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                  {appointment.feedback
                                      ? "Update Feedback"
                                      : "Give Feedback"}
                                </button>
                                <button
                                    onClick={() =>
                                        fetchPrescription(appointment.id)
                                    }
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                  View Prescription
                                </button>
                              </>
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

        {/* Prescription Modal */}
        {showPrescriptionModal && prescription && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Prescription Details
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Doctor: {prescription.doctorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Patient: {prescription.patientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Dosage: {prescription.dosage}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {prescription.duration}
                      </p>
                      <p className="text-sm text-gray-500">
                        Frequency: {prescription.frequency}
                      </p>
                      <p className="text-sm text-gray-500">
                        Description: {prescription.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Medicine Names:{" "}
                        {prescription.medicineNames.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closePrescriptionModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Appointments;