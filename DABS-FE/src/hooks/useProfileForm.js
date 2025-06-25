import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export const useProfileForm = () => {
    const { user, token, patientId, setPatientId } = useAuth();
    const isFirstTime = !patientId;

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        gender: user?.gender || "",
        dob: user?.dob || "",
        medicalHistory: user?.medicalHistory || "",
    });

    useEffect(() => {
        const fetchPatientDetails = async () => {
            if (!isFirstTime && patientId) {
                try {
                    const res = await axios.get(`http://localhost:8080/api/patient/get/${patientId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (res.data.statusCode === 200) {
                        const data = res.data.data;
                        const formattedDOB = data.dob
                            ? `${data.dob[0]}-${String(data.dob[1]).padStart(2, '0')}-${String(data.dob[2]).padStart(2, '0')}`
                            : "";

                        setFormData((prev) => ({
                            ...prev,
                            fullName: data.fullName || "",
                            dob: formattedDOB,
                            gender: data.gender || "",
                            address: data.address || "",
                            medicalHistory: data.medicalHistory || "",
                        }));
                    } else toast.error("Failed to fetch patient details.");
                } catch (err) {
                    toast.error("An error occurred while fetching profile data.");
                }
            }
        };

        fetchPatientDetails();
    }, [isFirstTime, patientId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateFields = () => {
        const { fullName, dob, gender, address, medicalHistory } = formData;
        return fullName && dob && gender && address && medicalHistory;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return toast.error("Please fill in all required fields.");

        try {
            const url = isFirstTime
                ? "http://localhost:8080/api/patient/create"
                : `http://localhost:8080/api/patient/update/${patientId}`;

            const payload = {
                userId: user.id,
                fullName: formData.fullName,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                gender: formData.gender,
                address: formData.address,
                medicalHistory: formData.medicalHistory,
            };

            const res = await axios[isFirstTime ? "post" : "put"](url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.statusCode === 200) {
                toast.success(isFirstTime ? "Profile created successfully." : "Profile updated successfully.");
                if (isFirstTime && res.data.data?.id) setPatientId(res.data.data.id);
            } else {
                toast.error("Failed to save profile.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save profile");
        }
    };

    return { formData, handleChange, handleSubmit, isFirstTime };
};
