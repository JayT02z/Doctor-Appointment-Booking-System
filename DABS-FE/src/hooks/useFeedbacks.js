import { useState } from 'react';
import axios from 'axios';

export const useFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState({});

    const fetchFeedbackForAppointments = async (appointments) => {
        for (const appt of appointments) {
            if (appt.status === 'COMPLETED' && !feedbacks[appt.id]) {
                try {
                    const res = await axios.get(`http://localhost:8080/api/feedback/get/appointment/${appt.id}`);
                    if (res.data.statusCode === 200) {
                        setFeedbacks((prev) => ({
                            ...prev,
                            [appt.id]: res.data.data,
                        }));
                    }
                } catch (err) {
                    console.error(`Failed to fetch feedback for appointment ${appt.id}`, err);
                }
            }
        }
    };

    return { feedbacks, fetchFeedbackForAppointments };
};