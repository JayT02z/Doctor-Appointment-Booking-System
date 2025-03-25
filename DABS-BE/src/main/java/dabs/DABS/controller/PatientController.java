package dabs.DABS.controller;

import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterPatientForm;
import dabs.DABS.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Controller
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("")
    public ResponseEntity<ResponseData<List<Patient>>> listAllpatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<Optional<Patient>>> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Patient>> createPatient(@RequestBody RegisterPatientForm patient) {
        return patientService.addPatient(patient);
    }


}
