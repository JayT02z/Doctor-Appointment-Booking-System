package dabs.DABS.controller;

import dabs.DABS.model.Entity.Feedback;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.FeedbackRequest;
import dabs.DABS.service.FeedbackService;
import dabs.DABS.model.DTO.FeedbackDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<FeedbackDTO>> createFeedback(@Valid @RequestBody FeedbackRequest request) {
        return feedbackService.createFeedback(request);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<FeedbackDTO>> updateFeedback(@PathVariable Long id, @Valid @RequestBody FeedbackRequest request) {
        return feedbackService.updateFeedback(id, request);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseData<FeedbackDTO>> getFeedback(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseData<java.util.List<FeedbackDTO>>> listAllFeedback() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/get/appointment/{id}")
    public ResponseEntity<ResponseData<FeedbackDTO>> getFeedbackByAppointment(@PathVariable Long id) {
        return feedbackService.getfeedbackByApmId(id);
    }

    @GetMapping("/rating/{doctorId}")
    public ResponseEntity<ResponseData<Double>> getFeedbackByDoctorId(@PathVariable Long doctorId) {
        return feedbackService.getAverageRating(doctorId);
    }
}
