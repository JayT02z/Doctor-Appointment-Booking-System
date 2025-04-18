package dabs.DABS.service;

import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.FeedbackRepository;
import dabs.DABS.model.request.FeedbackRequest;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import dabs.DABS.Enum.AppointmentStatus;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<ResponseData<Feedback>> createFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getStatus().equals(AppointmentStatus.COMPLETED)) {
            throw new RuntimeException("Feedback can only be created after the appointment is completed");
        }

        feedback.setPatient(patient);
        feedback.setDoctor(doctor);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        Feedback savedFeedback = feedbackRepository.save(feedback);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                savedFeedback
        ));
    }

    public ResponseEntity<ResponseData<Feedback>> updateFeedback(String id, FeedbackRequest request) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        feedback.setPatient(patient);
        feedback.setDoctor(doctor);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        Feedback updatedFeedback = feedbackRepository.save(feedback);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                updatedFeedback
        ));
    }

    public ResponseEntity<ResponseData<java.util.List<Feedback>>> getAllFeedbacks() {
        java.util.List<Feedback> feedbacks = feedbackRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbacks
        ));
    }

    public ResponseEntity<ResponseData<Feedback>> getFeedbackById(String id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedback
        ));
    }
}
