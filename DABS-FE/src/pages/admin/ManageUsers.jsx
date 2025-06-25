import { Users, Shield, UserCheck, UserX, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import UserTable from "../../components/UserTable.jsx";
import SearchBar from "../../components/doctor_dashboard/SearchBar";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

const ManageUsers = () => {
    const dashboard = useAdminDashboard();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Users className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    </div>
                    <p className="text-sm text-gray-500">Manage user roles and permissions across the platform</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex-1 w-full">
                        <SearchBar
                            value={dashboard.search}
                            onChange={dashboard.setSearch}
                            placeholder="Search users by username or email..."
                        />
                    </div>
                    <div className="relative min-w-[160px]">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={dashboard.userRoleFilter}
                            onChange={(e) => dashboard.setUserRoleFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200
                                     focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                     transition-all duration-200 appearance-none cursor-pointer"
                        >
                            <option value="">All Roles</option>
                            <option value="PATIENT">Patient</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <UserTable
                    users={dashboard.filteredUsers}
                    editingUser={dashboard.editingUser}
                    newRole={dashboard.newRole}
                    newStatus={dashboard.newStatus}
                    setNewRole={dashboard.setNewRole}
                    setNewStatus={dashboard.setNewStatus}
                    onEdit={dashboard.handleEditRole}
                    onSave={dashboard.handleSaveRole}
                    onCancel={() => dashboard.setEditingUser(null)}
                />
            </motion.div>
        </div>
    );
};

export default ManageUsers;