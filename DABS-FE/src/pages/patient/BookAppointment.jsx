import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

const BookAppointment = () => {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    reason: '',
    medicalHistory: '',
    date: '',
    time: '',
  });

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/services');
        setServices(res.data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  // Simulated schedule fetch — replace this with your real API call
  const fetchDoctorSchedule = async (doctorId) => {
    try {
      // Example mock schedule
      const schedule = [
        { date: '2025-04-21', timeSlots: ['09:00', '11:00', '14:00'] },
        { date: '2025-04-22', timeSlots: ['10:00', '13:00'] },
      ];
      setDoctorSchedule(schedule);
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    }
  };

  const handleBookClick = async (doctor) => {
    setSelectedDoctor(doctor);
    await fetchDoctorSchedule(doctor.id);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: user?.id,
      doctorId: selectedDoctor?.id,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      medicalHistory: formData.medicalHistory,
    };

    try {
      await axios.post('http://localhost:8080/api/appointment/create', payload);
      alert('Appointment booked successfully!');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to book appointment:', err);
      alert('Booking failed');
    }
  };

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Book an Appointment</h1>

        {services.map((service) => (
            <div key={service.id} className="mb-6">
              <h2 className="text-xl font-semibold">{service.name}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {service.doctors?.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="p-4 border rounded-xl shadow hover:shadow-lg transition"
                    >
                      <h3 className="font-bold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      <button
                          onClick={() => handleBookClick(doctor)}
                          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Book
                      </button>
                    </div>
                ))}
              </div>
            </div>
        ))}

        <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
              <Dialog.Title className="text-xl font-bold mb-4">Book Appointment with {selectedDoctor?.name}</Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium">Full Name</label>
                  <input
                      type="text"
                      value={user?.fullName || ''}
                      disabled
                      className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium">Gender</label>
                    <input
                        type="text"
                        value={user?.gender || ''}
                        disabled
                        className="w-full mt-1 p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">DOB</label>
                    <input
                        type="date"
                        value={user?.dob || ''}
                        disabled
                        className="w-full mt-1 p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        type="text"
                        value={user?.phone || ''}
                        disabled
                        className="w-full mt-1 p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full mt-1 p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Address</label>
                  <input
                      type="text"
                      value={user?.address || ''}
                      disabled
                      className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Reason for Examination</label>
                  <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Medical History</label>
                  <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Select Date</label>
                  <select
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded"
                      required
                  >
                    <option value="">-- Choose a date --</option>
                    {doctorSchedule.map((slot) => (
                        <option key={slot.date} value={slot.date}>
                          {slot.date}
                        </option>
                    ))}
                  </select>
                </div>

                {formData.date && (
                    <div>
                      <label className="block font-medium">Select Time</label>
                      <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full mt-1 p-2 border rounded"
                          required
                      >
                        <option value="">-- Choose a time --</option>
                        {doctorSchedule
                            .find((d) => d.date === formData.date)
                            ?.timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                            ))}
                      </select>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
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
                    Book Appointment
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
  );
};

export default BookAppointment;
