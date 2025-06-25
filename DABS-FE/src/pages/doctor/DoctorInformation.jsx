import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDoctorInfo } from "../../hooks/useDoctorInfo";
import { useUserInfo } from "../../hooks/useUserInfo";
import DoctorProfile from "../../components/DoctorProfile";
import AccountProfile from "../../components/AccountProfile";

const DoctorInformation = () => {
    const { token, user, setDoctorId, doctorId } = useAuth();
    const [tab, setTab] = useState("doctor");

    const {
        doctorInfo,
        setDoctorInfo,
        doctorImage,
        imageFile,
        setImageFile,
        saveDoctorInfo,
    } = useDoctorInfo({ user, token, doctorId, setDoctorId });

    const {
        userInfo,
        setUserInfo,
        saveUserInfo,
        loading,
    } = useUserInfo({ user, token });

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

            {tab === "doctor" ? (
                <DoctorProfile
                    doctorInfo={doctorInfo}
                    setDoctorInfo={setDoctorInfo}
                    doctorImage={doctorImage}
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    onSave={saveDoctorInfo}
                />
            ) : (
                <AccountProfile
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    onSave={saveUserInfo}
                />
            )}
        </div>
    );
};

export default DoctorInformation;