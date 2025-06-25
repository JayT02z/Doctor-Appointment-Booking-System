import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { DollarSign, TrendingUp, Calendar, Loader } from 'lucide-react';

const AdminSaleForEachDay = () => {
    const [dailySales, setDailySales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week'); // week, month, year

    useEffect(() => {
        const fetchAllPayments = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/api/payment");
                if (res.data.statusCode === 200) {
                    const byDate = {};

                    // Process all payments for counting transactions
                    res.data.data.forEach(p => {
                        const date = p.appointment?.date?.join("-") || "unknown";
                        if (!byDate[date]) {
                            byDate[date] = {
                                amount: 0,
                                transactions: 0
                            };
                        }
                        // Only add amount if payment is PAID
                        if (p.status === 'PAID') {
                            byDate[date].amount += p.amount;
                        }
                        // Count all transactions regardless of status
                        byDate[date].transactions += 1;
                    });

                    const chartReady = Object.entries(byDate)
                        .map(([date, data]) => ({
                            date,
                            amount: data.amount,
                            transactions: data.transactions
                        }))
                        .sort((a, b) => new Date(a.date) - new Date(b.date));

                    setDailySales(chartReady);
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

    const totalSales = dailySales.reduce((sum, day) => sum + day.amount, 0);
    const totalTransactions = dailySales.reduce((sum, day) => sum + day.transactions, 0);
    const averageSales = dailySales.length ? (totalSales / dailySales.length).toFixed(2) : 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                    <p className="text-sm text-[#00B5F1] mb-1">
                        Revenue: {payload[0].value.toLocaleString()}₫
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
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Calendar className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Daily Sales Overview</h2>
                    </div>
                    <p className="text-sm text-gray-500">Track your daily revenue and transaction patterns</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#00B5F1]/10 rounded-lg">
                                <DollarSign className="h-6 w-6 text-[#00B5F1]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalSales.toLocaleString()}₫
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
                                <p className="text-sm text-gray-500 mb-1">Average Daily Sales</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {averageSales}₫
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#00B5F1] focus:ring-2 focus:ring-[#00B5F1]/10 transition-all duration-200"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="year">Last 12 Months</option>
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
                                    data={dailySales}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickFormatter={(value) => `${value}₫`}
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

export default AdminSaleForEachDay;

