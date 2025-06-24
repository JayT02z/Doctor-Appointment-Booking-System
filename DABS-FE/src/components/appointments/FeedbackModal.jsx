import React, { useState, Fragment } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaStar } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
    const [comment, setComment] = useState(existingFeedback?.feedbackText || "");
    const [submitting, setSubmitting] = useState(false);
    const { patientId } = useAuth();

    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            appointmentId: appointment.id,
            patientId: patientId,
            rating: ratingToString(rating),
            comment: comment,
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
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title className="text-xl font-bold text-gray-900">
                                        {existingFeedback ? "Update Feedback" : "Share Your Experience"}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            How would you rate your experience?
                                        </label>
                                        <div className="flex items-center justify-center gap-1 bg-gray-50 p-4 rounded-lg">
                                            {[...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                    <label key={i} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            className="hidden"
                                                            name="rating"
                                                            value={ratingValue}
                                                            onClick={() => setRating(ratingValue)}
                                                        />
                                                        <FaStar
                                                            className="transition-all duration-200 hover:scale-110"
                                                            color={ratingValue <= rating ? "#fbbf24" : "#e5e7eb"}
                                                            size={32}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Share your thoughts
                                        </label>
                                        <textarea
                                            className="w-full min-h-[120px] rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            placeholder="Tell us about your experience..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={submitting}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 flex items-center"
                                        >
                                            {submitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Feedback'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FeedbackModal;

