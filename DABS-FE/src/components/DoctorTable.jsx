import { Stethoscope, Search, UserCircle2, Building2, GraduationCap, Award } from 'lucide-react';
import Pagination from "./doctor_dashboard/Pagination.jsx";

const DoctorTable = ({ data, pageState }) => {
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
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Doctor</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Specialization</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Experience</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Qualification</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Hospital</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginated.map((doctor) => (
                            <tr key={doctor.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#00B5F1]/10 flex items-center justify-center">
                                            <UserCircle2 className="w-5 h-5 text-[#00B5F1]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{doctor.fullName}</p>
                                            <p className="text-sm text-gray-500">{doctor.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Stethoscope className="w-4 h-4 text-[#00B5F1]" />
                                        {doctor.specialization}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Award className="w-4 h-4 text-[#00B5F1]" />
                                        {doctor.experience} years
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <GraduationCap className="w-4 h-4 text-[#00B5F1]" />
                                        {doctor.qualification}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Building2 className="w-4 h-4 text-[#00B5F1]" />
                                        {doctor.hospital}
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

export default DoctorTable;