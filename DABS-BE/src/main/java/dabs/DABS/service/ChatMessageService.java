package dabs.DABS.service;

import dabs.DABS.model.Entity.ChatMessage;
import dabs.DABS.model.Entity.Conversation;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.repository.ChatMessageRepository;
import dabs.DABS.repository.ConversationRepository;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {
    @Autowired
    ChatMessageRepository chatMessageRepository;
    @Autowired
    ConversationRepository conversationRepository;
    @Autowired
    UsersRepository userRepository;

    public ChatMessage sendMessage(Long conversationId, Long senderId, String message) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        // Kiểm tra senderId có phải participant của conversation không
        boolean isParticipant = conversation.getParticipants() != null &&
            conversation.getParticipants().stream().anyMatch(p -> p.getUser().getId().equals(senderId));
        if (!isParticipant) {
            throw new RuntimeException("User is not a participant of this conversation");
        }
        Users sender = userRepository.findById(senderId).orElseThrow();
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setConversation(conversation);
        chatMessage.setSender(sender);
        chatMessage.setMessage(message);
        chatMessage.setCreatedDate(LocalDateTime.now());
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessages(Long conversationId) {
        return chatMessageRepository.findAllByConversationIdOrderByCreatedDateAsc(conversationId);
    }
}
