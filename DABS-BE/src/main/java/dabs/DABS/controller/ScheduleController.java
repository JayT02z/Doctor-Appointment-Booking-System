package dabs.DABS.controller;


import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.TimeSlot;
import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Schedule;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.CreateScheduleRequest;
import dabs.DABS.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

//    @PostMapping("/add")
//    public ResponseEntity<Schedule> addSchedule(
//            @RequestParam Long doctorId,
//            @RequestParam LocalDate appointmentDate,
//            @RequestParam TimeSlot timeSlot) {
//        Schedule schedule = scheduleService.addSchedule(doctorId, appointmentDate, timeSlot);
//        return ResponseEntity.ok(schedule);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<List<Schedule>> getSchedulesByDoctor(@PathVariable Long doctorId) {
//        List<Schedule> schedules = scheduleService.getScheduleByDoctor(doctorId);
//        return ResponseEntity.ok(schedules);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Schedule> updateSchedule(
//            @PathVariable Long scheduleId,
//            @RequestParam LocalDate appointmentDate,
//            @RequestParam TimeSlot timeSlot,
//            @RequestParam boolean available) {
//        Schedule updatedSchedule = scheduleService.updateSchedule(scheduleId, appointmentDate, timeSlot, available);
//        return ResponseEntity.ok(updatedSchedule);
//    }

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Doctor>> createSchedule(@RequestBody @Valid CreateScheduleRequest createScheduleRequest) {
        return scheduleService.addSchedule(createScheduleRequest);
    }

    @GetMapping("/doctorschedules/{id}")
    public ResponseEntity<ResponseData<List<Schedule>>> getDoctorSchedule(@PathVariable Long id) {
        return scheduleService.getSchedulesDoctor(id);
    }

    @GetMapping("/dayschedules/{day}")
    public ResponseEntity<ResponseData<List<Map<String, Object>>>> getDaySchedule(@PathVariable DayOfWeek day) {
        return scheduleService.getSchedulesDay(day);
    }

    @PostMapping("/doctor/updateschedule")
    public  ResponseEntity<ResponseData<DoctorDTO>> updateDoctorSchedule(@RequestBody @Valid CreateScheduleRequest createScheduleRequest) {
        return scheduleService.updateSchedule(createScheduleRequest);
    }
}

