import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProfileSettings from "./pages/patient/ProfileSettings";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import Payment from "./pages/patient/PaymentHistory";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorInformation from "./pages/doctor/DoctorInformation";
import DoctorServices from "./pages/doctor/DoctorServices";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import ManageAppointments from "./pages/admin/ManageAppointments";
import ManageUsers from "./pages/admin/ManageUsers";
import ManagePayments from "./pages/admin/ManagePayments";
import AdminServices from "./pages/admin/AdminServices";

const queryClient = new QueryClient();

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route element={<MainLayout />}>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />

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
                                    <Route path="appointments" element={<Appointments />} />
                                    <Route path="book-appointment" element={<BookAppointment />} />
                                    <Route path="payment" element={<Payment />} />
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
                                    <Route path="manage-doctors" element={<ManageDoctors />} />
                                    <Route path="manage-patients" element={<ManagePatients />} />
                                    <Route path="manage-appointments" element={<ManageAppointments />} />
                                    <Route path="manage-users" element={<ManageUsers />} />
                                    <Route path="manage-payments" element={<ManagePayments />} />
                                    <Route path="services" element={<AdminServices />} />
                                </Route>
                            </Route>
                        </Routes>
                        <Toaster position="top-right" />
                    </AuthProvider>
                </Router>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}

export default App;