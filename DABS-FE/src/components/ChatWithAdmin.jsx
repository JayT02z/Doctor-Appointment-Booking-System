import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import AdminChatWindow from "./AdminChatWindow";
import { MessageCircle, X } from "lucide-react";

export default function ChatWithAdmin() {
    const { user } = useAuth();
    const { activeChatWindow, openChat, closeChat } = useChat();
    const isOpen = activeChatWindow === 'admin';

    if (!user || (user.role !== "PATIENT" && user.role !== "DOCTOR")) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[380px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-100"
                        style={{ height: "calc(100vh - 120px)", maxHeight: "600px" }}
                    >
                        {/* Header */}
                        <div className="bg-[#00B5F1] px-4 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Chat với Admin</h3>
                                        <p className="text-sky-100 text-sm">Chúng tôi sẽ phản hồi sớm nhất</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => closeChat()}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="flex-1 overflow-hidden bg-gray-50">
                            <AdminChatWindow />
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => openChat('admin')}
                        className="group relative w-14 h-14 flex items-center justify-center rounded-full bg-[#00B5F1] text-white shadow-lg hover:shadow-[#00B5F1]/25 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="sr-only">Chat với Admin</span>

                        {/* Tooltip */}
                        <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            Chat với Admin
                            {/* Arrow */}
                            <div className="absolute top-1/2 right-0 -mt-1.5 -mr-1.5 border-4 border-transparent border-l-gray-800"></div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
