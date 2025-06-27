package dabs.DABS.model.request;

import lombok.Data;

@Data
public class SendMessageRequest {
    private Long conversationId;
    private Long senderId;
    private String message;
}

