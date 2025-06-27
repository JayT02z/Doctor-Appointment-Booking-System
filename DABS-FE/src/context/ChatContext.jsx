import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [activeChatWindow, setActiveChatWindow] = useState(null); // 'admin' | 'assistant' | null

    const openChat = (chatType) => {
        setActiveChatWindow(chatType);
    };

    const closeChat = () => {
        setActiveChatWindow(null);
    };

    return (
        <ChatContext.Provider value={{ activeChatWindow, openChat, closeChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
