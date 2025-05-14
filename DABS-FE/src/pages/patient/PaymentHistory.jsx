import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const PaymentHistory = () => {
    const { patientId } = useAuth();
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/payment/patient/${patientId}`
                );
                setPaymentHistory(response.data.data || []); //  Assuming the data is in .data
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError(err.message || "Could not fetch payment history");
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPaymentHistory();
        }
    }, [patientId]);

    if (loading) {
        return <div>Loading payment history...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>
            {paymentHistory.length === 0 ? (
                <p>No payment history found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">Payment ID</th>
                            <th className="py-2 px-4 border-b text-left">Appointment ID</th>
                            <th className="py-2 px-4 border-b text-left">Amount</th>
                            <th className="py-2 px-4 border-b text-left">Payment Method</th>
                            <th className="py-2 px-4 border-b text-left">Status</th>
                            {/* Add more columns as needed */}
                        </tr>
                        </thead>
                        <tbody>
                        {paymentHistory.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{payment.id}</td>
                                <td className="py-2 px-4 border-b">{payment.appointmentId}</td>
                                <td className="py-2 px-4 border-b">{payment.amount}</td>
                                <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
                                <td className="py-2 px-4 border-b">{payment.status}</td>
                                {/* Add more cells based on your payment object */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;