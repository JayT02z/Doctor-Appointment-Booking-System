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
        List<Long> sortedIds = participantIds.stream().sorted().collect(Collectors.toList());
        String hash;
        if ("DIRECT".equalsIgnoreCase(type) && sortedIds.size() == 2) {
            hash = sortedIds.get(0) + "_" + sortedIds.get(1);
        } else {
            hash = sortedIds.stream().map(String::valueOf).collect(Collectors.joining("_"));
        }
        return conversationRepository.findByParticipantsHash(hash)
                .orElseGet(() -> {
                    Conversation conversation = new Conversation();
                    conversation.setType(type);
                    conversation.setParticipantsHash(hash);
                    conversation.setCreatedDate(LocalDateTime.now());
                    conversation.setModifiedDate(LocalDateTime.now());
                    conversation = conversationRepository.save(conversation);

                    for (int i = 0; i < sortedIds.size(); i++) {
                        ConversationParticipant participant = new ConversationParticipant();
                        ConversationParticipantKey key = new ConversationParticipantKey();
                        key.setConversationId(conversation.getId());
                        key.setUserId(sortedIds.get(i));
                        participant.setId(key);
                        participant.setConversation(conversation);
                        participant.setUser(userRepository.findById(sortedIds.get(i)).orElseThrow());
                        participant.setRole(roles.get(i));
                        participantRepository.save(participant);
                    }
                    return conversation;
                });
    }

    public List<Conversation> getConversationsOfUser(Long userId) {
        return conversationRepository.findAllByUserId(userId);
    }
}
