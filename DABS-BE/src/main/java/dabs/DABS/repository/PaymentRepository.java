package dabs.DABS.repository;

import dabs.DABS.model.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p WHERE p.appointment.patient.id = :patientId")
    List<Payment> findAllByPatientId(@Param("patientId") Long patientId);
}
