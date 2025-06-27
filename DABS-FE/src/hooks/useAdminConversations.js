import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:8080/api/chat";

export default function useAdminConversations() {
    const { user, token } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load all conversations for the admin
    useEffect(() => {
        const fetchConversations = async () => {
            if (!user?.id) return;
            try {
                const res = await axios.get(`${API_BASE}/conversations1?userId=${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConversations(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch conversations:", err);
            }
        };
        fetchConversations();
    }, [user?.id]);

    // Load messages when a conversation is selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConversationId) return;
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/messages1?conversationId=${selectedConversationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [selectedConversationId]);

    const sendMessage = async (message) => {
        if (!selectedConversationId || !user?.id || !message) return;
        try {
            const res = await axios.post(
                `${API_BASE}/messages`,
                {
                    conversationId: selectedConversationId,
                    senderId: user.id,
                    message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const savedMessage = res.data?.data;
            if (savedMessage) {
                setMessages((prev) => [...prev, savedMessage]);
            }
        } catch (err) {
            console.error("Failed to send admin message:", err);
        }
    };

    return {
        conversations,
        selectedConversationId,
        setSelectedConversationId,
        messages,
        loading,
        sendMessage,
    };
}