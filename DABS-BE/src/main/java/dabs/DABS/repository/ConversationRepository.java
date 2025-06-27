package dabs.DABS.repository;

import dabs.DABS.model.Entity.Conversation;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByParticipantsHash(String hash);
    @Query("select c from Conversation c join c.participants p where p.user.id = :userId")
    List<Conversation> findAllByUserId(@Param("userId") Long userId);
}
