package dabs.DABS.controller;


import dabs.DABS.Enum.TimeSlot;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Schedule;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.CreateScheduleRequest;
import dabs.DABS.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.time.LocalDate;
import java.util.List;

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
    public ResponseEntity<ResponseData<Doctor>> createSchedule(@RequestBody CreateScheduleRequest createScheduleRequest) {
        return scheduleService.addSchedule(createScheduleRequest);
    }
}
