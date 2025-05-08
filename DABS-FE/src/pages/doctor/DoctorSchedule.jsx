import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDoctor } from "../../context/DoctorContext";
import { motion, AnimatePresence } from "framer-motion";

const daysOfWeek = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
];
const timeSlots = [
    "SLOT_07_09", "SLOT_09_11", "SLOT_11_13",
    "SLOT_13_15", "SLOT_15_17", "SLOT_17_19", "SLOT_19_22"
];

const formatSlot = (slot) => {
    const [_, start, end] = slot.split("_"); // SLOT_15_17 -> ["SLOT", "15", "17"]
    return `${start}:00 - ${end}:00`;
};

const getDateForDay = (dayIndex, offset = 0) => {
    const today = new Date();

    // Start from the most recent Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1); // Monday of the current week
    monday.setDate(monday.getDate() + offset * 7); // Apply week offset

    console.log(`Base Monday Date (with offset ${offset}): ${monday.toLocaleDateString("en-GB")}`);

    // Calculate the target date by adding dayIndex
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + dayIndex); // DayIndex gives you the correct day from Monday

    // Log the calculated target date
    console.log(`Calculated Target Date for ${daysOfWeek[dayIndex]}: ${targetDate.toLocaleDateString("en-GB")}`);

    // Ensure the date is correctly formatted as YYYY-MM-DD (ISO format)
    const utcDate = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
    console.log(`Calculated Target Date in UTC for ${daysOfWeek[dayIndex]}: ${utcDate.toISOString().slice(0, 10)}`);

    return utcDate;
};

const formatDate = (date) => date.toLocaleDateString("en-GB"); // DD/MM/YYYY

const DoctorSchedule = () => {
    const { doctorId } = useDoctor();
    const [scheduleData, setScheduleData] = useState({});
    const [weekOffset, setWeekOffset] = useState(0);

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
        // Log the current state of scheduleData for debugging
        console.log("Schedule Data:", scheduleData);

        const data = Object.entries(scheduleData).map(([day, slots], index) => {
            if (slots && slots.length > 0) {
                // Here we are using the correct dayIndex, which is the index of the selected day in the `daysOfWeek` array
                const selectedDayIndex = daysOfWeek.indexOf(day); // Get the actual index of the selected day
                const date = getDateForDay(selectedDayIndex, weekOffset); // Pass the correct index for the selected day
                console.log(`Selected date for ${day}: ${date.toISOString().slice(0, 10)}`); // Log date being sent

                return {
                    dayOfWeek: day,
                    date: date.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
                    timeSlot: slots,
                    available: true
                };
            }
            return null; // Skip days with no time slots selected
        }).filter(item => item !== null); // Remove null entries

        console.log("Prepared Request Data:", {
            doctorId,
            schedules: data
        });

        try {
            const response = await axios.post("http://localhost:8080/api/schedules/create", {
                doctorId,
                schedules: data
            });
            const res = response.data;

            if (res.statusCode === 200) {
                toast.success(res.message || "Schedule saved successfully!");
            }
            else {
                toast.error(res.message || "Unexpected response from server.");
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error("Failed to save schedule");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Weekly Schedule</h2>

            {/* Week Navigator */}
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

            {/* Schedule Table */}
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

                        // Block past days
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Remove time part
                        const isPast = date < today;

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
                                        const isSelected = selectedSlots.includes(slot);
                                        return (
                                            <div
                                                key={slot}
                                                onClick={() => !isPast && handleToggle(day, slot)}
                                                className={`text-center py-2 rounded-md text-sm font-medium border transition-all cursor-pointer
                            ${isPast
                                                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                                                    : isSelected
                                                        ? 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
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
};

export default DoctorSchedule;
