import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { DoctorProvider } from "./context/DoctorContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProfileSettings from "./pages/patient/ProfileSettings";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorInformation from "./pages/doctor/DoctorInformation";
import DoctorServices from "./pages/doctor/DoctorServices";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <DoctorProvider>
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Patient Routes */}
                  <Route
                      path="/patient"
                      element={
                        <ProtectedRoute allowedRoles={["PATIENT"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                  >
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="medical-history" element={<MedicalHistory />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="book-appointment" element={<BookAppointment />} />
                  </Route>

                  {/* Protected Doctor Routes */}
                  <Route
                      path="/doctor"
                      element={
                        <ProtectedRoute allowedRoles={["DOCTOR"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                  >
                    <Route path="dashboard" element={<DoctorDashboard />} />
                    <Route path="information" element={<DoctorInformation />} />
                    <Route path="services" element={<DoctorServices />} />
                    <Route path="schedule" element={<DoctorSchedule />} />
                  </Route>

                  {/* Protected Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="services" element={<AdminServices />} />
                    </Route>
                </Route>
              </Routes>
            </DoctorProvider>
            <Toaster position="top-right" />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
