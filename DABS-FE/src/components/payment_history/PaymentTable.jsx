import React from "react";
import PaymentRow from "./PaymentRow";
import { BanknotesIcon } from "@heroicons/react/24/outline";

/**
 * Bảng hiển thị danh sách thanh toán (rút gọn + nút xem chi tiết)
 * @param {Array} payments
 * @param {Function} onViewDetails - callback khi click "Xem chi tiết"
 */
const PaymentTable = ({ payments = [], onViewDetails }) => {
    if (!payments.length) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <BanknotesIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Không có lịch sử thanh toán</h3>
                <p className="text-sm text-gray-500">Lịch sử thanh toán của bạn sẽ xuất hiện tại đây</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bác sĩ
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số tiền
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chi tiết
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment) => (
                            <PaymentRow
                                key={payment.id}
                                payment={payment}
                                onViewDetails={onViewDetails}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;