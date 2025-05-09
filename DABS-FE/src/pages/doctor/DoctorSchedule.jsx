import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import consele from "react-modal/lib/helpers/bodyTrap.js";

const DoctorSchedule = () => {
    const { doctorId } = useAuth();
    const [scheduleData, setScheduleData] = useState({});
    const [weekOffset, setWeekOffset] = useState(0);
    const [serverSchedule, setServerSchedule] = useState({});

    const daysOfWeek = [
        "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
    ];
    const timeSlots = [
        "SLOT_07_09", "SLOT_09_11", "SLOT_11_13",
        "SLOT_13_15", "SLOT_15_17", "SLOT_17_19", "SLOT_19_22"
    ];

    const formatSlot = (slot) => {
        const [_, start, end] = slot.split("_");
        return `${start}:00 - ${end}:00`;
    };

    const getDayIndex = (dayOfWeek) => daysOfWeek.indexOf(dayOfWeek);

    const getDateForDay = (dayIndex, offset = 0) => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
        const targetDate = new Date(monday);
        targetDate.setDate(monday.getDate() + dayIndex);
        return new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
    };

    const formatDate = (date) => date.toLocaleDateString("en-GB");

    const fetchDoctorSchedule = async () => {
        if (doctorId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/schedules/doctorschedules/${doctorId}`);
                const existingSchedule = response.data.data;
                const processedSchedule = {};

                existingSchedule.forEach(item => {
                    const backendDate = new Date(Date.UTC(item.date[0], item.date[1] - 1, item.date[2]));
                    const currentMonday = getDateForDay(0, weekOffset);
                    const itemDayIndex = getDayIndex(item.dayOfWeek);
                    const itemDateThisWeek = new Date(currentMonday);
                    itemDateThisWeek.setDate(currentMonday.getDate() + itemDayIndex);

                    if (backendDate.toDateString() === itemDateThisWeek.toDateString()) {
                        if (!processedSchedule[item.dayOfWeek]) {
                            processedSchedule[item.dayOfWeek] = [];
                        }
                        processedSchedule[item.dayOfWeek].push(...item.timeSlot);
                    }
                });
                setServerSchedule(processedSchedule);
                setScheduleData(processedSchedule); // Initialize local state with fetched data
            } catch (error) {
                console.error("Error fetching doctor's schedule:", error);
                toast.error("Failed to load schedule.");
            }
        }
    };

    useEffect(() => {
        fetchDoctorSchedule();
    }, [doctorId, weekOffset]);

    const handleToggle = (day, slot) => {
        setScheduleData(prev => {
            const daySchedule = prev[day] || [];
            return {
                ...prev,
                [day]: daySchedule.includes(slot)
                    ? daySchedule.filter(s => s !== slot)
                    : [...daySchedule, slot]
            };
        });
    };

    const handleSelectAll = (day) => {
        setScheduleData(prev => ({
            ...prev,
            [day]: [...timeSlots]
        }));
    };

    const handleClearAll = (day) => {
        setScheduleData(prev => ({
            ...prev,
            [day]: []
        }));
    };

    const handleSubmit = async () => {
        const data = Object.entries(scheduleData).map(([day, slots]) => {
            const originalSlots = serverSchedule[day] || []; // Lấy khung giờ gốc từ server
            const addedSlots = slots.filter(slot => !originalSlots.includes(slot)); // Chỉ lấy khung giờ mới được thêm
            const removedSlots = originalSlots.filter(slot => !slots.includes(slot)); // Lấy khung giờ bị bỏ chọn

            if (addedSlots.length > 0 || removedSlots.length > 0) {
                const dayIndex = getDayIndex(day);
                const date = getDateForDay(dayIndex, weekOffset).toISOString().slice(0, 10);
                return {
                    dayOfWeek: day,
                    date: date,
                    timeSlot: addedSlots.length > 0 ? addedSlots : removedSlots, // Gửi khung giờ thêm hoặc xóa
                    available: addedSlots.length > 0 ? true : false // Thêm hoặc xóa
                };
            }
            return null;
        }).filter(item => item !== null);

        console.log("Sending to API:", { doctorId, schedules: data });

        try {
            const response = await axios.post("http://localhost:8080/api/schedules/create", { // Hoặc có thể cần một API khác để update
                doctorId,
                schedules: data
            });
            const res = response.data;

            if (res.statusCode === 200) {
                toast.success(res.message || "Schedule updated successfully!");
                fetchDoctorSchedule(); // Làm mới dữ liệu
            } else {
                toast.error(res.message || "Unexpected response from server.");
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Failed to update schedule");
        }
    };

    const isSlotSelectedFromServer = (day, slot) => {
        return serverSchedule[day]?.includes(slot);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Weekly Schedule</h2>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setWeekOffset(weekOffset - 1)}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                >
                    ⬅ Previous Week
                </button>
                <span className="text-lg font-semibold text-gray-600">
                    Week of {formatDate(getDateForDay(0, weekOffset))}
                </span>
                <button
                    onClick={() => setWeekOffset(weekOffset + 1)}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next Week ➡
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={weekOffset}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {daysOfWeek.map((day, dayIndex) => {
                        const date = getDateForDay(dayIndex, weekOffset);
                        const selectedSlots = scheduleData[day] || [];
                        const isPast = date < new Date().setHours(0, 0, 0, 0);

                        return (
                            <div key={day} className={`rounded-lg border p-4 shadow-sm ${isPast ? 'bg-gray-100 opacity-60 pointer-events-none' : 'bg-gray-50'}`}>
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-700">{day}</h4>
                                        <p className="text-sm text-gray-500">{formatDate(date)}</p>
                                    </div>
                                    {!isPast && (
                                        <div className="space-x-1">
                                            <button
                                                onClick={() => handleSelectAll(day)}
                                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={() => handleClearAll(day)}
                                                className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {timeSlots.map(slot => {
                                        const isLocallySelected = selectedSlots.includes(slot);
                                        const isSelectedFromServer = isSlotSelectedFromServer(day, slot);
                                        const isHighlighted = isSelectedFromServer;

                                        return (
                                            <div
                                                key={slot}
                                                onClick={() => !isPast && handleToggle(day, slot)}
                                                className={`text-center py-2 rounded-md text-sm font-medium border transition-all cursor-pointer
                                                    ${isPast
                                                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                                                    : isHighlighted
                                                        ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700' // Nổi bật
                                                        : isLocallySelected
                                                            ? 'bg-blue-200 text-gray-700 border-blue-300 hover:bg-blue-300' // Đã chọn cục bộ (chưa save)
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                                                }`}
                                            >
                                                {formatSlot(slot)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            <div className="mt-10 text-center">
                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-md hover:bg-blue-700 shadow-md transition"
                >
                    Save Schedule
                </button>
            </div>
        </div>
    );
}
export default DoctorSchedule;