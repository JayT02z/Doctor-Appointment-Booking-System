import React, { useState } from "react";
import { formatDate } from "../utils/format";
import { User2, Mail, Phone, Shield, Calendar, Edit2, Save, X } from "lucide-react";

const AccountProfile = ({ userInfo, setUserInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const fields = [
    { key: "username", label: "Username", icon: User2 },
    { key: "email", label: "Email", icon: Mail },
    { key: "phone", label: "Phone", icon: Phone },
    { key: "role", label: "Role", icon: Shield, readOnly: true },
    { key: "status", label: "Status", icon: Shield, readOnly: true },
    {
      key: "createdAt",
      label: "Created At",
      icon: Calendar,
      readOnly: true,
      format: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
            <User2 className="h-6 w-6 text-[#00B5F1]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Account Details</h3>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl 
                             transition-all duration-200 text-sm font-medium
                             ${
                               isEditing
                                 ? "bg-red-50 text-red-600 hover:bg-red-100"
                                 : "bg-[#00B5F1]/10 text-[#00B5F1] hover:bg-[#00B5F1]/20"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ key, label, icon: Icon, readOnly, format }) => (
          <div
            key={key}
            className={`group p-4 rounded-xl border border-gray-100 
                                  transition-all duration-200 
                                  ${
                                    isEditing && !readOnly
                                      ? "hover:border-[#00B5F1]/30 hover:shadow-sm"
                                      : ""
                                  }`}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-[#00B5F1] transition-colors duration-200" />
              <span className="text-sm font-medium text-gray-500">{label}</span>
            </div>

            {!isEditing || readOnly ? (
              <p className="text-gray-900 font-medium pl-7">
                {format ? formatDate(userInfo?.[key]) : userInfo?.[key]}
              </p>
            ) : (
              <input
                name={key}
                value={userInfo?.[key] || ""}
                onChange={handleChange}
                className="w-full pl-7 py-1.5 bg-transparent border-b-2 border-gray-200
                                         focus:border-[#00B5F1] outline-none transition-colors duration-200
                                         text-gray-900 font-medium"
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end">
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
            <Save className="h-4 w-4" />
            Save Changes
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] animate-shimmer rounded-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountProfile;