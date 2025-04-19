package dabs.DABS.controller;


import dabs.DABS.model.DTO.AppointmentDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentForm;
import dabs.DABS.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("api/appointment")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<AppointmentDTO>> createAppointment(@RequestBody AppointmentForm appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<AppointmentDTO>> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ResponseData<AppointmentDTO>> updateAppointmentStatus(
            @PathVariable("id") Long appointmentId,
            @RequestBody AppointmentForm appointmentForm) {
        return appointmentService.updateAppointmentStatus(appointmentId, appointmentForm.getStatus());
    }
}
