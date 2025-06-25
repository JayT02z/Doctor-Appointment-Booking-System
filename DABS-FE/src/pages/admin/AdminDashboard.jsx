// pages/AdminDashboard.jsx
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import DashboardStats from "../../components/DashboardStats.jsx";
import AdminPaymentOverview from "../../components/AdminPaymentOverview.jsx";
import AdminSaleForEachDay from "../../components/AdminSaleForEachDay.jsx";
import AdminServiceUsageAnalytics from "../../components/AdminServiceUsageAnalytics.jsx";
import DoctorBookingStats from "../../components/DoctorBookingStats.jsx";
import { motion } from 'framer-motion';
import { Gauge, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const dashboard = useAdminDashboard();

    if (dashboard.loading) {
        return (
            <div className="bg-gray-50 flex justify-center items-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading dashboard data...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Dashboard Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Gauge className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Monitor and analyze your hospital's performance metrics
                    </p>
                </div>

                {/* Stats Section */}
                <section className="mb-8">
                    <DashboardStats stats={dashboard.stats} />
                </section>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Service Usage Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <AdminServiceUsageAnalytics usageData={dashboard.usageData} />
                    </motion.div>

                    {/* Payment Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <AdminPaymentOverview />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <DoctorBookingStats></DoctorBookingStats>
                    </motion.div>
                </div>

                {/* Daily Sales Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <AdminSaleForEachDay salesData={dashboard.salesData} />
                </motion.section>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;