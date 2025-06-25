// pages/AdminServiceUsageAnalytics.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartPie, Loader, TrendingUp, FileBarChart } from 'lucide-react';

// Modern color palette with better contrast
const COLORS = [
    "#00B5F1", // Brand color
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#6366F1", // Indigo
    "#EC4899", // Pink
    "#8B5CF6", // Purple
    "#14B8A6", // Teal
];

const AdminServiceUsageAnalytics = () => {
    const [serviceData, setServiceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServiceUsage = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/appointment/all");
                if (res.data.statusCode === 200) {
                    const raw = res.data.data;
                    const serviceCount = {};

                    raw.forEach((item) => {
                        const service = item.serviceName || "Unknown";
                        serviceCount[service] = (serviceCount[service] || 0) + 1;
                    });

                    const pieData = Object.entries(serviceCount).map(([name, value]) => ({ name, value }));
                    setServiceData(pieData);
                } else {
                    toast.error("Failed to fetch appointment data");
                }
            } catch (err) {
                toast.error("Error loading service analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchServiceUsage();
    }, []);

    const totalAppointments = serviceData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{data.name}</p>
                    <p className="text-sm text-[#00B5F1]">
                        {data.value} appointments ({((data.value / totalAppointments) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                {payload.map((entry, index) => (
                    <div
                        key={`legend-${index}`}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-200
                            ${selectedService === entry.value 
                                ? 'bg-gray-100 shadow-sm' 
                                : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedService(selectedService === entry.value ? null : entry.value)}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {entry.value}
                            </p>
                            <p className="text-xs text-gray-500">
                                {serviceData.find(item => item.name === entry.value)?.value} appointments
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <ChartPie className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Service Usage Analytics</h2>
                    </div>
                    <p className="text-sm text-gray-500">Track and analyze the usage patterns of different medical services</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#00B5F1]/10 rounded-lg">
                                <FileBarChart className="h-6 w-6 text-[#00B5F1]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Services</p>
                                <p className="text-2xl font-bold text-gray-900">{serviceData.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Appointments</p>
                                <p className="text-2xl font-bold text-gray-900">{totalAppointments}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Loader className="h-5 w-5 animate-spin" />
                                <span>Loading analytics...</span>
                            </div>
                        </div>
                    ) : serviceData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                            <ChartPie className="h-12 w-12 mb-2 text-gray-300" />
                            <p>No service usage data available.</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={serviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={140}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, value }) => `${name} (${value})`}
                                    labelLine={false}
                                >
                                    {serviceData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            opacity={selectedService ? (selectedService === entry.name ? 1 : 0.3) : 1}
                                            className="transition-opacity duration-200"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={renderLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminServiceUsageAnalytics;
