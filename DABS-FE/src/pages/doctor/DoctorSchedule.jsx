import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Check, Lock, CheckSquare } from "lucide-react";
import { Copy, Trash2 } from "lucide-react";

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
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleSelectAll(day)}
                                                className="text-xs px-2.5 py-1.5 bg-[#00B5F1]/10 text-[#00B5F1] rounded-lg
                                                         hover:bg-[#00B5F1]/20 transition-colors duration-200 font-medium"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={() => handleClearAll(day)}
                                                className="text-xs px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg
                                                         hover:bg-red-100 transition-colors duration-200 font-medium"
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
                                                className={`group relative flex items-center justify-center py-3 rounded-xl text-sm font-medium 
                                                    transition-all duration-200 cursor-pointer select-none
                                                    ${isPast
                                                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-75'
                                                        : isHighlighted
                                                            ? 'bg-gradient-to-r from-[#00B5F1] to-[#0099cc] text-white shadow-lg shadow-[#00B5F1]/20 hover:shadow-xl hover:shadow-[#00B5F1]/30 hover:-translate-y-0.5'
                                                            : isLocallySelected
                                                                ? 'bg-[#00B5F1]/10 text-[#00B5F1] border-2 border-[#00B5F1] hover:bg-[#00B5F1]/20'
                                                                : 'bg-white border-2 border-gray-100 hover:border-[#00B5F1]/30 hover:bg-gray-50/80'
                                                    }
                                                    ${!isPast && !isHighlighted && !isLocallySelected && 'hover:scale-[1.02]'}
                                                `}
                                            >
                                                {/* Time Display */}
                                                <span className="relative z-10">{formatSlot(slot)}</span>

                                                {/* Background Decorative Elements */}
                                                {!isPast && (isHighlighted || isLocallySelected) && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-200" />
                                                )}

                                                {/* Status Indicator */}
                                                {isPast ? (
                                                    <span className="absolute right-3 flex items-center text-gray-400">
                                                        <Lock className="w-3 h-3" />
                                                    </span>
                                                ) : isHighlighted ? (
                                                    <span className="absolute right-3 flex items-center text-white/90">
                                                        <Check className="w-3 h-3" />
                                                    </span>
                                                ) : isLocallySelected && (
                                                    <span className="absolute right-3 flex items-center text-[#00B5F1]">
                                                        <Clock className="w-3 h-3" />
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={handleSubmit}
                    className="group relative w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#00B5F1] to-[#0099cc] text-white
                             font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-[#00B5F1]/20
                             active:scale-[0.98] transition-all duration-200"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                                  translate-x-[-100%] animate-shimmer rounded-xl" />
                    <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Save Schedule
                    </span>
                </button>

                <button
                    onClick={() => {
                        const copied = {};
                        for (const [day, slots] of Object.entries(scheduleData)) {
                            copied[day] = [...slots];
                        }
                        setWeekOffset((prev) => {
                            const next = prev + 1;
                            setTimeout(() => setScheduleData(copied), 0);
                            return next;
                        });
                        toast.success("Schedule copied to next week!");
                    }}
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3
                             bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200
                             text-gray-700 rounded-xl font-medium text-sm transition-all duration-200
                             border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                    <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
                    Copy to Next Week
                </button>

                <div className="fixed bottom-6 right-6 flex flex-col gap-2">
                    <button
                        onClick={() => {
                            const allDays = {};
                            daysOfWeek.forEach(day => {
                                allDays[day] = [...timeSlots];
                            });
                            setScheduleData(allDays);
                            toast.success("Selected all time slots for all days!");
                        }}
                        className="px-4 py-2 bg-[#00B5F1] text-white rounded-lg hover:bg-[#009cd3]
                                 transition-colors duration-200 shadow-lg hover:shadow-xl
                                 flex items-center gap-2 text-sm font-medium"
                    >
                        <CheckSquare className="w-4 h-4" />
                        Select All Days
                    </button>
                    <button
                        onClick={() => {
                            setScheduleData({});
                            toast.success("Cleared all selections!");
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                                 transition-colors duration-200 shadow-lg hover:shadow-xl
                                 flex items-center gap-2 text-sm font-medium"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All Days
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DoctorSchedule;