package dabs.DABS.repository;

import dabs.DABS.model.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findById(Long id);

    List<Payment> findByAppointment_Id(long id);

<<<<<<< HEAD
    List<Payment> findByAppointment_Patient_Id(long id);
=======
    Optional<Payment> findByTxnRef(String txnRef);
>>>>>>> 0bea4cc96e547512cf8fd28ab138dc2f98aa66bb
}
