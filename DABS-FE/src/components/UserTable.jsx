import { Users, UserCog, Mail, Phone, Calendar, Activity, Check, X } from 'lucide-react';
import Pagination from "./doctor_dashboard/Pagination.jsx";
import { formatDate} from "../utils/format.js";
import dayjs from "dayjs";
import { toast } from 'react-hot-toast';
import { useState } from "react";

const UserTable = ({ users, editingUser, newRole, setNewRole, onEdit, onSave, onCancel }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'INACTIVE':
                return 'bg-red-50 text-red-600 border-red-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const getRoleStyle = (role) => {
        switch (role?.toUpperCase()) {
            case 'ADMIN':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'DOCTOR':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'PATIENT':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const handleRoleClick = (user) => {
        if (editingUser?.id === user.id || user.role === "ADMIN") return;
        onEdit(user);
    };

    const handleRoleChange = (e) => {
        const newRoleValue = e.target.value;
        toast((t) => (
            <div className="flex items-center gap-3">
                <div>
                    <p className="font-medium">Change user role to {newRoleValue}?</p>
                    <p className="text-sm text-gray-500">This action will update user permissions</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            onSave(newRoleValue);
                            toast.dismiss(t.id);
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => {
                            onCancel();
                            toast.dismiss(t.id);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-[#00B5F1]/10 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-[#00B5F1]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                        <div className="text-sm text-gray-500">{user.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Mail className="h-4 w-4 mr-2" />
                                        {user.email}
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone className="h-4 w-4 mr-2" />
                                            {user.phone}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingUser?.id === user.id ? (
                                    user.role === "ADMIN" ? (
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-sm ${getRoleStyle(user.role)}`}>
                                            {user.role}
                                        </span>
                                    ) : (
                                        <select
                                            value={newRole}
                                            onChange={handleRoleChange}
                                            className="px-3 py-1 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50"
                                            autoFocus
                                        >
                                            <option value="DOCTOR">Doctor</option>
                                            <option value="PATIENT">Patient</option>
                                        </select>
                                    )
                                ) : (
                                    <span
                                        onClick={() => handleRoleClick(user)}
                                        className={`cursor-pointer inline-flex items-center px-3 py-1 rounded-full border text-sm ${getRoleStyle(user.role)}`}
                                    >
                                    {user.role}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full border text-sm ${getStatusStyle(user.status)}`}>
                                    <Activity className="h-4 w-4 mr-2" />
                                    {user.status || 'Active'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(user.createdAt)}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default UserTable;