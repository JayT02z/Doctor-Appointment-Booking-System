package dabs.DABS.service;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.AppointmentDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentForm;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.repository.ServiceRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private MailSenderService mailSenderService;

    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointmentDTOs
        ));
    }

    public ResponseEntity<ResponseData<AppointmentDTO>> getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        AppointmentDTO appointmentDTO = new AppointmentDTO(appointment);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointmentDTO
        ));
    }

    public ResponseEntity<ResponseData<AppointmentDTO>> addAppointment(AppointmentForm appointment) {
        Doctor doctor = doctorRepository.findById(appointment.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with userId: " + appointment.getDoctorId()));

        Patient patient = patientRepository.findById(appointment.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with userId: " + appointment.getPatientId()));

        ServiceEntity service = serviceRepository.findById(appointment.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + appointment.getServiceId()));

        Appointment appointments = new Appointment();
        appointments.setDoctor(doctor);
        appointments.setPatient(patient);
        appointments.setService(service);
        appointments.setTimeSlot(appointment.getTimeSlot());
        appointments.setStatus(AppointmentStatus.PENDING);
        appointments.setNotes(appointment.getNotes());
        appointments.setDate(appointment.getDate());
        appointmentRepository.save(appointments);

        AppointmentDTO appointmentDTO = new AppointmentDTO(appointments);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointmentDTO
        ));
    }

    public ResponseEntity<ResponseData<AppointmentDTO>> updateAppointmentStatus(Long appointmentId, AppointmentStatus newStatus) throws MessagingException {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + appointmentId));

        appointment.setStatus(newStatus);
        appointmentRepository.save(appointment);
        //tự động gửi email
        String email = appointment.getPatient().getUser().getEmail();
        if (AppointmentStatus.CONFIRMED.equals(appointment.getStatus())) {
            mailSenderService.sendAppointmentConfirmationEmail(email, appointment);
        } else if (AppointmentStatus.CANCELLED.equals(appointment.getStatus())) {
            mailSenderService.sendAppointmentCancellationEmail(email, appointment);
        }

        AppointmentDTO updatedAppointmentDTO = new AppointmentDTO(appointment);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                updatedAppointmentDTO
        ));
    }

    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAppointmentsByDoctorId(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findAllByDoctorId(doctorId);
        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointmentDTOs
        ));

    }

    public ResponseEntity<ResponseData<List<AppointmentDTO>>> getAppointmentsByPatientId(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findAllByPatientId(doctorId);
        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(AppointmentDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                appointmentDTOs
        ));

    }
}
