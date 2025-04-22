import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // TODO: Fetch appointments based on user type
    // This is mock data for demonstration
    setAppointments([
      {
        id: 1,
        date: "2024-04-20",
        time: "10:00 AM",
        doctor: "Dr. John Smith",
        patient: "Jane Doe",
        status: "upcoming",
      },
      {
        id: 2,
        date: "2024-04-18",
        time: "02:30 PM",
        doctor: "Dr. Sarah Johnson",
        patient: "Mike Wilson",
        status: "completed",
      },
    ]);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const renderPatientDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {appointments
            .filter((appointment) => appointment.status === "upcoming")
            .map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{appointment.doctor}</h3>
                    <p className="text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Past Appointments</h2>
        <div className="space-y-4">
          {appointments
            .filter((appointment) => appointment.status === "completed")
            .map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{appointment.doctor}</h3>
                    <p className="text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50">
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{appointment.patient}</h3>
                  <p className="text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Appointment Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary-600">
              Total Appointments
            </h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-600">Completed</h3>
            <p className="text-3xl font-bold">18</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-600">Upcoming</h3>
            <p className="text-3xl font-bold">6</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Today</span>
              <span className="font-semibold">156</span>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Manage Users
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Doctors</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Doctors</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Today</span>
              <span className="font-semibold">32</span>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Manage Doctors
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Appointments</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Appointments</span>
              <span className="font-semibold">567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Appointments</span>
              <span className="font-semibold">24</span>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              View All Appointments
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">
                    {appointment.patient} with {appointment.doctor}
                  </h3>
                  <p className="text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === "upcoming"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}{" "}
              Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>

        {user.userType === "patient" && renderPatientDashboard()}
        {user.userType === "doctor" && renderDoctorDashboard()}
        {user.userType === "admin" && renderAdminDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
