import React, { useState } from "react";
import { Camera, X, Edit2, Save, Building2, Award, Briefcase, GraduationCap, User2 } from 'lucide-react';

const DoctorProfile = ({
    doctorInfo,
    setDoctorInfo,
    doctorImage,
    imageFile,
    setImageFile,
    onSave,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setDoctorInfo({ ...doctorInfo, [e.target.name]: e.target.value });
    };

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User2 },
        { key: 'specialization', label: 'Specialization', icon: Briefcase },
        { key: 'experience', label: 'Experience', icon: Award },
        { key: 'qualification', label: 'Qualification', icon: GraduationCap },
        { key: 'hospital', label: 'Hospital', icon: Building2 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                        <User2 className="h-6 w-6 text-[#00B5F1]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Doctor Profile</h3>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                        transition-all duration-200 ${
                            isEditing 
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'bg-[#00B5F1]/10 text-[#00B5F1] hover:bg-[#00B5F1]/20'
                        }`}
                >
                    {isEditing ? (
                        <>
                            <X className="h-4 w-4" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Edit2 className="h-4 w-4" />
                            Edit Profile
                        </>
                    )}
                </button>
            </div>

            <div className="space-y-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg
                                    transition-transform duration-300 group-hover:scale-105">
                            {imageFile ? (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : doctorImage ? (
                                <img
                                    src={`http://localhost:8080${doctorImage}`}
                                    alt="Doctor"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                    <User2 className="w-12 h-12 text-gray-300" />
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 p-2 bg-[#00B5F1] rounded-full text-white
                                          cursor-pointer shadow-lg hover:bg-[#009cd3] transition-all duration-200
                                          hover:scale-110">
                                <Camera className="w-5 h-5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {isEditing && (
                        <p className="text-sm text-gray-500">Click the camera icon to change profile photo</p>
                    )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map(({ key, label, icon: Icon }) => (
                        <div key={key} className={`group ${isEditing ? 'relative' : ''}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={`w-4 h-4 ${isEditing ? 'text-gray-400 group-focus-within:text-[#00B5F1]' : 'text-[#00B5F1]'}`} />
                                <label className="text-sm font-medium text-gray-600">{label}</label>
                            </div>
                            {isEditing ? (
                                <input
                                    name={key}
                                    value={doctorInfo?.[key] || ""}
                                    onChange={handleChange}
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                                             focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                             transition-all duration-200 outline-none"
                                />
                            ) : (
                                <div className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-gray-900 font-medium">
                                        {doctorInfo?.[key] || "Not specified"}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                {isEditing && (
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={async () => {
                                await onSave();
                                setIsEditing(false);
                            }}
                            className="group relative inline-flex items-center gap-2 px-6 py-2.5
                                     bg-gradient-to-r from-[#00B5F1] to-[#0099cc] text-white font-medium
                                     rounded-xl hover:shadow-lg hover:shadow-[#00B5F1]/20
                                     active:scale-[0.98] transition-all duration-200"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                                          translate-x-[-100%] animate-shimmer rounded-xl" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorProfile;