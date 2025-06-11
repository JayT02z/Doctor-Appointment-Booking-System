package dabs.DABS.controller;

import dabs.DABS.model.request.ChatMessage;
import dabs.DABS.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage message) {
        chatService.sendToUser(message);
    }
}
