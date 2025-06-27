package dabs.DABS.model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "chat_message")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    private String message;

    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
