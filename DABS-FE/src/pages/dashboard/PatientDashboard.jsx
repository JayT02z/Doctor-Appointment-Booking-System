import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("appointments");

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`${
                activeTab === "appointments"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Appointments
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`${
                activeTab === "profile"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("medical-history")}
              className={`${
                activeTab === "medical-history"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Medical History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "appointments" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
              {/* Appointment list will go here */}
              <p className="text-gray-500">No appointments scheduled.</p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">My Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone:</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address:</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "medical-history" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Medical History</h2>
              {/* Medical history content will go here */}
              <p className="text-gray-500">No medical history available.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
