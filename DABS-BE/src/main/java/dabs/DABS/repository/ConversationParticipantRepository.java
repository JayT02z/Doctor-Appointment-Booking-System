package dabs.DABS.repository;

import dabs.DABS.model.Entity.ConversationParticipant;
import dabs.DABS.model.Entity.ConversationParticipantKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationParticipantRepository  extends JpaRepository<ConversationParticipant, ConversationParticipantKey> {
}
