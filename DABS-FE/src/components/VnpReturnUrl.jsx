import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const VnpReturnUrl = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Lấy tất cả các query params từ URL
        const queryParams = location.search;
        // Gọi API payment_info với các params từ VNPay
        const response = await axios.get(`http://localhost:8080/api/payment/payment_info${queryParams}`);
        console.log('Payment response:', response.data);
        setPaymentStatus(response.data.data);
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setPaymentStatus({
          status: 'Error',
          message: 'Có lỗi xảy ra khi kiểm tra thanh toán',
          data: null
        });
      } finally {
        setLoading(false);
      }
    };

    if (location.search) {
      fetchPaymentStatus();
    }
  }, [location]);

  const getStatusIcon = () => {
    switch (paymentStatus?.status) {
      case 'Ok':
        return <CheckCircleIcon className="h-24 w-24 text-green-500" />;
      case 'No':
        return <XCircleIcon className="h-24 w-24 text-red-500" />;
      default:
        return <ExclamationCircleIcon className="h-24 w-24 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus?.status) {
      case 'Ok':
        return 'text-green-700';
      case 'No':
        return 'text-red-700';
      default:
        return 'text-yellow-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg text-gray-600">Đang xử lý thanh toán...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        <div className="text-center">
          {getStatusIcon()}
          <h2 className={`mt-6 text-3xl font-extrabold ${getStatusColor()}`}>
            {paymentStatus?.status === 'Ok' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{paymentStatus?.message}</p>

          {/* Hiển thị thêm thông tin giao dịch nếu có */}
          {paymentStatus?.status === 'Ok' && (
            <div className="mt-4 text-left bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Mã giao dịch: {new URLSearchParams(location.search).get('vnp_TxnRef')}
              </p>
              <p className="text-sm text-gray-600">
                Thời gian: {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate('/patient/payment')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Quay về trang thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default VnpReturnUrl;
