import React, { useState } from 'react';
import AppointmentDetailModal from './AppointmentDetailModal.jsx';
import { formatDate } from '../utils/format.js';

const AppointmentTable = ({ appointments, payments, editingId, newStatus, setEditingId, setNewStatus, onUpdate, pageState }) => {
    const { page, setPage, itemsPerPage } = pageState;
    const paginated = appointments.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusBadgeStyle = (status) => {
        const baseStyle = "px-3 py-1 rounded-full text-xs font-medium";
        switch (status?.toUpperCase()) {
            case 'COMPLETED':
                return `${baseStyle} bg-green-100 text-green-800`;
            case 'PENDING':
                return `${baseStyle} bg-yellow-100 text-yellow-800`;
            case 'CANCELLED':
                return `${baseStyle} bg-red-100 text-red-800`;
            case 'CONFIRMED':
                return `${baseStyle} bg-blue-100 text-blue-800`;
            default:
                return `${baseStyle} bg-gray-100 text-gray-800`;
        }
    };

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Appointments List</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            {['Patient', 'Doctor', 'Date', 'Status', 'Payment', 'Actions'].map((h) => (
                                <th key={h} className="px-6 py-4 bg-[#00B5F1] text-white text-left text-sm font-semibold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginated.map((appt) => {
                            const payment = payments.find((p) => p.appointment.id === appt.id);
                            return (
                                <tr key={appt.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-700">{appt.patientName.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{appt.doctorName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(appt.date)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {editingId === appt.id ? (
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                                className="border rounded px-2 py-1 text-sm focus:outline-none focus:border-[#00B5F1]"
                                            >
                                                {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className={getStatusBadgeStyle(appt.status)}>
                                                {appt.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            payment?.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {payment?.status || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right space-x-2">
                                        {editingId === appt.id ? (
                                            <>
                                                <button
                                                    onClick={() => onUpdate(appt.id, newStatus)}
                                                    className="bg-[#00B5F1] hover:bg-[#0095c8] text-white text-xs px-3 py-1.5 rounded-md transition-colors duration-200"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => { setEditingId(appt.id); setNewStatus(appt.status); }}
                                                    className="bg-[#00B5F1] hover:bg-[#0095c8] text-white text-xs px-3 py-1.5 rounded-md transition-colors duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleViewDetails(appt)}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-md transition-colors duration-200"
                                                >
                                                    View Details
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <AppointmentDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                appointment={selectedAppointment}
            />
        </div>
    );
};

export default AppointmentTable;