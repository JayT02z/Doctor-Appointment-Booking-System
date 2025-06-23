import {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '../utils/format';

const useBookAppointment = () => {
    const { patientId } = useAuth();
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const searchTimeout = useRef(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorImages, setDoctorImages] = useState(new Map());
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({ serviceId: '', notes: '', date: '', timeSlot: '' });
    const [schedule, setSchedule] = useState([]);
    const [selectedServicePrice, setSelectedServicePrice] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentData, setPaymentData] = useState({
        appointmentId: null,
        paymentMethod: 'CASH',
        amount: 0,
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/doctor/all');
                const list = res.data.data || [];
                setDoctors(list);
                setFilteredDoctors(list);
                list.forEach((doctor) => fetchDoctorImage(doctor.id));
            } catch (err) {
                console.error('Failed to fetch doctors', err);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (paymentSuccess) {
            toast.success('Thanh toán VNPAYQR thành công!');
            setPaymentSuccess(false);
        }
    }, [paymentSuccess]);

    const fetchDoctorImage = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/doctor/getimage/${doctorId}`);
            if (response.data?.data) {
                setDoctorImages((prev) => new Map(prev).set(doctorId, response.data.data));
            }
        } catch (error) {
            console.error(`Error fetching image for doctor ${doctorId}:`, error);
        }
    };

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
        if (doctor.services?.length > 0) {
            initialServiceId = doctor.services[0].id;
            initialServicePrice = doctor.services[0].price;
        }
        setFormData({ serviceId: initialServiceId, notes: '', date: '', timeSlot: '' });
        setSelectedServicePrice(initialServicePrice);
        await fetchSchedule(doctor.id);
        setShowModal(true);
    };

    const closeBookingModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { serviceId, date, timeSlot, notes } = formData;
        if (!selectedDoctor || !serviceId || !date || !timeSlot) return;

        const payload = { patientId, doctorId: selectedDoctor.id, serviceId, date, timeSlot, notes };

        try {
            const res = await axios.post('http://localhost:8080/api/appointment/create', payload);
            toast.success('Appointment booked!');
            setShowModal(false);
            setPaymentData({ ...paymentData, appointmentId: res.data.data.id, amount: selectedServicePrice });
            setShowPaymentModal(true);
        } catch {
            toast.error('Booking failed.');
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'serviceId' && selectedDoctor) {
            const selectedService = selectedDoctor.services.find((s) => s.id === Number(value));
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

        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            if (term === '') {
                setFilteredDoctors(doctors);
                setSuggestions([]);
                return;
            }

            const filtered = doctors.filter(
                (doc) =>
                    doc.fullName.toLowerCase().includes(term) ||
                    doc.services.some((s) => s.name.toLowerCase().includes(term))
            );

            setFilteredDoctors(filtered);

            const newSuggestions = [];
            doctors.forEach((doc) => {
                if (doc.fullName.toLowerCase().includes(term)) {
                    newSuggestions.push(doc.fullName);
                }
                doc.services.forEach((s) => {
                    if (s.name.toLowerCase().includes(term)) {
                        newSuggestions.push(`${doc.fullName} - ${s.name}`);
                    }
                });
            });
            setSuggestions(newSuggestions.slice(0, 3));
        }, 300);
    };

    const selectSuggestion = (text) => {
        setSearchTerm(text);
        const term = text.toLowerCase();
        const filtered = doctors.filter(
            (doc) =>
                doc.fullName.toLowerCase().includes(term) ||
                doc.services.some((s) => s.name.toLowerCase().includes(term))
        );
        setFilteredDoctors(filtered);
        setSuggestions([]);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentData((prev) => ({ ...prev, paymentMethod: method }));
    };

    const handlePayment = async () => {
        try {
            if (paymentData.paymentMethod === 'VNPAYQR') {
                const payload = {
                    appointmentId: paymentData.appointmentId,
                    paymentMethod: paymentData.paymentMethod,
                    amount: selectedServicePrice,
                };
                const res = await axios.post('http://localhost:8080/api/payment/create_payment', payload);
                if (res.data?.url) {
                    window.location.href = res.data.url;
                    return;
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

    const handleCancelPayment = () => setShowCancelConfirm(true);

    const cancelPayment = () => {
        setShowPaymentModal(false);
        setShowCancelConfirm(false);
    };

    return {
        searchTerm,
        handleSearch,
        suggestions,
        selectSuggestion,
        filteredDoctors,
        doctorImages,
        openBookingModal,
        showModal,
        selectedDoctor,
        formData,
        schedule,
        handleInput,
        handleSubmit,
        closeBookingModal,
        selectedServicePrice,
        showPaymentModal,
        paymentData,
        handlePaymentMethodChange,
        handlePayment,
        handleCancelPayment,
        cancelPayment,
        showCancelConfirm,
        setShowCancelConfirm,
        formatCurrency,
    };
};

export default useBookAppointment;
