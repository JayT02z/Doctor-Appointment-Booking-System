package dabs.DABS.service;

import dabs.DABS.Enum.TimeSlot;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Schedule;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;


    //Lich lam viec
    public Schedule addSchedule(Long doctorId, LocalDate appointmentDate, TimeSlot timeSlot) {
        LocalDateTime appointmentTime = convertTimeSlotToDateTime(appointmentDate, timeSlot);

        if (appointmentTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Ngay da qua");
        }

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Can't Searching doctor with id: " + doctorId));

        Schedule schedule = new Schedule();
        schedule.setDoctor(doctor);
        schedule.setDate(appointmentDate);
        schedule.setTimeSlot(timeSlot);
        schedule.setAvailable(true);

        return scheduleRepository.save(schedule);
    }

    //Get list doctor schedule
    public List<Schedule> getScheduleByDoctor(Long doctorId) {
        return (List<Schedule>) scheduleRepository.findByDoctorId(doctorId);
    }

    //Update schedule if <2h to start, disable module
    public Schedule updateSchedule(Long scheduleId, LocalDate appointmentDate, TimeSlot newTimeSlot, boolean available) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Can't Searching doctor with id " + scheduleId));

        LocalDateTime newAppointmentDateTime = convertTimeSlotToDateTime(appointmentDate, newTimeSlot);
        if (newAppointmentDateTime.minusHours(2).isBefore(LocalDateTime.now())) {
//            throw new RuntimeException("Sat lich lam viec, khong cho doi");
        }

        schedule.setDate(appointmentDate);
        schedule.setTimeSlot(newTimeSlot);
        schedule.setAvailable(available);

        return scheduleRepository.save(schedule);
    }

    //Convert TimeSlot to LocalDateTIme
    private LocalDateTime convertTimeSlotToDateTime(LocalDate date, TimeSlot timeSlot) {
        String timeRange = timeSlot.getTimeRange();
        String startTimeStr = timeRange.split(" - ")[0];
        LocalTime startTime = LocalTime.parse(startTimeStr);
        return LocalDateTime.of(date, startTime);
    }

}
