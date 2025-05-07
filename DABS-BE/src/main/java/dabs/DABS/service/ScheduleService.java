package dabs.DABS.service;

import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.Enum.TimeSlot;
import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Schedule;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.CreateScheduleRequest;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;


//    //Lich lam viec
//    public Schedule addSchedule(Long doctorId, LocalDate appointmentDate, TimeSlot timeSlot) {
//        LocalDateTime appointmentTime = convertTimeSlotToDateTime(appointmentDate, timeSlot);
//
//        if (appointmentTime.isBefore(LocalDateTime.now())) {
//            throw new RuntimeException("Ngay da qua");
//        }
//
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new RuntimeException("Can't Searching doctor with id: " + doctorId));
//
//        Schedule schedule = new Schedule();
//        schedule.setDoctor(doctor);
//        schedule.setDate(appointmentDate);
//        schedule.setTimeSlot(timeSlot);
//        schedule.setAvailable(true);
//
//        return scheduleRepository.save(schedule);
//    }

    public ResponseEntity<ResponseData<Doctor>> addSchedule(CreateScheduleRequest request) {

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));


        List<Schedule> schedules = request.getSchedules().stream()
                .map(scheduleRequest -> {
                    Schedule schedule = new Schedule();
                    schedule.setDayOfWeek(scheduleRequest.getDayOfWeek());
                    schedule.setDate(scheduleRequest.getDate());
                    schedule.setTimeSlot(scheduleRequest.getTimeSlot());
                    schedule.setAvailable(scheduleRequest.isAvailable());
                    schedule.setDoctor(doctor);
                    return schedule;
                })
                .collect(Collectors.toList());


        scheduleRepository.saveAll(schedules);


//        doctor.setAvailability(schedules);
        doctorRepository.save(doctor);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                null
        ));
    }

    public ResponseEntity<ResponseData<List<Schedule>>> getSchedulesDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
        List<Schedule> schedules = doctor.getAvailability();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                schedules
        ));
    }

    public ResponseEntity<ResponseData<List<Map<String, Object>>>> getSchedulesDay(DayOfWeek day) {
        List<Schedule> schedules = scheduleRepository.findAllByDayOfWeek(day);

        List<Map<String, Object>> scheduleList = schedules.stream().map(schedule -> {
            Map<String, Object> result = new HashMap<>();
            result.put("scheduleId", schedule.getId());
            result.put("date", schedule.getDate());
            result.put("timeSlots", schedule.getTimeSlot());
            result.put("available", schedule.isAvailable());

            // Thêm thông tin bác sĩ
            Doctor doctor = schedule.getDoctor();
            if (doctor != null) {
                Map<String, Object> doctorInfo = new HashMap<>();
                doctorInfo.put("doctorId", doctor.getId());
                doctorInfo.put("name", doctor.getFullName());
                result.put("doctor", doctorInfo);
            }

            return result;
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseData<>(StatusApplication.SUCCESS.getCode(),
                        StatusApplication.SUCCESS.getMessage(),
                        scheduleList));
    }

    public ResponseEntity<ResponseData<DoctorDTO>> updateSchedule(CreateScheduleRequest request) {
        // Tìm bác sĩ theo doctorId
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Cập nhật danh sách lịch làm việc mới từ request
        List<Schedule> schedules = request.getSchedules().stream()
                .map(scheduleRequest -> {
                    Schedule schedule = new Schedule();
                    schedule.setDayOfWeek(scheduleRequest.getDayOfWeek());
                    schedule.setDate(scheduleRequest.getDate());
                    schedule.setTimeSlot(scheduleRequest.getTimeSlot());
                    schedule.setAvailable(scheduleRequest.isAvailable());
                    schedule.setDoctor(doctor);
                    return schedule;
                })
                .collect(Collectors.toList());

        // Lưu tất cả lịch làm việc mới vào cơ sở dữ liệu
        doctor.setAvailability(schedules);


        // Trả về phản hồi thành công
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                "Cập nhật lịch cho bác sĩ thành công",
                null
        ));
    }





//    //Get list doctor schedule
//    public List<Schedule> getScheduleByDoctor(Long doctorId) {
//        return (List<Schedule>) scheduleRepository.findByDoctorId(doctorId);
//    }
//
//    //Update schedule if <2h to start, disable module
//    public Schedule updateSchedule(Long scheduleId, LocalDate appointmentDate, TimeSlot newTimeSlot, boolean available) {
//        Schedule schedule = scheduleRepository.findById(scheduleId)
//                .orElseThrow(() -> new RuntimeException("Can't Searching doctor with id " + scheduleId));
//
//        LocalDateTime newAppointmentDateTime = convertTimeSlotToDateTime(appointmentDate, newTimeSlot);
//        if (newAppointmentDateTime.minusHours(2).isBefore(LocalDateTime.now())) {
////            throw new RuntimeException("Sat lich lam viec, khong cho doi");
//        }
//
//        schedule.setDate(appointmentDate);
//        schedule.setTimeSlot(newTimeSlot);
//        schedule.setAvailable(available);
//
//        return scheduleRepository.save(schedule);
//    }
//
//    //Convert TimeSlot to LocalDateTIme
//    private LocalDateTime convertTimeSlotToDateTime(LocalDate date, TimeSlot timeSlot) {
//        String timeRange = timeSlot.getTimeRange();
//        String startTimeStr = timeRange.split(" - ")[0];
//        LocalTime startTime = LocalTime.parse(startTimeStr);
//        return LocalDateTime.of(date, startTime);
//    }

}
