package dabs.DABS.controller;

import dabs.DABS.model.DTO.PrescriptionDTO;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.PrecriptionEmail;
import dabs.DABS.model.request.PrescriptionRequest;
import dabs.DABS.repository.PrescriptionRepository;
import dabs.DABS.service.AppointmentService;
import dabs.DABS.service.MailSenderService;
import dabs.DABS.service.PrescriptionService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private MailSenderService mailSenderService;
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<PrescriptionDTO>> createPrescription(@Valid @RequestBody PrescriptionRequest request) {
        return prescriptionService.createRequest(request);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseData<PrescriptionDTO>> getPrescription(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id);
    }

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PrescriptionDTO>>> listAllPrescription() {
        return prescriptionService.getAllPrescriptions();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<PrescriptionDTO>> updatePrescription(@PathVariable Long id, @Valid @RequestBody PrescriptionRequest request) {
        return prescriptionService.updatePrescription(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseData<Void>> deletePrescription(@PathVariable Long id) {
        return prescriptionService.deletePrescription(id);
    }

    @PostMapping("/mail")
    public ResponseEntity<ResponseData<Void>> sendMail(@Valid @RequestBody PrecriptionEmail request) throws MessagingException {
        PrescriptionDTO dto = PrescriptionDTO.mapToDTO(prescriptionRepository.findById(request.getPrescriptionId()).get());
        return mailSenderService.sendPrescriptionEmail(dto, request.getEmail());
    }
}
