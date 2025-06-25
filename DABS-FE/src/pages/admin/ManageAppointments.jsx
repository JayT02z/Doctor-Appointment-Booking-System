import AppointmentTable from "../../components/AppointmentTable.jsx";
import SearchBar from "../../components/doctor_dashboard/SearchBar";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import { Filter } from 'lucide-react';

const ManageAppointments = () => {
    const dashboard = useAdminDashboard();

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Manage Appointments</h2>
                <p className="mt-2 text-sm text-gray-600">View and manage all appointment bookings in one place</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="flex-1 w-full">
                        <SearchBar
                            value={dashboard.search}
                            onChange={dashboard.setSearch}
                            placeholder="Search by patient or doctor name..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filters:</span>
                        </div>
                        <select
                            value={dashboard.statusFilter}
                            onChange={(e) => dashboard.setStatusFilter(e.target.value)}
                            className="flex-1 sm:flex-none min-w-[140px] px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        >
                            <option value="">All Statuses</option>
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                        <select
                            value={dashboard.paymentFilter}
                            onChange={(e) => dashboard.setPaymentFilter(e.target.value)}
                            className="flex-1 sm:flex-none min-w-[140px] px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        >
                            <option value="">All Payments</option>
                            <option value="PAID">PAID</option>
                            <option value="PENDING">PENDING</option>
                            <option value="FAILED">FAILED</option>
                        </select>
                    </div>
                </div>

                <AppointmentTable
                    appointments={dashboard.filteredAppointments}
                    payments={dashboard.payments}
                    editingId={dashboard.editingAppointmentStatus}
                    newStatus={dashboard.newAppointmentStatus}
                    setEditingId={dashboard.setEditingAppointmentStatus}
                    setNewStatus={dashboard.setNewAppointmentStatus}
                    onUpdate={dashboard.handleUpdateAppointmentStatus}
                    onConfirmPayment={dashboard.handleConfirmPayment}
                    pageState={dashboard.appointmentPageState}
                />
            </div>
        </div>
    );
};

export default ManageAppointments;
