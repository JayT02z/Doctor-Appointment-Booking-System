// pages/AdminPaymentOverview.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { DollarSign, TrendingUp, Users, Loader } from 'lucide-react';
import { formatCurrency} from "../utils/format.js";

const AdminPaymentOverview = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTimeRange, setSelectedTimeRange] = useState('all');

    useEffect(() => {
        const fetchAllPayments = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/payment");
                if (res.data.statusCode === 200) {
                    // Filter only PAID payments
                    const paidPayments = res.data.data.filter(payment => payment.status === 'PAID');
                    setPayments(paidPayments);
                } else {
                    toast.error("Failed to fetch payment data");
                }
            } catch (err) {
                toast.error("Error fetching payments");
            } finally {
                setLoading(false);
            }
        };

        fetchAllPayments();
    }, []);

    const chartData = payments.reduce((acc, curr) => {
        const patient = curr.appointment?.patientName?.fullName || `Patient #${curr.appointment?.patientName?.id}`;
        const existing = acc.find((item) => item.name === patient);
        if (existing) {
            existing.amount += curr.amount;
            existing.transactions = (existing.transactions || 0) + 1;
        } else {
            acc.push({
                name: patient,
                amount: curr.amount,
                transactions: 1
            });
        }
        return acc;
    }, []);

    // Calculate stats from PAID payments only
    const totalRevenue = chartData.reduce((sum, item) => sum + item.amount, 0);
    const totalPatients = chartData.length;
    const averageRevenue = totalPatients ? (totalRevenue / totalPatients).toFixed(2) : 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
                    <p className="text-sm text-[#00B5F1]">
                        Amount: {payload[0].value.toLocaleString()}₫
                    </p>
                    <p className="text-sm text-gray-500">
                        Transactions: {payload[0].payload.transactions}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className=" bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Revenue Overview</h2>
                    <p className="mt-1 text-sm text-gray-500">Track your revenue performance and patient payments</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#00B5F1]/10 rounded-lg">
                                <DollarSign className="h-6 w-6 text-[#00B5F1]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalRevenue.toLocaleString()}₫
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Average Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {averageRevenue}₫
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Patients</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalPatients}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue by Patient</h3>
                        <select
                            value={selectedTimeRange}
                            onChange={(e) => setSelectedTimeRange(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1]/10 transition-all duration-200"
                        >
                            <option value="all">All Time</option>
                            <option value="month">This Month</option>
                            <option value="week">This Week</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-80">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Loader className="h-5 w-5 animate-spin" />
                                <span>Loading data...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        interval={0}
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickFormatter={(value) => `${formatCurrency(value)}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="amount"
                                        fill="#00B5F1"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={60}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentOverview;