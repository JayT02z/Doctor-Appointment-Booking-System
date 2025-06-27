import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ChatWindowPatient({ messages = [], onSend, isLoading }) {
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Tự động scroll xuống cuối
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const trimmed = newMessage.trim();
        if (trimmed) {
            onSend(trimmed);
            setNewMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatDate = (dateArr) => {
        if (!Array.isArray(dateArr)) return "";
        const [y, m, d, h, mi] = dateArr;
        return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y} ${String(h).padStart(2, "0")}:${String(mi).padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col h-full">
            {/* Message list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
                {messages.map((msg) => {
                    const isSenderSelf = msg.senderId === user?.id;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isSenderSelf ? "justify-end" : "justify-start"} animate-in fade-in-0 duration-200`}
                        >
                            <div className={`group relative max-w-[80%] 
                                ${isSenderSelf 
                                    ? "bg-gradient-to-br from-[#00B5F1] to-[#0095c8] text-white rounded-t-2xl rounded-l-2xl" 
                                    : "bg-white border border-gray-100 text-gray-700 rounded-t-2xl rounded-r-2xl shadow-sm"
                                }`}
                            >
                                <div className="px-4 py-2.5 space-y-1.5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className={`text-xs font-medium
                                            ${isSenderSelf ? "text-sky-100" : "text-gray-500"}`}
                                        >
                                            {msg.senderName || (isSenderSelf ? "Bạn" : "Người gửi")}
                                        </div>
                                        <div className={`text-[10px] 
                                            ${isSenderSelf ? "text-sky-100" : "text-gray-400"}`}
                                        >
                                            {formatDate(msg.createdDate)}
                                        </div>
                                    </div>
                                    <div className="text-sm break-words whitespace-pre-wrap leading-relaxed">
                                        {msg.message}
                                    </div>
                                </div>

                                {/* Triangle tip */}
                                <div className={`absolute bottom-0 w-4 h-4 overflow-hidden
                                    ${isSenderSelf ? "right-0 transform translate-x-1/2" : "left-0 transform -translate-x-1/2"}`}
                                >
                                    <div className={`absolute w-2 h-2 transform rotate-45 origin-bottom-left
                                        ${isSenderSelf 
                                            ? "bg-[#0095c8] -bottom-1 -left-1" 
                                            : "bg-white border border-gray-100 -bottom-[0.5px] -left-[0.5px]"}`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-100">
                <div className="p-3 bg-white">
                    <div className="flex items-end gap-2 bg-gray-50 rounded-2xl p-1">
                        <textarea
                            className="flex-1 min-h-[44px] max-h-32 text-sm bg-transparent px-3 py-2 resize-none focus:outline-none placeholder:text-gray-400"
                            rows={1}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhập tin nhắn..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !newMessage.trim()}
                            className="p-2.5 bg-[#00B5F1] rounded-xl text-white
                                hover:bg-[#0095c8] disabled:opacity-50 disabled:hover:bg-[#00B5F1]
                                transition-all duration-200 hover:shadow-md active:scale-95
                                disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
