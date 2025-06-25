import { useMemo } from "react";
import { useAdminDashboard } from "../hooks/useAdminDashboard.js";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { BarChart2, TrendingUp, Users } from 'lucide-react';

const DoctorBookingStats = () => {
    const { appointments } = useAdminDashboard();

    const bookingData = useMemo(() => {
        const countMap = {};

        appointments.forEach((appt) => {
            const doctor = appt.doctorName || "Unknown";
            countMap[doctor] = (countMap[doctor] || 0) + 1;
        });

        return Object.entries(countMap).map(([doctor, count]) => ({
            doctor,
            bookings: count,
        }));
    }, [appointments]);

    const totalBookings = useMemo(() => {
        return bookingData.reduce((sum, item) => sum + item.bookings, 0);
    }, [bookingData]);

    const topDoctor = useMemo(() => {
        return bookingData.reduce((max, item) =>
            item.bookings > (max?.bookings || 0) ? item : max
        , null);
    }, [bookingData]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <BarChart2 className="w-6 h-6 text-[#00B5F1]" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Doctor Booking Statistics
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-[#00B5F1]/10 to-[#00B5F1]/5 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00B5F1] rounded-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#00B5F1]/10 to-[#00B5F1]/5 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00B5F1] rounded-lg">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Most Booked Doctor</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {topDoctor ? `${topDoctor.bookings} bookings` : 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500">DR. {topDoctor?.doctor || 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {bookingData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <BarChart2 className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 text-center">No appointment data available</p>
                        <p className="text-sm text-gray-400 text-center mt-1">Book appointments to see statistics here</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={bookingData}
                            margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="doctor"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                tick={{ fill: '#4B5563', fontSize: 12 }}
                                height={70}
                            />
                            <YAxis
                                tick={{ fill: '#4B5563', fontSize: 12 }}
                                axisLine={{ stroke: '#E5E7EB' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar
                                dataKey="bookings"
                                fill="#00B5F1"
                                radius={[4, 4, 0, 0]}
                                name="Number of Bookings"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default DoctorBookingStats;