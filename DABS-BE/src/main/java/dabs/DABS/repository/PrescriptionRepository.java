package dabs.DABS.repository;

import dabs.DABS.model.Entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    boolean existsByAppointment_Id(Long appointmentId);
    Optional<Prescription> findByAppointment_Id(Long appointmentId);
}
