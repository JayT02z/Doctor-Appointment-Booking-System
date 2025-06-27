import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ChatWindowAdmin({ messages = [], onSend, isLoading }) {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

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
        <div className="flex flex-col h-full max-h-[80vh] bg-gray-50">
            {/* Message list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                    const isAdmin = msg.senderName.toLowerCase().includes("admin");
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isAdmin ? "justify-end" : "justify-start"} animate-fade-in-up`}
                        >
                            <div
                                className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl shadow-sm 
                                ${isAdmin 
                                    ? "bg-[#00B5F1] text-white rounded-br-md" 
                                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                                } transition-all duration-200 hover:shadow-md`}
                            >
                                <div className={`text-xs font-medium mb-1 ${isAdmin ? "text-sky-50" : "text-gray-600"}`}>
                                    {msg.senderName}
                                </div>
                                <div className={`text-sm ${isAdmin ? "text-white" : "text-gray-700"}`}>
                                    {msg.message}
                                </div>
                                <div className={`text-[10px] mt-1.5 ${isAdmin ? "text-sky-100" : "text-gray-400"} text-right`}>
                                    {formatDate(msg.createdDate)}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 px-4 py-3 bg-white flex items-center gap-3 shadow-sm">
                <textarea
                    className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/30 focus:border-[#00B5F1] transition-all placeholder:text-gray-400"
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    className="p-2.5 bg-[#00B5F1] rounded-xl text-white hover:bg-[#0095c8] transition-all duration-200 disabled:opacity-50 disabled:hover:bg-[#00B5F1] shadow-sm hover:shadow-md active:scale-95"
                    disabled={isLoading || !newMessage.trim()}
                >
                    <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
                </button>
            </div>
        </div>
    );
}