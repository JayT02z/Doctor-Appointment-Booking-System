import { useCallback, useState } from "react";
import axios from "axios";

/**
 * Custom hook xử lý chat với Chatbot qua REST API.
 * Trả về { messages, sendMessage, isLoading }.
 */
export default function useBotChat() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (text) => {
        const trimmed = text.trim();
        if (!trimmed) return; // early return nếu rỗng

        const userMsg = {
            id: Date.now(),
            sender: "user",
            content: trimmed,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);

        try {
            setIsLoading(true);
            console.log("Sending message to chatbot:", {message: trimmed});
            const { data } = await axios.post("http://localhost:8080/api/chatbot/message", { message: trimmed });
            console.log("Nhận được:", data);
            const botMsg = {
                id: Date.now() + 1,
                sender: "bot",
                content: data.message,
                timestamp: Date.now(),
                recommendations: data.recommendations ?? [],
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error("Chatbot API error", err);
            const errorMsg = {
                id: Date.now() + 2,
                sender: "bot",
                content: "Xin lỗi, đã có lỗi xảy ra. Bạn vui lòng thử lại sau.",
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        messages,
        sendMessage,
        isLoading,
    };
}