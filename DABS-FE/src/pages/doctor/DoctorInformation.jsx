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

    useEffect(() => {
        fetchDoctorByUserId();
        fetchUser();
    }, []);

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
                const isNewDoctor = !doctorId;
                toast.success(isNewDoctor ? "Doctor profile created" : "Doctor info updated");
                setIsEditingDoctor(false);
                setDoctorInfo(res.data.data);
                localStorage.setItem("doctorId", res.data.data.id);
                setDoctorId(res.data.data.id);

                if (isNewDoctor) {
                    window.location.reload(); // Reload to ensure updated doctorId is reflected globally
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
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {isEditingDoctor ? "Cancel" : "Edit"}
                        </button>
                    </div>
                    {!isEditingDoctor ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Full Name:</strong> {doctorInfo?.fullName}</p>
                            <p><strong>Specialization:</strong> {doctorInfo?.specialization}</p>
                            <p><strong>Experience:</strong> {doctorInfo?.experience} years</p>
                            <p><strong>Qualification:</strong> {doctorInfo?.qualification}</p>
                            <p><strong>Hospital:</strong> {doctorInfo?.hospital}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ["fullName", "Full Name"],
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
                            <div className="col-span-2 text-right">
                                <button
                                    onClick={handleDoctorSave}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
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