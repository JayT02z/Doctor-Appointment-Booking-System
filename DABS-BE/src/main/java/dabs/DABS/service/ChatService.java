package dabs.DABS.service;

import dabs.DABS.model.request.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class ChatService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendToUser(ChatMessage message) {
        String destination = "/queue/messages/" + message.getReceiverId();
        messagingTemplate.convertAndSend(destination, message);
        System.out.println("Sending message to user: " + message.getReceiverId());
    }
}
