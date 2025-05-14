import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';

const BookAppointment = () => {
  const { patientId } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    appointmentId: null,
    paymentMethod: 'CASH',
    amount: 0,
  });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [doctorImages, setDoctorImages] = useState(new Map()); // Store doctor images

  const [formData, setFormData] = useState({
    serviceId: '',
    notes: '',
    date: '',
    timeSlot: '',
  });

  const fetchDoctorImage = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/doctor/getimage/${doctorId}`);
      if (response.data && response.data.data) {
        setDoctorImages(prevImages => new Map(prevImages).set(doctorId, response.data.data));
      }
    } catch (error) {
      console.error(`Error fetching image for doctor ${doctorId}:`, error);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/doctor/all');
        const list = res.data.data || [];
        setDoctors(list);
        setFilteredDoctors(list);

        // Fetch images for all doctors
        list.forEach(doctor => fetchDoctorImage(doctor.id));

      } catch (err) {
        console.error('Failed to fetch doctors', err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Thanh toán VNPAYQR thành công!');
      setPaymentSuccess(false); // Reset state
    }
  }, [paymentSuccess]);

  const fetchSchedule = async (doctorId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/schedules/doctorschedules/${doctorId}`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming = res.data.data
          .map(({ date, timeSlot }) => {
            const formatted = `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;
            return { date: formatted, timeSlots: timeSlot, dateObj: new Date(formatted) };
          })
          .filter(({ dateObj }) => dateObj >= today)
          .map(({ date, timeSlots }) => ({ date, timeSlots }));

      setSchedule(upcoming);
    } catch (err) {
      console.error('Error fetching schedule:', err);
    }
  };

  const openBookingModal = async (doctor) => {
    setSelectedDoctor(doctor);

    let initialServiceId = '';
    let initialServicePrice = 0;

    if (doctor.services && doctor.services.length > 0) {
      initialServiceId = doctor.services[0].id;
      initialServicePrice = doctor.services[0].price;
    }

    setFormData({
      serviceId: initialServiceId,
      notes: '',
      date: '',
      timeSlot: '',
    });
    setSelectedServicePrice(initialServicePrice);

    await fetchSchedule(doctor.id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceId, date, timeSlot, notes } = formData;

    if (!selectedDoctor || !serviceId || !date || !timeSlot) return;

    const payload = {
      patientId,
      doctorId: selectedDoctor.id,
      serviceId,
      date,
      timeSlot,
      notes,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/appointment/create', payload);
      toast.success('Appointment booked!');
      setShowModal(false);

      setPaymentData({
        ...paymentData,
        appointmentId: response.data.data.id,
        amount: selectedServicePrice,
      });
      setShowPaymentModal(true);
    } catch {
      toast.error('Booking failed.');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'serviceId' && selectedDoctor) {
      const selectedService = selectedDoctor.services.find(s => s.id === Number(e.target.value));

      if (selectedService) {
        setSelectedServicePrice(selectedService.price);
      } else {
        setSelectedServicePrice(0);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = doctors.filter((doc) =>
        doc.fullName.toLowerCase().includes(term) ||
        doc.services.some((s) => s.name.toLowerCase().includes(term))
    );
    setFilteredDoctors(filtered);
  };

  const handlePayment = async () => {
    try {
      if (paymentData.paymentMethod === 'VNPAYQR') {
        const payload = {
          appointmentId: paymentData.appointmentId,
          paymentMethod: paymentData.paymentMethod,
          amount: selectedServicePrice, // Use selectedServicePrice
        };
        const response = await axios.post('http://localhost:8080/api/payment/create_payment', payload);

        if (response.data && response.data.url) {
          window.location.href = response.data.url; // Redirect to VNPAYQR
          return; // Stop further execution
        } else {
          toast.error('Không nhận được URL thanh toán từ VNPAY.');
          return;
        }
      }

      const payload = {
        appointmentId: paymentData.appointmentId,
        amount: selectedServicePrice,
        paymentMethod: paymentData.paymentMethod,
        status: 'PENDING',
      };
      await axios.post('http://localhost:8080/api/payment/add', payload);
      toast.success('Thanh toán thành công!');
      setShowPaymentModal(false);

    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
      toast.error('Thanh toán thất bại.');
    }
  };

  const handleCancelPayment = () => {
    setShowCancelConfirm(true);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const formatTimeSlot = (slot) => {
    const timeParts = slot.replace('SLOT_', '').split('_');
    if (timeParts.length === 2) {
      return `${timeParts[0]}:00 - ${timeParts[1]}:00`;
    }
    return slot;
  };

  return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search doctors or services..."
            className="w-full mb-6 px-4 py-2 border rounded"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
              <div key={doc.id} className="border rounded-xl p-4 shadow hover:shadow-md transition">
                {doctorImages.has(doc.id) && (
                    <img
                        src={`http://localhost:8080${doctorImages.get(doc.id)}`} // Assuming the API returns a relative path
                        alt={doc.fullName}
                        className="mb-4 rounded-full w-24 h-24 object-cover mx-auto"
                    />
                )}
                <h3 className="font-semibold text-lg text-center">{doc.fullName}</h3>
                <p className="text-sm text-gray-500 text-center">Specialization: {doc.specialization}</p>
                <p className="text-sm mt-1 text-center">
                  Services: {doc.services.map((s) => s.name).join(', ')}
                </p>
                <button
                    className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => openBookingModal(doc)}
                >
                  Book Now
                </button>
              </div>
          ))}
        </div>

        <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-50 inset-0">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <Dialog.Title className="text-xl font-bold mb-4">
                Book with Dr. {selectedDoctor?.fullName}
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInput}
                                placeholder="Notes or reason for visit..."
                                required
                                className="w-full p-2 border rounded"
                            />

                {selectedDoctor?.services?.length > 0 && (
                    <div>
                      <select
                          name="serviceId"
                          value={formData.serviceId}
                          onChange={handleInput}
                          required
                          className="w-full p-2 border rounded"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        {selectedDoctor.services.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                        ))}
                      </select>
                      {selectedServicePrice > 0 && (
                          <p className="text-sm text-green-600 font-semibold mt-2">
                            Giá: <span className="font-bold">{formatCurrency(selectedServicePrice)}</span>
                          </p>
                      )}
                    </div>
                )}

                <select
                    name="date"
                    value={formData.date}
                    onChange={handleInput}
                    required
                    className="w-full p-2 border rounded"
                >
                  <option value="">-- Select date --</option>
                  {schedule.map((s) => (
                      <option key={s.date} value={s.date}>
                        {s.date}
                      </option>
                  ))}
                </select>

                {formData.date && (
                    <div className="grid grid-cols-3 gap-2">
                      {schedule
                          .find((s) => s.date === formData.date)
                          ?.timeSlots.map((slot) => (
                              <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                                  className={`p-2 rounded border text-sm ${
                                      formData.timeSlot === slot
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-100 hover:bg-gray-200'
                                  }`}
                              >
                                {formatTimeSlot(slot)}
                              </button>
                          ))}
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        <Dialog open={showPaymentModal} onClose={() => {}} className="fixed z-50 inset-0">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <Dialog.Title className="text-xl font-bold mb-4">
                Thông tin thanh toán
              </Dialog.Title>

              <p>
                Tổng tiền: {selectedServicePrice}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phương thức thanh toán:
                </label>
                <select
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="CASH">Tiền mặt</option>
                  <option value="VNPAYQR">VNPAYQR</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                    type="button"
                    onClick={handleCancelPayment}
                    className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                    type="button"
                    onClick={handlePayment}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Xác nhận thanh toán
                </button>
              </div>

              {showCancelConfirm && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md shadow-md">
                      <p className="mb-4">Bạn có chắc chắn muốn hủy thanh toán?</p>
                      <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowCancelConfirm(false)}
                            className="px-4 py-2 rounded border"
                        >
                          Không
                        </button>
                        <button
                            onClick={() => {
                              setShowPaymentModal(false);
                              setShowCancelConfirm(false);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Có, hủy
                        </button>
                      </div>
                    </div>
                  </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
  );
};

export default BookAppointment;