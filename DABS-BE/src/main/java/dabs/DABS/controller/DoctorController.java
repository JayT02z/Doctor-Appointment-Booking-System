package dabs.DABS.controller;


import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<Doctor>> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bác sĩ với id: " + id));
        ResponseData<Doctor> response = ResponseData.<Doctor>builder()
                .StatusCode(200)
                .Message("Lấy thông tin bác sĩ thành công")
                .data(doctor)
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<Doctor>> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        Doctor doctor = doctorService.updateDoctor(id, updatedDoctor);
        ResponseData<Doctor> response = ResponseData.<Doctor>builder()
                .StatusCode(200)
                .Message("Update fail")
                .data(doctor)
                .build();
        return ResponseEntity.ok(response);
    }

}

