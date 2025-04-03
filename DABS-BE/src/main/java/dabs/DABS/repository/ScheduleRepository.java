package dabs.DABS.repository;

import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.model.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByDoctorId(Long doctorId);
    List<Schedule> findAllByDayOfWeek(DayOfWeek dayOfWeek);
}
