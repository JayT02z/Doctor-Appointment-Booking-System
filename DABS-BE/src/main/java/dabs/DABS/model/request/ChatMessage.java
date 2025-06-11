package dabs.DABS.model.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String senderId;
    private String receiverId;
    private String content;
    private String timestamp;

    // Getters và Setters
}
