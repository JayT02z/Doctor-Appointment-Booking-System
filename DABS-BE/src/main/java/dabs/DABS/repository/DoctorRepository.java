package dabs.DABS.repository;

import dabs.DABS.model.Entity.Doctor;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findById(Long Id);
    @Query("SELECT d FROM Doctor d WHERE d.user.id = :userId")
    Optional<Doctor> findDoctorByUserId(@Param("userId") Long userId);
}
