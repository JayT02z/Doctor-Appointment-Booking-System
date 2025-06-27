package dabs.DABS.service;

import dabs.DABS.model.Entity.Conversation;
import dabs.DABS.model.Entity.ConversationParticipant;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Entity.ConversationParticipantKey;
import dabs.DABS.repository.ConversationParticipantRepository;
import dabs.DABS.repository.ConversationRepository;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {
    @Autowired
    ConversationRepository conversationRepository;
    @Autowired
    ConversationParticipantRepository participantRepository;
    @Autowired
    UsersRepository userRepository;

    public Conversation getOrCreateConversation(List<Long> participantIds, List<String> roles, String type) {
        if (roles == null) {
            roles = new java.util.ArrayList<>();
        }
        // Đảm bảo admin (id=1) luôn là participant đầu tiên với role ADMIN
        if (!participantIds.contains(1L)) {
            participantIds.add(0, 1L);
            roles.add(0, "ADMIN");
        }
        // Tự động lấy role từ Users nếu roles thiếu
        while (roles.size() < participantIds.size()) {
            Long userId = participantIds.get(roles.size());
            String role = "USER";
            if (userId == 1L) {
                role = "ADMIN";
            } else {
                Users user = userRepository.findById(userId).orElse(null);
                if (user != null && user.getRoles() != null && !user.getRoles().isEmpty()) {
                    if (user.getRoles().stream().anyMatch(r -> r.name().equals("DOCTOR"))) {
                        role = "DOCTOR";
                    } else if (user.getRoles().stream().anyMatch(r -> r.name().equals("PATIENT"))) {
                        role = "PATIENT";
                    } else {
                        role = user.getRoles().iterator().next().name();
                    }
                }
            }
            roles.add(role);
        }
        // Chốt lại roles và participantIds để dùng trong lambda (phải final hoặc effectively final)
        final List<Long> finalSortedIds = new java.util.ArrayList<>(participantIds.stream().sorted().collect(Collectors.toList()));
        final List<String> finalRoles = new java.util.ArrayList<>(roles);
        String hash;
        if ("DIRECT".equalsIgnoreCase(type) && finalSortedIds.size() == 2) {
            hash = finalSortedIds.get(0) + "_" + finalSortedIds.get(1);
        } else {
            hash = finalSortedIds.stream().map(String::valueOf).collect(Collectors.joining("_"));
        }
        return conversationRepository.findByParticipantsHash(hash)
                .orElseGet(() -> {
                    Conversation conversation = new Conversation();
                    conversation.setType(type);
                    conversation.setParticipantsHash(hash);
                    conversation.setCreatedDate(LocalDateTime.now());
                    conversation.setModifiedDate(LocalDateTime.now());
                    conversation = conversationRepository.save(conversation);

                    for (int i = 0; i < finalSortedIds.size(); i++) {
                        ConversationParticipant participant = new ConversationParticipant();
                        ConversationParticipantKey key = new ConversationParticipantKey();
                        key.setConversationId(conversation.getId());
                        key.setUserId(finalSortedIds.get(i));
                        participant.setId(key);
                        participant.setConversation(conversation);
                        participant.setUser(userRepository.findById(finalSortedIds.get(i)).orElseThrow());
                        participant.setRole(finalRoles.get(i));
                        participantRepository.save(participant);
                    }
                    return conversation;
                });
    }

    public List<Conversation> getConversationsOfUser(Long userId) {
        return conversationRepository.findAllByUserId(userId);
    }
}
