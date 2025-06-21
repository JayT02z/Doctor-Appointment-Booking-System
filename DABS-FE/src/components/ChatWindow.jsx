import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaUserMd } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

/**
 * Reusable chat window component.
 * @param {Array} messages - Array of message objects { id, sender, content, timestamp }.
 * @param {Function} onSend - Callback invoked when user submits a new message.
 */
export default function ChatWindow({ messages, onSend, isLoading, onSelectDoctor }) {
    const [inputValue, setInputValue] = useState("");
    const listRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full" role="region" aria-label="Cửa sổ chat">
            {/* Message list */}
            <div
                ref={listRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`max-w-[85%] px-4 py-2 rounded-2xl break-words shadow ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white self-end rounded-br-sm"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start rounded-bl-sm"
                            }`}
                        >
                            {msg.sender === "bot" && Array.isArray(msg.recommendations) && msg.recommendations.length > 0 ? (
                                <div>
                                    <p className="mb-2 whitespace-pre-line">{msg.content}</p>
                                    <div className="space-y-2 mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">👨‍⚕️ Gợi ý bác sĩ phù hợp:</p>
                                        {msg.recommendations.map((rec, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                                                onClick={() => onSelectDoctor?.(rec)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <FaUserMd className="text-blue-500" />
                                                    <div>
                                                        <p className="font-semibold">{rec.doctorName}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{rec.specialization}</p>
                                                        <p className="text-sm mt-1">
                                                            {Array.isArray(rec.availableTimes)
                                                                ? rec.availableTimes.slice(0, 3).join(", ")
                                                                : "Không có thông tin lịch trống"}
                                                            {Array.isArray(rec.availableTimes) && rec.availableTimes.length > 3 && " ..."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="whitespace-pre-line">{msg.content}</p>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                        <ImSpinner2 className="animate-spin" /> Đang phản hồi...
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                aria-label="Gửi tin nhắn"
            >
                <label htmlFor="chat-input" className="sr-only">
                    Nhập tin nhắn
                </label>
                <input
                    id="chat-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Nhập tin nhắn..."
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="shrink-0 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
                    disabled={!inputValue.trim()}
                >
                    Gửi
                </button>
            </form>
        </div>
    );
}

ChatWindow.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            sender: PropTypes.oneOf(["user", "doctor", "bot"]).isRequired,
            content: PropTypes.string.isRequired,
            timestamp: PropTypes.number,
            recommendations: PropTypes.array,
        })
    ).isRequired,
    onSend: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    onSelectDoctor: PropTypes.func,
};