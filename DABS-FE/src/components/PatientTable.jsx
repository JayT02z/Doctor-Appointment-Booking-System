import { useNavigate } from "react-router-dom";
import { Users, ChevronDown, Search, Trash2, Edit, User2 } from 'lucide-react';
import Pagination from "./doctor_dashboard/Pagination.jsx";

const PatientTable = ({ data, onDelete, pageState }) => {
    const navigate = useNavigate();
    const { page, setPage, itemsPerPage } = pageState;
    const paginated = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-y border-gray-100">
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Username</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date of Birth</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Gender</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Address</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Medical History</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginated.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#00B5F1]/10 flex items-center justify-center">
                                            <User2 className="w-4 h-4 text-[#00B5F1]" />
                                        </div>
                                        <span className="font-medium text-gray-900">{patient.username}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{patient.dob?.join("-") || "-"}</td>
                                <td className="px-6 py-4 text-gray-600">{patient.gender || "-"}</td>
                                <td className="px-6 py-4 text-gray-600">{patient.address || "-"}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="max-w-xs truncate">
                                        {patient.medicalHistory || "-"}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
};

export default PatientTable;