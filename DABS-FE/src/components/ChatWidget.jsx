import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import useBotChat from "../hooks/useBotChat";
import useDoctorChat from "../hooks/useDoctorChat";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("bot"); // or "doctor"

    const bot = useBotChat();
    const doctor = useDoctorChat();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-[350px] h-[500px] bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode("bot")}
                                className={`px-2 py-1 rounded ${mode === "bot" ? "bg-white text-blue-600" : "text-white"}`}
                            >
                                Chatbot
                            </button>
                            <button
                                onClick={() => setMode("doctor")}
                                className={`px-2 py-1 rounded ${mode === "doctor" ? "bg-white text-blue-600" : "text-white"}`}
                            >
                                Bác sĩ
                            </button>
                        </div>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto">
                            {mode === "bot" ? (
                                <ChatWindow messages={bot.messages} onSend={bot.sendMessage} />
                            ) : (
                                <ChatWindow messages={doctor.messages} onSend={doctor.sendMessage} />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
                >
                    💬 Chat
                </button>
            )}
        </div>
    );
}