import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const usePrescriptions = (doctorId) => {
    const [prescriptionData, setPrescriptionData] = useState({
        dosage: 1,
        duration: 7,
        frequency: "ONCE",
        description: "",
        appointmentId: null,
        doctorId: null,
        patientId: null,
        medicineIds: [""]
    });
    const [createdPrescriptionId, setCreatedPrescriptionId] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const resetPrescriptionData = () => {
        setPrescriptionData({
            dosage: 1,
            duration: 7,
            frequency: "ONCE",
            description: "",
            appointmentId: null,
            doctorId: null,
            patientId: null,
            medicineIds: [""]
        });
        setCreatedPrescriptionId(null);
    };

    const handleCreatePrescription = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/prescription/create", prescriptionData);
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

    const handleSendPrescription = async (email, appointmentId, onSuccess) => {
        setIsSending(true);
        try {
            const sendRes = await axios.post("http://localhost:8080/api/prescription/mail", {
                email,
                prescriptionId: createdPrescriptionId
            });
            if (sendRes.data.statusCode === 200) {
                toast.success("Prescription sent to patient's email!");

                // update appointment status
                const updateRes = await axios.put(
                    `http://localhost:8080/api/appointment/status/${appointmentId}`,
                    { status: "COMPLETED" }
                );
                if (updateRes.data.statusCode === 200) {
                    toast.success("Appointment marked as COMPLETED.");
                    if (onSuccess) onSuccess();
                }
            } else {
                toast.error("Failed to send prescription.");
            }
        } catch (error) {
            console.error("Error sending prescription:", error);
            toast.error("Error sending prescription.");
        } finally {
            setIsSending(false);
        }
    };

    return {
        prescriptionData,
        setPrescriptionData,
        createdPrescriptionId,
        handleCreatePrescription,
        handleSendPrescription,
        resetPrescriptionData,
        isSending
    };
};