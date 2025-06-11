package dabs.DABS.controller;

import dabs.DABS.model.Response.ChatMessageResponse;
import dabs.DABS.model.request.ChatMessage;
import dabs.DABS.model.request.ChatMessageRequest;
import dabs.DABS.service.ChatService;
import dabs.DABS.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {
    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/message")
    public ResponseEntity<ChatMessageResponse> handleChatMessage(@RequestBody ChatMessageRequest request) {
        ChatMessageResponse response = chatbotService.handleMessage(request);
        return ResponseEntity.ok(response);
    }



}
