package dabs.DABS.model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "conversation_participant")
public class ConversationParticipant {
    @EmbeddedId
    private ConversationParticipantKey id;

    @ManyToOne
    @MapsId("conversationId")
    private Conversation conversation;

    @ManyToOne
    @MapsId("userId")
    private Users user;

    private String role;
}
