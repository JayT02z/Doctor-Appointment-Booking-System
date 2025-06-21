import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

/**
 * Custom hook xử lý chat realtime với bác sĩ qua WebSocket (STOMP).
 * @param {string} currentUserId - ID của user hiện tại để subscribe kênh đích.
 * @param {string} receiverId - ID của bác sĩ sẽ nhận tin nhắn (có thể thay đổi tuỳ hội thoại).
 */
export default function useDoctorChat(currentUserId, receiverId) {
    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);

    // Establish WebSocket connection once when component mounts
    useEffect(() => {
        if (!currentUserId) return; // Không connect khi chưa có user

        const socket = new SockJS("/ws"); // Đường dẫn SockJS backend expose
        const stomp = Stomp.over(socket);
        stompClientRef.current = stomp;

        stomp.connect({}, () => {
            const destination = `/user/queue/messages/${currentUserId}`;
            stomp.subscribe(destination, (message) => {
                const body = JSON.parse(message.body);
                const incoming = {
                    id: body.id ?? Date.now(),
                    sender: "doctor",
                    content: body.content,
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, incoming]);
            });
        });

        return () => {
            if (stompClientRef.current) stompClientRef.current.disconnect();
        };
    }, [currentUserId]);

    const sendMessage = useCallback(
        (text) => {
            const trimmed = text.trim();
            if (!trimmed || !receiverId || !stompClientRef.current?.connected) return; // guard

            const messagePayload = {
                content: trimmed,
                receiverId,
            };
            const destination = "/app/chat";
            stompClientRef.current.send(destination, {}, JSON.stringify(messagePayload));

            const userMsg = {
                id: Date.now(),
                sender: "user",
                content: trimmed,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, userMsg]);
        },
        [receiverId]
    );

    return {
        messages,
        sendMessage,
    };
}