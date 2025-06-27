package dabs.DABS.controller;

import dabs.DABS.model.Entity.ChatMessage;
import dabs.DABS.model.Entity.Conversation;
import dabs.DABS.service.ChatMessageService;
import dabs.DABS.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import dabs.DABS.model.DTO.ChatMessageDTO;
import dabs.DABS.model.DTO.ConversationDTO;
import dabs.DABS.model.request.CreateConversationRequest;
import dabs.DABS.model.request.SendMessageRequest;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    ConversationService conversationService;
    @Autowired
    ChatMessageService chatMessageService;

    @PostMapping("/conversations")
    public ResponseEntity<Long> createConversation(@RequestBody CreateConversationRequest request) {
        Conversation conversation = conversationService.getOrCreateConversation(request.getUserIds(), request.getRoles(), request.getType());
        return ResponseEntity.ok(conversation.getId());
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDTO>> getUserConversations(@RequestParam Long userId) {
        List<Conversation> conversations = conversationService.getConversationsOfUser(userId);
        List<ConversationDTO> dtos = conversations.stream().map(conversation -> {
            ConversationDTO dto = new ConversationDTO();
            dto.setId(conversation.getId());
            dto.setType(conversation.getType());
            dto.setCreatedDate(conversation.getCreatedDate());
            dto.setModifiedDate(conversation.getModifiedDate());
            if (conversation.getParticipants() != null) {
                dto.setParticipants(conversation.getParticipants().stream().map(participant -> {
                    ConversationDTO.ParticipantDto pDto = new ConversationDTO.ParticipantDto();
                    pDto.setUserId(participant.getUser().getId());
                    pDto.setRole(participant.getRole());
                    pDto.setUserName(participant.getUser().getUsername());
                    return pDto;
                }).collect(Collectors.toList()));
            }
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/messages")
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody SendMessageRequest request) {
        ChatMessage message = chatMessageService.sendMessage(request.getConversationId(), request.getSenderId(), request.getMessage());
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversation().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setSenderName(message.getSender().getUsername());
        dto.setMessage(message.getMessage());
        dto.setCreatedDate(message.getCreatedDate());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessageDTO>> getMessages(@RequestParam Long conversationId) {
        List<ChatMessage> messages = chatMessageService.getMessages(conversationId);
        List<ChatMessageDTO> dtos = messages.stream().map(message -> {
            ChatMessageDTO dto = new ChatMessageDTO();
            dto.setId(message.getId());
            dto.setConversationId(message.getConversation().getId());
            dto.setSenderId(message.getSender().getId());
            dto.setSenderName(message.getSender().getUsername());
            dto.setMessage(message.getMessage());
            dto.setCreatedDate(message.getCreatedDate());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
