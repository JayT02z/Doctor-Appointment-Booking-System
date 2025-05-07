package dabs.DABS.controller;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.model.DTO.AppointmentDTO;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentForm;
import dabs.DABS.model.request.AppointmentStatusForm;
import dabs.DABS.model.request.SearchAppointmentByDoctor;
import dabs.DABS.service.AppointmentService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@Controller
@RestController
@RequestMapping("api/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<AppointmentDTO>> createAppointment(
            @Valid @RequestBody AppointmentForm appointment) {
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

    @PutMapping("/status/{id}")
    public ResponseEntity<ResponseData<AppointmentDTO>> updateAppointmentStatus(
            @PathVariable("id") Long appointmentId,
            @Valid @RequestBody AppointmentStatusForm status) throws MessagingException {
        return appointmentService.updateAppointmentStatus(appointmentId, status.getStatus());
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAppointmentsByDoctorAndStatus(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAppointmentsByPatientAndStatus(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatientId(patientId);
    }
}
