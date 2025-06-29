package dabs.DABS.controller;

import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.Entity.ChatMessage;
import dabs.DABS.model.Entity.Conversation;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.service.ChatMessageService;
import dabs.DABS.service.ConversationService;
import dabs.DABS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    PatientRepository patientRepository;

    @PostMapping("/conversations")
    public ResponseEntity<ResponseData<Long>> createConversation(@RequestBody CreateConversationRequest request) {
        Conversation conversation = conversationService.getOrCreateConversation(request.getUserIds(), request.getRoles(), request.getType());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                conversation.getId()
        ));
    }

    @GetMapping("/conversations1")
    public ResponseEntity<ResponseData<List<ConversationDTO>>> getUserConversations(@RequestParam Long userId) {
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
                    if (!participant.getUser().getId().equals(userId)) {
                        if ("PATIENT".equalsIgnoreCase(participant.getRole())) {
                            var patientOpt = patientRepository.findByUserId(participant.getUser().getId());
                            pDto.setUserName(patientOpt.map(p -> p.getFullName()).orElse(participant.getUser().getUsername()));
                        } else if ("DOCTOR".equalsIgnoreCase(participant.getRole())) {
                            var doctorOpt = participant.getUser().getDoctor();
                            if (doctorOpt != null && doctorOpt.getFullName() != null) {
                                pDto.setUserName(doctorOpt.getFullName());
                            } else {
                                pDto.setUserName(participant.getUser().getUsername());
                            }
                        } else {
                            pDto.setUserName(participant.getUser().getUsername());
                        }
                    } else {
                        pDto.setUserName(participant.getUser().getUsername());
                    }
                    return pDto;
                }).collect(Collectors.toList()));
            }
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                dtos
        ));
    }

    @PostMapping("/messages")
    public ResponseEntity<ResponseData<ChatMessageDTO>> sendMessage(@RequestBody SendMessageRequest request) {
        ChatMessage message = chatMessageService.sendMessage(request.getConversationId(), request.getSenderId(), request.getMessage());
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversation().getId());
        dto.setSenderId(message.getSender().getId());
        var patientOpt = patientRepository.findByUserId(message.getSender().getId());
        if (patientOpt.isPresent()) {
            dto.setSenderName(patientOpt.get().getFullName());
        } else {
            dto.setSenderName(message.getSender().getUsername());
        }
        dto.setMessage(message.getMessage());
        dto.setCreatedDate(message.getCreatedDate());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                dto
        ));
    }

    @GetMapping("/messages1")
    public ResponseEntity<ResponseData<List<ChatMessageDTO>>> getMessages(@RequestParam Long conversationId) {
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
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                dtos
        ));
    }
}
