import { Users, FileBarChart2, UserPlus, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import PatientTable from "../../components/PatientTable.jsx";
import SearchBar from "../../components/doctor_dashboard/SearchBar";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

const ManagePatients = () => {
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
                            <Users className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
                    </div>
                    <p className="text-sm text-gray-500">Manage and monitor patient information</p>
                </div>

                {/* Search and Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <SearchBar
                                    value={dashboard.search}
                                    onChange={dashboard.setSearch}
                                    placeholder="Search patients by name, email, or phone..."
                                />
                            </div>
                            <button
                                onClick={() => {/* Add sort functionality */}}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700
                                         bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100
                                         transition-colors duration-200"
                            >
                                <ArrowUpDown className="h-4 w-4" />
                                Sort
                            </button>
                        </div>
                    </div>

                    <PatientTable
                        data={dashboard.filteredPatients}
                        onDelete={dashboard.handleDeletePatient}
                        onViewPayments={dashboard.fetchPatientPayments}
                        pageState={dashboard.patientPageState}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default ManagePatients;
