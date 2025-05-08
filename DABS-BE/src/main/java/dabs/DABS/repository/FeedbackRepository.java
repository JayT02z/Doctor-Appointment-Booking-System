package dabs.DABS.repository;

import dabs.DABS.model.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    boolean existsByAppointmentId(Long appointmentId);
    Optional<Feedback> findByAppointment_Id(Long appointmentId);
}
