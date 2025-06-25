// components/admin/PaymentTable.jsx
import { useState } from "react";
import Pagination from "./doctor_dashboard/Pagination.jsx";
import PatientDetailModal from "./doctor_dashboard/PatientDetailModal.jsx";
import AppointmentDetailModal from "./AppointmentDetailModal.jsx";
import { DollarSign, Search, Filter, Loader2, Calendar, CreditCard, User, FileText, QrCodeIcon } from 'lucide-react';

const PaymentTable = ({ payments = [], loading = false, onUpdatePaymentStatus }) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const pageSize = 10;

    const filteredPayments = payments.filter((p) => {
        const patient = p.appointment?.patientName?.fullName?.toLowerCase() || "";
        const doctor = p.appointment?.doctorName?.toLowerCase() || "";
        const matchesSearch = patient.includes(search.toLowerCase()) || doctor.includes(search.toLowerCase());
        const matchesStatus = statusFilter === "" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredPayments.length / pageSize);
    const paginatedPayments = filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'PAID':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'PENDING':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header & Filters */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                        <CreditCard className="h-6 w-6 text-[#00B5F1]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                        <p className="text-sm text-gray-500 mt-1">View and manage payment records</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by patient or doctor..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200
                                     focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                     transition-all duration-200"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="min-w-[160px] px-4 py-2.5 rounded-lg border border-gray-200
                                    focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10
                                    transition-all duration-200"
                    >
                        <option value="">All Status</option>
                        <option value="PAID">Paid</option>
                        <option value="PENDING">Pending</option>
                    </select>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-y border-gray-100">
                            <th className="px-6 py-4 text-left font-medium text-gray-500">ID</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-500">Patient</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-500">Date</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-500">Amount</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-500">Method</th>
                            <th className="px-6 py-4 text-left font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedPayments && paginatedPayments.length > 0 ? (
                            paginatedPayments.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedAppointment(p.appointment)}
                                            className="font-medium text-[#00B5F1] hover:text-[#009cd3] transition-colors duration-200"
                                        >
                                            #{p.id}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedPatient(p.appointment?.patientName)}
                                            className="flex items-center gap-2 text-gray-600 hover:text-[#00B5F1] transition-colors duration-200"
                                        >
                                            <User className="h-4 w-4" />
                                            {p.appointment?.patientName?.fullName || "-"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{p.appointment?.date?.join("-") || "-"}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{p.amount.toLocaleString()} ₫</td>
                                    <td className="px-6 py-4 text-gray-600">{p.paymentMethod}</td>
                                    <td className="px-6 py-4">
                                        {p.status === "PENDING" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onUpdatePaymentStatus(p.id, "PAID")}
                                                    className="px-3 py-1 rounded-full text-xs font-medium border border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => onUpdatePaymentStatus(p.id, "FAILED")}
                                                    className="px-3 py-1 rounded-full text-xs font-medium border border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(p.status)}`}>
                                                {p.status}
                                            </span>
                                        )}

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-6 py-8 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <DollarSign className="h-8 w-8 text-gray-300" />
                                        <p>No payment records found</p>
                                        <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* Modals */}
            <PatientDetailModal
                isOpen={!!selectedPatient}
                onClose={() => setSelectedPatient(null)}
                patient={selectedPatient}
            />

            <AppointmentDetailModal
                isOpen={!!selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                appointment={selectedAppointment}
            />
        </div>
    );
};

export default PaymentTable;