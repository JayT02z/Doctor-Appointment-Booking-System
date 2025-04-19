package dabs.DABS.controller;


import dabs.DABS.model.Entity.Feedback;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.FeedbackRequest;
import dabs.DABS.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Feedback>> createFeedback(@RequestBody FeedbackRequest request) {
        return feedbackService.createFeedback(request);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<Feedback>> updateFeedback(@PathVariable String id, @RequestBody FeedbackRequest request) {
        return feedbackService.updateFeedback(id, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<Feedback>> getFeedback(@PathVariable String id) {
        return feedbackService.getFeedbackById(id);
    }
    @GetMapping("/all")
    public ResponseEntity<ResponseData<java.util.List<Feedback>>> listAllFeedback() {
        return feedbackService.getAllFeedbacks();
    }

}
