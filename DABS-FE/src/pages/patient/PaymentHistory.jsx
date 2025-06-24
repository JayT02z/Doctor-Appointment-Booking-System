import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { BanknotesIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

import SearchBar from "../../components/payment_history/SearchBar";
import PaymentFilters from "../../components/payment_history/PaymentFilters.jsx";
import Pagination from "../../components/payment_history/Pagination";
import PaymentTable from "../../components/payment_history/PaymentTable.jsx";
import PaymentDetailsModal from "../../components/payment_history/PaymentDetailsModal";

const PaymentHistoryPage = () => {
    const { patientId } = useAuth();
    const [allPayments, setAllPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [keyword, setKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    // Details modal
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/api/payment/patient/${patientId}`
                );
                setAllPayments(res.data.data || []);
                setError(null);
            } catch (err) {
                console.error("Lỗi fetch dữ liệu:", err);
                setError("Không thể tải lịch sử thanh toán.");
            } finally {
                setLoading(false);
            }
        };

        if (patientId) fetchPayments();
    }, [patientId]);

    // Filter + Search logic
    useEffect(() => {
        let data = [...allPayments];

        if (statusFilter !== "ALL") {
            data = data.filter((p) => p.status === statusFilter);
        }

        if (methodFilter !== "ALL") {
            data = data.filter((p) => p.paymentMethod === methodFilter);
        }

        if (keyword.trim() !== "") {
            const lower = keyword.toLowerCase();
            data = data.filter((p) => {
                const doctor = p.appointment?.doctorName?.toLowerCase() || "";
                const patient = p.appointment?.patientName?.username?.toLowerCase() || "";
                return (
                    p.id.toString().includes(lower) ||
                    doctor.includes(lower) ||
                    patient.includes(lower)
                );
            });
        }

        setFilteredPayments(data);
        setCurrentPage(1); // reset về trang đầu khi filter
    }, [allPayments, statusFilter, methodFilter, keyword]);

    // Pagination slice
    const totalPages = Math.ceil(filteredPayments.length / pageSize);
    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BanknotesIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <SearchBar keyword={keyword} setKeyword={setKeyword} />
                        </div>
                        <PaymentFilters
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            methodFilter={methodFilter}
                            setMethodFilter={setMethodFilter}
                        />
                    </div>

                    {loading ? (
                        <div className="py-32 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                                <p className="text-gray-500 text-sm">Loading payment history...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="py-32 flex items-center justify-center">
                            <div className="flex flex-col items-center text-center">
                                <div className="rounded-full bg-red-100 p-3 mb-4">
                                    <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <p className="text-gray-900 font-medium mb-1">Failed to load payments</p>
                                <p className="text-gray-500 text-sm">{error}</p>
                            </div>
                        </div>
                    ) : filteredPayments.length === 0 ? (
                        <div className="py-32 flex items-center justify-center">
                            <div className="flex flex-col items-center text-center">
                                <div className="rounded-full bg-gray-100 p-3 mb-4">
                                    <BanknotesIcon className="h-6 w-6 text-gray-400" />
                                </div>
                                <p className="text-gray-900 font-medium mb-1">No payments found</p>
                                <p className="text-gray-500 text-sm">
                                    {keyword
                                        ? "Try adjusting your search or filters"
                                        : "Your payment history will appear here"
                                    }
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <PaymentTable
                                payments={paginatedPayments}
                                onViewDetails={(payment) => setSelectedPayment(payment)}
                            />
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <PaymentDetailsModal
                isOpen={!!selectedPayment}
                payment={selectedPayment}
                onClose={() => setSelectedPayment(null)}
            />
        </div>
    );
};

export default PaymentHistoryPage;

