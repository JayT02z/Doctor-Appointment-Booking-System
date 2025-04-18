package dabs.DABS.repository;

import dabs.DABS.model.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
}
