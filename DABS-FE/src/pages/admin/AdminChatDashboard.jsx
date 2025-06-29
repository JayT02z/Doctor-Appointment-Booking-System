import React, { useState, useMemo } from "react";
import useAdminConversations from "../../hooks/useAdminConversations";
import ChatWindowAdmin from "../../components/ChatWindowAdmin.jsx";
import { Users } from "lucide-react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

export default function AdminChatDashboard() {
    const {
        conversations = [],
        selectedConversationId,
        setSelectedConversationId,
        messages = [],
        loading,
        sendMessage,
    } = useAdminConversations();

    const { user } = useAuth();
    const myUserId = user?.id;

    const [filterRecent, setFilterRecent] = useState(false);

    const filteredConversations = useMemo(() => {
        if (!Array.isArray(conversations)) return [];
        if (!filterRecent) return conversations;
        return [...conversations].sort((a, b) => {
            const dateA = new Date(
                ...a.modifiedDate.slice(0, 6),
                Math.floor(a.modifiedDate[6] / 1000000)
            );
            const dateB = new Date(
                ...b.modifiedDate.slice(0, 6),
                Math.floor(b.modifiedDate[6] / 1000000)
            );
            return dateB - dateA;
        });
    }, [filterRecent, conversations]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#00B5F1]/10 rounded-xl">
                            <Users className="h-6 w-6 text-[#00B5F1]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Conversation Management</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Manage and reply to conversations initiated by patients
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center gap-2">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        <label className="text-sm font-medium text-gray-700">Sort:</label>
                        <select
                            value={filterRecent ? "recent" : "default"}
                            onChange={(e) => setFilterRecent(e.target.value === "recent")}
                            className="pl-3 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#00B5F1] focus:ring-4 focus:ring-[#00B5F1]/10 transition-all duration-200"
                        >
                            <option value="default">Default Order</option>
                            <option value="recent">Most Recent</option>
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar - conversation list */}
                    <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="border-b px-4 py-3">
                            <h3 className="text-sm font-semibold text-gray-700">Conversations</h3>
                        </div>
                        <ul className="overflow-y-auto max-h-[70vh] divide-y divide-gray-100">
                            {filteredConversations.map((conv) => {
                                // Tìm participant khác mình (admin)
                                const other = conv.participants.find(p => p.userId !== myUserId);

                                // Xác định tên hiển thị
                                let displayName = other?.userName || "Ẩn danh";
                                if (other?.role?.toLowerCase() === "doctor") {
                                    displayName = `DR_${displayName}`;
                                }

                                const isUnread = conv.status !== "READ"; // placeholder status

                                return (
                                    <li
                                        key={conv.id}
                                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                                            conv.id === selectedConversationId ? "bg-gray-50" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedConversationId(conv.id);
                                        }}
                                    >
                                        <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium text-gray-900 truncate">
                                                            {displayName}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-0.5">ID: {conv.id}</p>
                                                    </div>
                                                    {isUnread && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00B5F1] text-white">
                                                            Mới
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Chat panel */}
                    <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {selectedConversationId ? (
                            loading ? (
                                <div className="flex items-center justify-center h-full py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B5F1]"></div>
                                        <p className="text-gray-500 text-sm">Đang tải tin nhắn...</p>
                                    </div>
                                </div>
                            ) : (
                                <ChatWindowAdmin
                                    messages={messages}
                                    onSend={sendMessage}
                                    isLoading={loading}
                                />
                            )
                        ) : (
                            <div className="flex items-center justify-center h-full py-20">
                                <div className="text-center">
                                    <div className="p-3 bg-gray-50 rounded-full inline-block mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm">Chọn một cuộc trò chuyện để bắt đầu</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
