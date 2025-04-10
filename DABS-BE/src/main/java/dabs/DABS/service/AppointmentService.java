package dabs.DABS.service;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentForm;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;

    public ResponseEntity<ResponseData<List<Appointment>>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointments
        ));
    }

    public ResponseEntity<ResponseData<Appointment>> getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointment
        ));
    }

    public ResponseEntity<ResponseData<Appointment>> addAppointment(AppointmentForm appointment) {
        Doctor doctor = doctorRepository.findById(appointment.getDoctorId()).orElse(null);
        Patient patient = patientRepository.findById(appointment.getPatientId()).orElse(null);
        Appointment appointments = new Appointment();
        appointments.setDoctor(doctor);
        appointments.setPatient(patient);
        appointments.setTimeSlot(appointment.getTimeSlot());
        appointments.setStatus(AppointmentStatus.PENDING);
        appointments.setNotes(appointment.getNotes());
        appointments.setDate(appointment.getDate());
        appointmentRepository.save(appointments);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointments
        ));
    }
}
