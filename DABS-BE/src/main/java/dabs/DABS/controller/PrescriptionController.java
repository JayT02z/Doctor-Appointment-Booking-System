package dabs.DABS.controller;

import dabs.DABS.model.DTO.PrescriptionDTO;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.PrescriptionRequest;
import dabs.DABS.service.PrescriptionService;
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

    @PostMapping("/create")
    public ResponseEntity<ResponseData<PrescriptionDTO>> createPrescription(@Valid @RequestBody PrescriptionRequest request) {
        return prescriptionService.createRequest(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<PrescriptionDTO>> getPrescription(@PathVariable String id) {
        return prescriptionService.getPrescriptionById(id);
    }

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PrescriptionDTO>>> listAllPrescription() {
        return prescriptionService.getAllPrescriptions();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<PrescriptionDTO>> updatePrescription(@PathVariable String id, @Valid @RequestBody PrescriptionRequest request) {
        return prescriptionService.updatePrescription(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseData<Void>> deletePrescription(@PathVariable String id) {
        return prescriptionService.deletePrescription(id);
    }
}
