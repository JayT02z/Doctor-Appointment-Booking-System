import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PaymentTable from "../../components/PaymentTable.jsx";
import { motion } from "framer-motion";
import { Wallet, Loader2, ArrowDownCircle, TrendingUp } from 'lucide-react';
import {useAdminDashboard} from "../../hooks/useAdminDashboard.js";

const ManagePayments = () => {
    const dashboard = useAdminDashboard()
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalAmount: 0,
        totalTransactions: 0,
        avgTransaction: 0,
        growthRate: '+15%'
    });

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/payment`);
                if (res.data.statusCode === 200) {
                    const paymentData = res.data.data;
                    setPayments(paymentData);

                    // Calculate stats - PAID payments for revenue, all payments for transactions count
                    const paidPayments = paymentData.filter(p => p.status === 'PAID');
                    const total = paidPayments.reduce((sum, p) => sum + p.amount, 0);
                    setStats({
                        totalAmount: total,
                        totalTransactions: paymentData.length, // Count all payments
                        avgTransaction: paidPayments.length ? (total / paidPayments.length).toFixed(2) : 0,
                        growthRate: '+15%' // This should come from backend calculation
                    });
                } else {
                    toast.error("Failed to fetch payment history");
                }
            } catch (error) {
                toast.error("Error fetching payment data");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-3 text-gray-500">
                    <Loader2 className="h-8 w-8 animate-spin text-[#00B5F1]" />
                    <p>Loading payment data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Wallet className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Monitor and manage all payment transactions
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#00B5F1]/10 rounded-lg">
                                <Wallet className="h-6 w-6 text-[#00B5F1]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalAmount.toLocaleString()} ₫
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <ArrowDownCircle className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalTransactions}
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
                                <p className="text-sm text-gray-500 mb-1">Average Transaction</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Number(stats.avgTransaction).toLocaleString()} ₫
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Table */}
                <PaymentTable
                    payments={dashboard.payments}
                    loading={dashboard.loading}
                    onUpdatePaymentStatus={dashboard.handleUpdatePaymentStatus}
                />
            </motion.div>
        </div>
    );
};

export default ManagePayments;