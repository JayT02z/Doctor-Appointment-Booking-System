package dabs.DABS.model.Entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@Embeddable
public class ConversationParticipantKey implements Serializable {
    private Long conversationId;
    private Long userId;

    public ConversationParticipantKey() {}
    public ConversationParticipantKey(Long conversationId, Long userId) {
        this.conversationId = conversationId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConversationParticipantKey that = (ConversationParticipantKey) o;
        return Objects.equals(conversationId, that.conversationId) && Objects.equals(userId, that.userId);
    }
    @Override
    public int hashCode() {
        return Objects.hash(conversationId, userId);
    }
}

