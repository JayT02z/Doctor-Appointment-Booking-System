package dabs.DABS.controller;

import dabs.DABS.model.Entity.Prescription;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.PrescriptionRequest;
import dabs.DABS.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/api/prescription")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Prescription>> createPrescription(@RequestBody PrescriptionRequest request) {
        return prescriptionService.createRequest(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<Prescription>> getPrescription(@PathVariable String id) {
        return prescriptionService.getPrescriptionById(id);
    }
    @GetMapping("")
    public ResponseEntity<ResponseData<List<Prescription>>> listAllPrescription() {
    return prescriptionService.getAllPrescriptions();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<Prescription>> updatePrescription(@PathVariable String id, @RequestBody PrescriptionRequest request) {
        return prescriptionService.updatePrescription(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseData<Void>> deletePrescription(@PathVariable String id) {
        return prescriptionService.deletePrescription(id);
    }
}
