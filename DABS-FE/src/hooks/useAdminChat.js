import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:8080/api/chat";

export default function useAdminChat() {
    const { user, token } = useAuth();
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadExistingConversation = async () => {
        try {
            const res = await axios.get(`${API_BASE}/conversations1?userId=${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const existing = res.data.data?.find(
                (conv) =>
                    conv.type === "DIRECT" &&
                    Array.isArray(conv.participants) &&
                    conv.participants.some((p) => p.role === "ADMIN") &&
                    conv.participants.some((p) => p.userId === user.id)
            );

            return existing?.id || null;
        } catch (err) {
            console.error("Error checking for existing conversation:", err);
            return null;
        }
    };

    const startChat = async () => {
        if (!user?.id) return;
        setIsLoading(true);
        try {
            let convId = await loadExistingConversation();

            if (!convId) {
                const res = await axios.post(
                    `${API_BASE}/conversations`,
                    {
                        userIds: [user.id], // bạn đã confirm payload chỉ cần userId
                        type: "DIRECT",
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                convId = res.data.data; // bạn đã confirm data trả về là ID
            }

            setConversationId(convId);
            setIsChatStarted(true);

            // Load message history
            const msgRes = await axios.get(`${API_BASE}/messages1?conversationId=${convId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessages(msgRes.data.data || []);
        } catch (err) {
            console.error("Failed to start/load chat:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (message) => {
        if (!conversationId || !user?.id || !message) return;
        try {
            const msgObj = {
                conversationId,
                senderId: user.id,
                message,
            };

            const res = await axios.post(`${API_BASE}/messages`, msgObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessages((prev) => [...prev, res.data.data]); // lấy đúng data
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    return {
        messages,
        isChatStarted,
        isLoading,
        startChat,
        sendMessage,
    };
}