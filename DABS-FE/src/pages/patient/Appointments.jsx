import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";

import useAppointmentsData from "../../hooks/useAppointmentsData";
import useFeedbackModal from "../../hooks/useFeedbackModal";
import usePrescriptionModal from "../../hooks/usePrescriptionModal";

import FeedbackModal from "../../components/appointments/FeedbackModal.jsx";
import PrescriptionModal from "../../components/appointments/PrescriptionModal.jsx";
import AppointmentCard from "../../components/appointments/AppointmentCard.jsx";
import AppointmentsTabs from "../../components/appointments/AppointmentsTabs.jsx";
import StatusFilter from "../../components/appointments/StatusFilter.jsx";
import LoadingSpinner from "../../components/appointments/LoadingSpinner.jsx";

const AppointmentsPage = () => {
  const { token, patientId } = useAuth();

  const {
    appointments,
    payments,
    loading,
    activeTab,
    setActiveTab,
    statusFilter,
    setStatusFilter,
    filterAppointments,
    refreshAppointments,
  } = useAppointmentsData(token, patientId);

  const {
    showFeedbackModal,
    selectedAppointment,
    existingFeedback,
    openFeedbackModal,
    closeFeedbackModal,
  } = useFeedbackModal(token);

  const {
    prescription,
    showPrescriptionModal,
    openPrescriptionModal,
    closePrescriptionModal,
  } = usePrescriptionModal(token);

  const filteredAppointments = filterAppointments();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          </div>
          <Link
            to="/patient/book-appointment"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 group"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Book New Appointment</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex-1">
              <AppointmentsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="bg-gray-50 p-1 rounded-lg"
              />
            </div>
            <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              className="min-w-[200px]"
            />
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No appointments found
              </h3>
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "Book your first appointment to get started!"
                  : `No ${activeTab.toLowerCase()} appointments to show.`}
              </p>
              {activeTab === "upcoming" && (
                <Link
                  to="/patient/book-appointment"
                  className="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  Schedule Now
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  payment={payments[appointment.id]}
                  onFeedbackClick={() => openFeedbackModal(appointment)}
                  onPrescriptionClick={() => openPrescriptionModal(appointment.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showFeedbackModal && selectedAppointment && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={closeFeedbackModal}
          appointment={selectedAppointment}
          existingFeedback={existingFeedback}
          token={token}
          refreshAppointments={refreshAppointments}
        />
      )}

      {showPrescriptionModal && prescription && (
        <PrescriptionModal
          isOpen={showPrescriptionModal}
          prescription={prescription}
          onClose={closePrescriptionModal}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;