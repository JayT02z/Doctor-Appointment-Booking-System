import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isPatientDetailModalOpen, setIsPatientDetailModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    dosage: 1,
    duration: 7,
    frequency: "ONCE",
    description: "",
    appointmentId: null,
    doctorId: null,
    patientId: null,
    medicineIds: [""],
  });
  const [createdPrescriptionId, setCreatedPrescriptionId] = useState(null);

  const { doctorId, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "DOCTOR" && doctorId === null) {
      toast(
          (t) => (
              <div className="text-yellow-900">
                ⚠️ Please{" "}
                <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      navigate("/doctor/information");
                    }}
                    className="underline text-yellow-800 font-semibold"
                >
                  update your doctor information
                </button>{" "}
                to access all features.
              </div>
          ),
          {
            icon: "⚠️",
            duration: 10000,
            style: {
              background: "#FEF9C3",
              border: "1px solid #FCD34D",
              color: "#92400E",
            },
          }
      );
    }
  }, [doctorId, user, navigate]);

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [activeTab, doctorId, statusFilter]);

  useEffect(() => {
    appointments.forEach((appt) => {
      if (appt.status === "COMPLETED" && !feedbacks[appt.id]) {
        fetchFeedback(appt.id);
      }
    });
  }, [appointments]);

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

  const fetchFeedback = async (appointmentId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/feedback/get/appointment/${appointmentId}`);
      if (res.data.statusCode === 200) {
        setFeedbacks((prev) => ({
          ...prev,
          [appointmentId]: res.data.data,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch feedback", err);
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

  const openPatientDetailModal = (patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailModalOpen(true);
  };

  const closePatientDetailModal = () => {
    setIsPatientDetailModalOpen(false);
    setSelectedPatient(null);
  };

  const openPrescriptionModal = (appointment) => {
    setSelectedPatient(appointment);
    setIsPrescriptionModalOpen(true);
    setPrescriptionData({
      ...prescriptionData,
      appointmentId: appointment.id,
      doctorId: doctorId,
      patientId: appointment.patientName.id,
    });
  };

  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedPatient(null);
    setPrescriptionData({
      dosage: 1,
      duration: 7,
      frequency: "ONCE",
      description: "",
      appointmentId: null,
      doctorId: null,
      patientId: null,
      medicineIds: [""],
    });
    setCreatedPrescriptionId(null);
  };

  const formatDOB = (dobArray) => {
    return dobArray
        ? `${dobArray[0]}-${String(dobArray[1]).padStart(2, '0')}-${String(dobArray[2]).padStart(2, '0')}`
        : "";
  };

  const handleCreatePrescription = async () => {
    try {
      const payload = {
        ...prescriptionData,
      };

      console.log("Prescription data being sent:", payload); // Log the payload

      const res = await axios.post(
          "http://localhost:8080/api/prescription/create",
          payload
      );
      if (res.data.statusCode === 200) {
        toast.success("Prescription created successfully!");
        setCreatedPrescriptionId(res.data.data.id);
      } else {
        toast.error("Failed to create prescription.");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Error creating prescription.");
    }
  };

  const handleSendPrescription = async (email, prescriptionId) => {
    try {
      const res = await axios.post(
          "http://localhost:8080/api/prescription/mail",
          { email, prescriptionId }
      );
      if (res.data.statusCode === 200) {
        toast.success("Prescription sent to patient's email!");
        closePrescriptionModal();
      } else {
        toast.error("Failed to send prescription.");
      }
    } catch (error) {
      console.error("Error sending prescription:", error);
      toast.error("Error sending prescription.");
    }
  };

  const ratingStringToNumber = (ratingString) => {
    switch (ratingString) {
      case "ONE_STAR": return 1;
      case "TWO_STAR": return 2;
      case "THREE_STAR": return 3;
      case "FOUR_STAR": return 4;
      case "FIVE_STAR": return 5;
      default: return 0;
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h2>
          </div>

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
                    <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            <button
                                onClick={() => openPatientDetailModal(appointment.patientName)}
                                className="hover:underline text-blue-600 focus:outline-none" // Thêm focus:outline-none
                            >
                              {appointment.patientName.username}
                            </button>
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

                      {appointment.status === "CONFIRMED" && (
                          <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => openPrescriptionModal(appointment)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                            >
                              Send Prescription
                            </button>
                          </div>
                      )}

                      {["today", "upcoming"].includes(activeTab) &&
                          appointment.status === "PENDING" && (
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

                      {appointment.status === "COMPLETED" && (
                          <div className="mt-4 p-3 border rounded bg-gray-50">
                            {feedbacks[appointment.id] ? (
                                <>
                                  <p className="text-sm font-semibold text-gray-700">
                                    Patient Feedback
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    <strong>Comment:</strong>{" "}
                                    {feedbacks[appointment.id].feedbackText || "No comment provided."}
                                  </p>
                                  {feedbacks[appointment.id].rating && (
                                      <p className="text-sm text-yellow-600 mt-1">
                                        <strong>Rating:</strong> {ratingStringToNumber(feedbacks[appointment.id].rating)} / 5
                                      </p>
                                  )}
                                </>
                            ) : (
                                <p className="text-sm italic text-gray-400">No feedback available.</p>
                            )}
                          </div>
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>
        {/* Pop-up chi tiết người bệnh (sử dụng react-modal) */}
        <Modal
            isOpen={isPatientDetailModalOpen}
            onRequestClose={closePatientDetailModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
            <button onClick={closePatientDetailModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"/></svg>
            </button>
          </div>
          {selectedPatient && (
              <div className="mb-4">
                <p className="mb-2"><strong className="font-semibold">Name:</strong> {selectedPatient.username}</p>
                <p className="mb-2"><strong className="font-semibold">Date of Birth:</strong> {formatDOB(selectedPatient.dob)}</p>
                <p className="mb-2"><strong className="font-semibold">Gender:</strong> {selectedPatient.gender}</p>
                <p className="mb-2"><strong className="font-semibold">Medical History:</strong> {selectedPatient.medicalHistory}</p>
                <p className="mb-2"><strong className="font-semibold">Address:</strong> {selectedPatient.address}</p>
                <p className="mb-2"><strong className="font-semibold">Gmail:</strong> {selectedPatient.email}</p>
              </div>
          )}
          <div className="flex justify-end">
            <button onClick={closePatientDetailModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">
              Close
            </button>
          </div>
        </Modal>

        {/* Pop-up gửi đơn thuốc */}
        <Modal
            isOpen={isPrescriptionModalOpen}
            onRequestClose={closePrescriptionModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Send Prescription</h2>
            <button onClick={closePrescriptionModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L10 11.414l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"/></svg>
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dosage">
              Dosage
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dosage"
                type="number"
                value={prescriptionData.dosage}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: parseInt(e.target.value) })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration (days)
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="duration"
                type="number"
                value={prescriptionData.duration}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: parseInt(e.target.value) })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
              Frequency
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="frequency"
                value={prescriptionData.frequency}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, frequency: e.target.value })}
            >
              <option value="ONCE">Once a day</option>
              <option value="TWICE">Twice a day</option>
              <option value="THREE_TIMES">Three times a day</option>
                <option value="FOUR_TIMES">Four times a day</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={prescriptionData.description}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, description: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicineIds">
              Medicine Name
            </label>
            {prescriptionData.medicineIds.map((medicine, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={medicine}
                      onChange={(e) => {
                        const newMedicineIds = [...prescriptionData.medicineIds];
                        newMedicineIds[index] = e.target.value;
                        setPrescriptionData({ ...prescriptionData, medicineIds: newMedicineIds });
                      }}
                  />
                  <button
                      type="button"
                      onClick={() => {
                        const newMedicineIds = [...prescriptionData.medicineIds];
                        newMedicineIds.splice(index, 1);
                        setPrescriptionData({ ...prescriptionData, medicineIds: newMedicineIds });
                      }}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => setPrescriptionData({ ...prescriptionData, medicineIds: [...prescriptionData.medicineIds, ""] })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Add Medicine
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <button
                onClick={handleCreatePrescription}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none mr-2"
            >
              Create Prescription
            </button>
            {createdPrescriptionId && (
                <button
                    onClick={() => handleSendPrescription(selectedPatient.gmail, createdPrescriptionId)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Send Prescription
                </button>
            )}
          </div>
        </Modal>
      </div>
  );
};

export default DoctorDashboard;
