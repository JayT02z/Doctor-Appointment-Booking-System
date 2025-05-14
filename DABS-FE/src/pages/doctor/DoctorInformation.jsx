import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const DoctorInformation = () => {
    const { token, user, setDoctorId, doctorId } = useAuth();
    const [tab, setTab] = useState("doctor");
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: "",
        specialization: "",
        experience: "",
        qualification: "",
        hospital: "",
    });
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingDoctor, setIsEditingDoctor] = useState(false);
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [doctorImage, setDoctorImage] = useState(null);

    useEffect(() => {
        fetchDoctorByUserId();
        fetchUser();
        if (doctorId) {
            fetchDoctorImage(doctorId);
        }
    }, [doctorId]);

    const fetchDoctorByUserId = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/doctor/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200 && res.data.data) {
                toast.success(doctorId ? "Doctor info updated" : "Doctor profile created");
                setIsEditingDoctor(false);
                setDoctorInfo(res.data.data);

                setDoctorId(res.data.data.id); // ✅ update context state
                localStorage.setItem("doctorId", res.data.data.id); // ✅ update localStorage
            }
            else {
                localStorage.removeItem("doctorId");
            }
        } catch (err) {
            localStorage.removeItem("doctorId");
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/auth/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200) {
                setUserInfo(res.data.data);
            }
        } catch (err) {
            toast.error("Failed to fetch user info");
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorImage = async (doctorId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/doctor/getimage/${doctorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200 && res.data.data) {
                setDoctorImage(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch doctor image:", err);
        }
    };

    const handleDoctorChange = (e) => {
        setDoctorInfo({ ...doctorInfo, [e.target.name]: e.target.value });
    };

    const handleUserChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleDoctorSave = async () => {
        try {
            const url = doctorId
                ? `http://localhost:8080/api/doctor/update/${doctorId}`
                : `http://localhost:8080/api/doctor/create`;

            const method = doctorId ? "put" : "post";
            const payload = doctorId ? doctorInfo : { ...doctorInfo, userId: user.id };

            const res = await axios[method](url, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.statusCode === 200) {
                const createdDoctor = res.data.data;
                const isNewDoctor = !doctorId;

                toast.success(isNewDoctor ? "Doctor profile created" : "Doctor info updated");
                setIsEditingDoctor(false);
                setDoctorInfo(createdDoctor);
                setDoctorId(createdDoctor.id);
                localStorage.setItem("doctorId", createdDoctor.id);

                if (imageFile) {
                    const formData = new FormData();
                    formData.append("file", imageFile);
                    try {
                        await axios.post(
                            `http://localhost:8080/api/doctor/image/${createdDoctor.id}`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                        toast.success("Upload ảnh thành công");
                        // Cập nhật lại ảnh từ server
                        await fetchDoctorByUserId();
                    } catch (uploadErr) {
                        toast.error("Upload ảnh thất bại");
                    }
                }

                if (isNewDoctor) {
                    window.location.reload();
                }
            }
        } catch (err) {
            toast.error("Failed to save doctor info");
        }
    };


    const handleUserSave = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8080/api/v1/auth/update/${user.id}`,
                userInfo,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.statusCode === 200) {
                toast.success("Account info updated");
                setIsEditingAccount(false);
                fetchUser();
            }
        } catch (err) {
            toast.error("Failed to update account info");
        }
    };

    const formatDate = (arr) => {
        if (!arr || arr.length < 3) return "-";
        return `${arr[2].toString().padStart(2, "0")}/${arr[1].toString().padStart(2, "0")}/${arr[0]}`;
    };

    if (loading) return <p className="text-center py-8">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex space-x-4 border-b mb-6">
                <button
                    onClick={() => setTab("doctor")}
                    className={`px-4 py-2 font-semibold transition ${
                        tab === "doctor"
                            ? "border-b-2 border-primary-600 text-primary-600"
                            : "text-gray-500 hover:text-primary-600"
                    }`}
                >
                    Doctor Info
                </button>
                <button
                    onClick={() => setTab("account")}
                    className={`px-4 py-2 font-semibold transition ${
                        tab === "account"
                            ? "border-b-2 border-primary-600 text-primary-600"
                            : "text-gray-500 hover:text-primary-600"
                    }`}
                >
                    Account Info
                </button>
            </div>

            {/* Doctor Info */}
            {tab === "doctor" && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Doctor Profile</h3>
                        <button
                            onClick={() => setIsEditingDoctor(!isEditingDoctor)}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            {isEditingDoctor ? "Cancel" : "Edit"}
                        </button>
                    </div>
                    {isEditingDoctor ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[["fullName", "Full Name"],
                                ["specialization", "Specialization"],
                                ["experience", "Experience"],
                                ["qualification", "Qualification"],
                                ["hospital", "Hospital"],
                            ].map(([field, label]) => (
                                <input
                                    key={field}
                                    name={field}
                                    placeholder={label}
                                    value={doctorInfo?.[field] || ""}
                                    onChange={handleDoctorChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            ))}

                            <div className="md:col-span-2">
                                <label className="block mb-1 font-semibold">Upload Ảnh</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>

                            <div className="col-span-2 text-right">
                                <button
                                    onClick={handleDoctorSave}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctorImage && (
                                <div className="md:col-span-2 flex justify-center">
                                    <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300 ease-in-out">
                                        <img
                                            src={`http://localhost:8080${doctorImage}`}
                                            alt="Doctor"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <p><strong>Full Name:</strong> {doctorInfo?.fullName}</p>
                            <p><strong>Specialization:</strong> {doctorInfo?.specialization}</p>
                            <p><strong>Experience:</strong> {doctorInfo?.experience} years</p>
                            <p><strong>Qualification:</strong> {doctorInfo?.qualification}</p>
                            <p><strong>Hospital:</strong> {doctorInfo?.hospital}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Account Info */}
            {tab === "account" && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Account Details</h3>
                        <button
                            onClick={() => setIsEditingAccount(!isEditingAccount)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {isEditingAccount ? "Cancel" : "Edit"}
                        </button>
                    </div>
                    {!isEditingAccount ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Username:</strong> {userInfo?.username}</p>
                            <p><strong>Email:</strong> {userInfo?.email}</p>
                            <p><strong>Phone:</strong> {userInfo?.phone}</p>
                            <p><strong>Role:</strong> {userInfo?.role}</p>
                            <p><strong>Status:</strong> {userInfo?.status}</p>
                            <p><strong>Created At:</strong> {formatDate(userInfo?.createdAt)}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ["username", "Username"],
                                ["email", "Email"],
                                ["phone", "Phone"],
                            ].map(([field, label]) => (
                                <input
                                    key={field}
                                    name={field}
                                    placeholder={label}
                                    value={userInfo?.[field] || ""}
                                    onChange={handleUserChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            ))}
                            <div className="col-span-2 text-right">
                                <button
                                    onClick={handleUserSave}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorInformation;