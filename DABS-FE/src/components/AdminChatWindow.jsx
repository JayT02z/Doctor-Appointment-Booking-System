import React, { useEffect } from "react";
import ChatWindowPatient from "./ChatWindowPatient";
import useAdminChat from "../hooks/useAdminChat";
import { MessageCircle } from "lucide-react";

export default function AdminChatWindow() {
    const {
        messages,
        isChatStarted,
        isLoading,
        startChat,
        sendMessage,
    } = useAdminChat();

    useEffect(() => {
        startChat();
    }, []);

    return (
        <div className="flex flex-col h-full">
            {isChatStarted ? (
                <ChatWindowPatient
                    messages={messages}
                    onSend={sendMessage}
                    isLoading={isLoading}
                />
            ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 animate-ping rounded-full bg-[#00B5F1]/10"></div>
                            <div className="relative p-4 bg-[#00B5F1]/10 rounded-full">
                                <MessageCircle className="w-8 h-8 text-[#00B5F1]" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-gray-700 font-medium">Đang kết nối...</h3>
                            <p className="text-gray-500 text-sm">Chúng tôi đang thiết lập kết nối chat</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}