import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * Hook quản lý modal feedback
 * @param {string} token - JWT token từ AuthContext
 */
const useFeedbackModal = (token) => {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [existingFeedback, setExistingFeedback] = useState(null);

    const openFeedbackModal = async (appointment) => {
        setSelectedAppointment(appointment);
        try {
            const res = await axios.get(
                `http://localhost:8080/api/feedback/get/appointment/${appointment.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.data?.statusCode === 200 && res.data.data) {
                setExistingFeedback(res.data.data);
            } else {
                setExistingFeedback(null);
            }
        } catch (err) {
            console.error("Error fetching feedback:", err);
            toast.error("Failed to fetch feedback");
            setExistingFeedback(null);
        } finally {
            setShowFeedbackModal(true);
        }
    };

    const closeFeedbackModal = () => {
        setSelectedAppointment(null);
        setExistingFeedback(null);
        setShowFeedbackModal(false);
    };

    return {
        showFeedbackModal,
        selectedAppointment,
        existingFeedback,
        openFeedbackModal,
        closeFeedbackModal,
    };
};

export default useFeedbackModal;