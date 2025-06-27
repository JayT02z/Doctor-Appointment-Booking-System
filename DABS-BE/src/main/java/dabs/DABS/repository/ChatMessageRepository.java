package dabs.DABS.repository;

import dabs.DABS.model.Entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository  extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findAllByConversationIdOrderByCreatedDateAsc(Long conversationId);
}
