package dabs.DABS.controller;

import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterDoctorForm;
import dabs.DABS.model.request.UpdateDoctorForm;
import dabs.DABS.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/all")
    public ResponseEntity<ResponseData<List<DoctorDTO>>> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<ResponseData<DoctorDTO>> getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<DoctorDTO>> updateDoctor(@PathVariable Long id, @Valid @RequestBody UpdateDoctorForm updatedDoctor) {
        return doctorService.updateDoctor(id, updatedDoctor);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Doctor>> createDoctor(@Valid @RequestBody RegisterDoctorForm doctor) {
        return doctorService.addDoctor(doctor);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ResponseData<DoctorDTO>> getDoctorByUserId(@PathVariable Long id) {
        return doctorService.getDoctorByUserId(id);
    }

    @GetMapping("/service/{id}")
    public ResponseEntity<ResponseData<List<DoctorDTO>>> getDoctorByServiceId(@PathVariable Long id) {
        return doctorService.getDoctorByServiceId(id);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseData<List<DoctorDTO>>> searchDoctor(@RequestParam("keyword") String keyword) {
        return doctorService.SearchDoctorbyFullname(keyword);
    }
}
