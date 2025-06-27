package dabs.DABS.model.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessageDTO {
    private Long id;
    private Long conversationId;
    private Long senderId;
    private String senderName;
    private String message;
    private LocalDateTime createdDate;
}

