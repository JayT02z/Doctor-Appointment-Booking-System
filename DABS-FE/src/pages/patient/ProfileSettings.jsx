import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProfileSettings = () => {
  const { user, token, setPatientId, patientId } = useAuth();

  const isFirstTime = !patientId;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
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
          const response = await axios.get(
              `http://localhost:8080/api/patient/get/${patientId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
          );

          if (response.data.statusCode === 200) {
            const data = response.data.data;
            const formattedDOB = data.dob
                ? `${data.dob[0]}-${String(data.dob[1]).padStart(2, '0')}-${String(data.dob[2]).padStart(2, '0')}`
                : "";

            setFormData((prev) => ({
              ...prev,
              fullName: data.username || "",
              dob: formattedDOB,
              gender: data.gender || "",
              address: data.address || "",
              medicalHistory: data.medicalHistory || "",
            }));
          } else {
            toast.error("Failed to fetch patient details.");
          }
        } catch (error) {
          console.error("Error fetching patient details:", error);
          toast.error("An error occurred while fetching profile data.");
        }
      }
    };

    fetchPatientDetails();
  }, [isFirstTime, patientId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const { fullName, dob, gender, address, medicalHistory } = formData;
    return fullName && dob && gender && address && medicalHistory;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (isFirstTime) {
        // First time: create patient profile
        const response = await axios.post(
            "http://localhost:8080/api/patient/create",
            {
              userId: user.id,
              fullName: formData.fullName,
              dob: formData.dob,
              gender: formData.gender,
              address: formData.address,
              medicalHistory: formData.medicalHistory,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (response.data.statusCode === 200) {
          toast.success("Profile created successfully.");

          // Update patientId in AuthContext
          const newPatientId = response.data.data?.id; // adjust based on your API response structure
          if (newPatientId) setPatientId(newPatientId);
        }
        else {
          toast.error("Failed to create profile.");
        }
      } else {
        // Update existing profile
        const response = await axios.put(
            `http://localhost:8080/api/patient/update/${patientId}`,
            {
              userId: user.id,
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              dob: formData.dob,
              gender: formData.gender,
              address: formData.address,
              medicalHistory: formData.medicalHistory,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (response.data.statusCode === 200) {
          toast.success("Profile updated successfully.");
        } else {
          toast.error("Failed to update profile.");
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(error.response?.data?.message || "Failed to save profile");
    }
  };

  return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isFirstTime ? "Complete Your Profile" : "Profile Settings"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {!isFirstTime && (
                  <>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </>
              )}

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                Medical History
              </label>
              <textarea
                  name="medicalHistory"
                  id="medicalHistory"
                  rows={4}
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Enter your medical history..."
              />
            </div>

            <div className="flex justify-end">
              <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ProfileSettings;