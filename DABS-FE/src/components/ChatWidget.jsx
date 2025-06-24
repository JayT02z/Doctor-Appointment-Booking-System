import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleBottomCenterTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import ChatWindow from "./ChatWindow";
import useBotChat from "../hooks/useBotChat";
import useDoctorChat from "../hooks/useDoctorChat";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("bot");

    const bot = useBotChat();
    const doctor = useDoctorChat();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[350px] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
                        style={{ height: "calc(100vh - 120px)", maxHeight: "600px" }}
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold">DABS Chat</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMode("bot")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                                        ${mode === "bot" 
                                            ? "bg-white text-blue-600" 
                                            : "text-white/80 hover:bg-white/10"}`}
                                >
                                    <CpuChipIcon className="w-5 h-5" />
                                    Chatbot
                                </button>
                                <button
                                    onClick={() => setMode("doctor")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                                        ${mode === "doctor" 
                                            ? "bg-white text-blue-600" 
                                            : "text-white/80 hover:bg-white/10"}`}
                                >
                                    <UserCircleIcon className="w-5 h-5" />
                                    Bác sĩ
                                </button>
                            </div>
                        </div>

                        {/* Chat Content */}
                        <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
                            <div className="h-full overflow-y-auto">
                                {mode === "bot" ? (
                                    <ChatWindow messages={bot.messages} onSend={bot.sendMessage} />
                                ) : (
                                    <ChatWindow messages={doctor.messages} onSend={doctor.sendMessage} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3
                                 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300
                                 hover:-translate-y-0.5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                        <span className="font-medium">Chat với chúng tôi</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}