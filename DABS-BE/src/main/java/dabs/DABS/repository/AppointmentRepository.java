package dabs.DABS.repository;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByDoctorIdAndStatus(Long doctorId, AppointmentStatus status);
}
