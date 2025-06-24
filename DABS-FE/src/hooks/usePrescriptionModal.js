import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * Hook quản lý modal toa thuốc
 * @param {string} token - JWT token từ AuthContext
 */
const usePrescriptionModal = (token) => {
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [prescription, setPrescription] = useState(null);

    const openPrescriptionModal = async (appointmentId) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/prescription/appointment/${appointmentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.data.statusCode === 200) {
                setPrescription(res.data.data);
                setShowPrescriptionModal(true);
            }
        } catch (err) {
            console.error("Error fetching prescription:", err);
            toast.error("Failed to fetch prescription");
        }
    };

    const closePrescriptionModal = () => {
        setPrescription(null);
        setShowPrescriptionModal(false);
    };

    return {
        prescription,
        showPrescriptionModal,
        openPrescriptionModal,
        closePrescriptionModal,
    };
};

export default usePrescriptionModal;