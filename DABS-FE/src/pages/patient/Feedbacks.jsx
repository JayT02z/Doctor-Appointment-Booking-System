import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FaStar } from "react-icons/fa"; //  Install react-icons: npm install react-icons

const FeedbackModal = ({
                           isOpen,
                           onClose,
                           appointment,
                           existingFeedback = null,
                           token,
                           refreshAppointments,
                       }) => {
    const ratingToString = (numRating) => {
        switch (numRating) {
            case 1: return "ONE_STAR";
            case 2: return "TWO_STAR";
            case 3: return "THREE_STAR";
            case 4: return "FOUR_STAR";
            case 5: return "FIVE_STAR";
            default: return "";
        }
    };

    const stringToRating = (stringRating) => {
        switch (stringRating) {
            case "ONE_STAR": return 1;
            case "TWO_STAR": return 2;
            case "THREE_STAR": return 3;
            case "FOUR_STAR": return 4;
            case "FIVE_STAR": return 5;
            default: return 5;
        }
    };


    const [rating, setRating] = useState(existingFeedback ? stringToRating(existingFeedback.rating) : 5);
    const [comment, setComment] = useState(existingFeedback?.comment || "");
    const [submitting, setSubmitting] = useState(false);
    const { patientId } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            rating: ratingToString(rating),
            comment,
            ...(existingFeedback
                ? {}
                : {
                    patientId: patientId,
                    appointmentId: appointment.id,
                }),
        };
        console.log("Payload", payload);
        try {
            if (existingFeedback) {
                await axios.put(
                    `http://localhost:8080/api/feedback/update/${existingFeedback.id}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Feedback updated");
            } else {
                await axios.post(
                    "http://localhost:8080/api/feedback/create",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Feedback submitted");
            }

            onClose();
            refreshAppointments();
        } catch (err) {
            toast.error("Failed to submit feedback");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {existingFeedback ? "Update Feedback" : "Leave Feedback"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-medium">Rating:</label>
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        className="hidden"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <FaStar
                                        className="star"
                                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                        size={30}
                                        style={{
                                            cursor: "pointer",
                                            transition: "color 200ms",
                                        }}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <label className="block mb-2 font-medium">Comment:</label>
                    <textarea
                        className="w-full border rounded px-3 py-2 mb-4"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-600 text-white rounded"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;