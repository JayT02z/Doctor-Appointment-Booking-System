import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaUserMd } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

/**
 * Reusable chat window component.
 * @param {Array} messages - Array of message objects { id, sender, content, timestamp }.
 * @param {Function} onSend - Callback invoked when user submits a new message.
 */
export default function ChatWindow({ messages, onSend, isLoading, onSelectDoctor }) {
    const [inputValue, setInputValue] = useState("");
    const listRef = useRef(null);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

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
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-full" role="region" aria-label="Cửa sổ chat">
            {/* Message list */}
            <div
                ref={listRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 scroll-smooth"
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
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`
                                max-w-[85%] px-4 py-2.5 rounded-2xl break-words
                                ${msg.sender === "user"
                                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white self-end rounded-br-sm shadow-sm shadow-blue-500/10"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start rounded-bl-sm shadow-sm"
                                }
                            `}>
                                {msg.sender === "bot" && Array.isArray(msg.recommendations) && msg.recommendations.length > 0 ? (
                                    <div className="space-y-3">
                                        <p className="whitespace-pre-line">{msg.content}</p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium flex items-center gap-2">
                                                <FaUserMd className="text-blue-500" />
                                                Gợi ý bác sĩ phù hợp:
                                            </p>
                                            {msg.recommendations.map((rec, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-3
                                                             bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/50
                                                             cursor-pointer transition-colors duration-200"
                                                    onClick={() => onSelectDoctor?.(rec)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50
                                                                      flex items-center justify-center flex-shrink-0">
                                                            <FaUserMd className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                                {rec.doctorName}
                                                            </p>
                                                            <p className="text-sm text-blue-600 dark:text-blue-400">
                                                                {rec.specialization}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {Array.isArray(rec.availableTimes)
                                                                    ? `Lịch trống: ${rec.availableTimes.slice(0, 3).join(", ")}`
                                                                    : "Không có thông tin lịch trống"}
                                                                {Array.isArray(rec.availableTimes) && rec.availableTimes.length > 3 && " ..."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span>Đang phản hồi...</span>
                    </motion.div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-3"
                    aria-label="Gửi tin nhắn"
                >
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            id="chat-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-4 py-2.5 pr-12 bg-gray-100 dark:bg-gray-900
                                     border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20
                                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                                     text-gray-900 dark:text-gray-100"
                            placeholder="Nhập tin nhắn của bạn..."
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full
                                 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600
                                 text-white transition-colors duration-200"
                    >
                        <PaperAirplaneIcon className="h-5 w-5" />
                        <span className="sr-only">Gửi tin nhắn</span>
                    </button>
                </form>
            </div>
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