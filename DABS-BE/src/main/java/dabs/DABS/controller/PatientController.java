package dabs.DABS.controller;

import dabs.DABS.model.DTO.PatientDTO;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterPatientForm;
import dabs.DABS.model.request.UpdatePatientrForm;
import dabs.DABS.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PatientDTO>>> listAllpatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<PatientDTO>> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseData<PatientDTO>> createPatient(@Valid @RequestBody RegisterPatientForm patient) {
        return patientService.addPatient(patient);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<Patient>> updatePatient(@PathVariable Long id, @Valid @RequestBody UpdatePatientrForm patient) {
        return patientService.updatePatient(id, patient);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<ResponseData<Patient>> deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }
}
