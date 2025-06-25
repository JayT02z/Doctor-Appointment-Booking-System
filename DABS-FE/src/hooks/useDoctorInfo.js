import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDoctorInfo = ({ user, token, doctorId, setDoctorId }) => {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: "",
        specialization: "",
        experience: "",
        qualification: "",
        hospital: "",
    });
    const [doctorImage, setDoctorImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchDoctorByUserId();
        if (doctorId) fetchDoctorImage(doctorId);
    }, [doctorId]);

    const fetchDoctorByUserId = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/doctor/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200 && res.data.data) {
                setDoctorInfo(res.data.data);
                setDoctorId(res.data.data.id);
                localStorage.setItem("doctorId", res.data.data.id);
            } else {
                localStorage.removeItem("doctorId");
            }
        } catch {
            localStorage.removeItem("doctorId");
        }
    };

    const fetchDoctorImage = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/doctor/getimage/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200) {
                setDoctorImage(res.data.data);
            }
        } catch {}
    };

    const saveDoctorInfo = async () => {
        try {
            const method = doctorId ? "put" : "post";
            const url = doctorId
                ? `http://localhost:8080/api/doctor/update/${doctorId}`
                : `http://localhost:8080/api/doctor/create`;

            const payload = doctorId ? doctorInfo : { ...doctorInfo, userId: user.id };
            const res = await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.statusCode === 200) {
                const createdDoctor = res.data.data;
                toast.success("Doctor info saved");
                setDoctorInfo(createdDoctor);
                setDoctorId(createdDoctor.id);
                localStorage.setItem("doctorId", createdDoctor.id);

                if (imageFile) {
                    const formData = new FormData();
                    formData.append("file", imageFile);
                    await axios.post(`http://localhost:8080/api/doctor/image/${createdDoctor.id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    toast.success("Image uploaded");
                    await fetchDoctorByUserId();
                }
            }
        } catch {
            toast.error("Failed to save doctor info");
        }
    };

    return {
        doctorInfo,
        setDoctorInfo,
        doctorImage,
        imageFile,
        setImageFile,
        saveDoctorInfo,
    };
};