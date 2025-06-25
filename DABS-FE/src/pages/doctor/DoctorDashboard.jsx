// doctor-dashboard/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDoctorAuth } from '../../hooks/useDoctorAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import AppointmentCard from '../../components/doctor_dashboard/AppointmentCard';
import StatusFilter from '../../components/doctor_dashboard/StatusFilter';
import PatientDetailModal from '../../components/doctor_dashboard/PatientDetailModal';
import PrescriptionModal from '../../components/doctor_dashboard/PrescriptionModal';
import ViewPrescriptionModal from '../../components/doctor_dashboard/ViewPrescriptionModal';
import FeedbackPanel from '../../components/doctor_dashboard/FeedbackPanel';
import SearchBar from '../../components/doctor_dashboard/SearchBar';
import Pagination from '../../components/doctor_dashboard/Pagination';
import axios from 'axios'
import Modal from 'react-modal';
import { MessageCircle, X } from 'lucide-react';
import { Stethoscope, Calendar } from 'lucide-react';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isViewPrescriptionModalOpen, setIsViewPrescriptionModalOpen] = useState(false);
  const [viewPrescriptionData, setViewPrescriptionData] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const { doctorId } = useDoctorAuth();
  const {
    appointments,
    fetchAppointments,
    loading,
    handleUpdateStatus
  } = useAppointments(doctorId, activeTab, statusFilter);

  const {
    prescriptionData,
    setPrescriptionData,
    handleCreatePrescription,
    handleSendPrescription,
    createdPrescriptionId,
    resetPrescriptionData,
    isSending
  } = usePrescriptions(doctorId);

  const { feedbacks, fetchFeedbackForAppointments } = useFeedbacks();

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId, activeTab, statusFilter]);

  useEffect(() => {
    fetchFeedbackForAppointments(appointments);
  }, [appointments]);

  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  const openPrescriptionModal = (appointment) => {
    setSelectedPatient(appointment);
    setIsPrescriptionModalOpen(true);
    setPrescriptionData((prev) => ({
      ...prev,
      appointmentId: appointment.id,
      doctorId: doctorId,
      patientId: appointment.patientName.id
    }));
  };

  const openViewPrescription = async (appointmentId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/prescription/appointment/${appointmentId}`);
      if (res.data.statusCode === 200) {
        setViewPrescriptionData(res.data.data);
        setIsViewPrescriptionModalOpen(true);
      }
    } catch (err) {
      console.error("Failed to fetch prescription", err);
    }
  };

  const openFeedbackModal = (appointmentId) => {
    setSelectedFeedback(feedbacks[appointmentId] || null);
    setIsFeedbackModalOpen(true);
  };

  // Filter appointments based on search
  const filteredAppointments = appointments.filter(appt =>
      appt.patientName.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const startIndex = (currentPage - 1) * appointmentsPerPage;
  const endIndex = startIndex + appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-[#00B5F1]" />
              <h2 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h2>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by patient name, service, or specialization..."
              />
            </div>
            {["today", "upcoming"].includes(activeTab) && (
                <div className="sm:w-48">
                  <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                </div>
            )}
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {["today", "upcoming", "past", "completed", "cancelled"].map((key) => (
                  <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`$ {
                  activeTab === key
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
              ))}
            </nav>
          </div>

          {/* Appointments List */}
          {currentAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-1">No appointments found</p>
                <p className="text-gray-500">
                  {searchQuery
                      ? "No appointments match your search criteria"
                      : `No ${activeTab} appointments are currently available`
                  }
                </p>
              </div>
          ) : (
              <>
                <div className="space-y-4">
                  {currentAppointments.map((appt) => (
                      <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                          activeTab={activeTab}
                          onUpdateStatus={handleUpdateStatus}
                          onOpenPatientDetail={() => openPatientModal(appt.patientName)}
                          onOpenPrescription={() => openPrescriptionModal(appt)}
                          onViewPrescription={() => openViewPrescription(appt.id)}
                          onViewFeedback={() => openFeedbackModal(appt.id)}
                      />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                      />
                    </div>
                )}
              </>
          )}
        </div>

        <PatientDetailModal
            isOpen={isPatientModalOpen}
            onClose={() => setIsPatientModalOpen(false)}
            patient={selectedPatient}
        />

        <PrescriptionModal
            isOpen={isPrescriptionModalOpen}
            onClose={() => {
              setIsPrescriptionModalOpen(false);
              resetPrescriptionData();
            }}
            prescriptionData={prescriptionData}
            setPrescriptionData={setPrescriptionData}
            onCreate={handleCreatePrescription}
            onSend={() => handleSendPrescription(selectedPatient.patientName.email, selectedPatient.id, fetchAppointments)}
            createdId={createdPrescriptionId}
            isSending={isSending}
        />

        <ViewPrescriptionModal
            isOpen={isViewPrescriptionModalOpen}
            onClose={() => setIsViewPrescriptionModalOpen(false)}
            prescription={viewPrescriptionData}
        />

        <Modal
            isOpen={isFeedbackModalOpen}
            onRequestClose={() => setIsFeedbackModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-8 w-full max-w-xl outline-none animate-modalFadeIn"
            overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center animate-overlayShow"
        >
            <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#00B5F1] rounded-2xl rotate-45 opacity-10"></div>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-[#00B5F1] rounded-2xl rotate-45 opacity-5"></div>

                {/* Modal Header */}
                <div className="flex justify-between items-start mb-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#00B5F1] rounded-xl opacity-10 blur-md"></div>
                            <div className="relative p-3 bg-gradient-to-br from-[#00B5F1] to-[#0099cc] rounded-xl shadow-lg">
                                <MessageCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Patient Feedback</h2>
                            <p className="text-sm text-gray-500">Review patient's experience and rating</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsFeedbackModalOpen(false)}
                        className="text-gray-400 hover:text-[#00B5F1] transition-all duration-200 focus:outline-none rounded-full p-2 hover:bg-gray-50 hover:shadow-md active:scale-95"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Feedback Content */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50 rounded-xl"></div>
                    <div className="relative bg-white rounded-xl p-6 shadow-[0_4px_20px_-8px_rgba(0,181,241,0.15)] border border-gray-100">
                        <FeedbackPanel feedback={selectedFeedback} />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => setIsFeedbackModalOpen(false)}
                        className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00B5F1] to-[#0099cc] text-white rounded-lg hover:shadow-lg hover:shadow-[#00B5F1]/20 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-opacity-50 font-medium"
                    >
                        Close
                        <X
                            className="h-4 w-4 transform transition-transform duration-200 ease-out group-hover:rotate-90"
                        />
                    </button>
                </div>
            </div>
        </Modal>
      </div>
  );
};

export default DoctorDashboard;

