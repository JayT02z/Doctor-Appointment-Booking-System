package dabs.DABS.repository;

import dabs.DABS.model.Entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    boolean existsByAppointment_Id(Long appointmentId);
}
