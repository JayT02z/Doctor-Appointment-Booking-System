package dabs.DABS.service;

import dabs.DABS.model.DTO.FeedbackDTO;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private PatientRepository patientRepository;


    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<ResponseData<FeedbackDTO>> createFeedback(FeedbackRequest request) {
        if (request.getRating() == null) {
            throw new RuntimeException("Rating cannot be null");
        }

        // Kiểm tra xem feedback đã tồn tại cho appointmentId này chưa
        if (feedbackRepository.existsByAppointmentId(request.getAppointmentId())) {
            throw new RuntimeException("Feedback has already been created for this appointment");
        }

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getStatus().equals(AppointmentStatus.COMPLETED)) {
            throw new RuntimeException("Feedback can only be created after the appointment is completed");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Feedback feedback = new Feedback();
        feedback.setPatient(patient);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setAppointment(appointment);

        Feedback savedFeedback = feedbackRepository.save(feedback);
        FeedbackDTO feedbackDTO = new FeedbackDTO(savedFeedback);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbackDTO
        ));
    }

    public ResponseEntity<ResponseData<FeedbackDTO>> updateFeedback(Long id, FeedbackRequest request) {
        if (request.getRating() == null) {
            throw new RuntimeException("Rating cannot be null");
        }

        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));


        feedback.setPatient(patient);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        Feedback updatedFeedback = feedbackRepository.save(feedback);
        FeedbackDTO feedbackDTO = new FeedbackDTO(updatedFeedback);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbackDTO
        ));
    }

    public ResponseEntity<ResponseData<List<FeedbackDTO>>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        List<FeedbackDTO> feedbackDTOs = feedbacks.stream()
                .map(FeedbackDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbackDTOs
        ));
    }

    public ResponseEntity<ResponseData<FeedbackDTO>> getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        FeedbackDTO feedbackDTO = new FeedbackDTO(feedback);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbackDTO
        ));
    }

    public ResponseEntity<ResponseData<FeedbackDTO>> getfeedbackByApmId(Long id) {
        Feedback feedback = feedbackRepository.findByAppointment_Id(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        FeedbackDTO feedbackDTO = new FeedbackDTO(feedback);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                feedbackDTO
        ));

    }
}
