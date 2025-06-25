import { Stethoscope, UserPlus, Trophy, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import DoctorTable from "../../components/DoctorTable.jsx";
import SearchBar from "../../components/doctor_dashboard/SearchBar";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

const ManageDoctors = () => {
    const dashboard = useAdminDashboard();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Stethoscope className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
                    </div>
                    <p className="text-sm text-gray-500">Manage and monitor doctor information and performance</p>
                </div>

                {/* Search and Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <SearchBar
                                    value={dashboard.search}
                                    onChange={dashboard.setSearch}
                                    placeholder="Search doctors by name, specialization, or hospital..."
                                />
                            </div>
                            <button
                                onClick={() => {/* Add new doctor logic */}}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00B5F1] text-white
                                         rounded-lg hover:bg-[#009cd3] transition-colors duration-200"
                            >
                                <UserPlus className="h-4 w-4" />
                                Add Doctor
                            </button>
                        </div>
                    </div>

                    {/* Doctor Table */}
                    <DoctorTable
                        data={dashboard.filteredDoctors}
                        pageState={dashboard.doctorPageState}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default ManageDoctors;
