package dabs.DABS.repository;

import dabs.DABS.model.Entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, String> {
}
