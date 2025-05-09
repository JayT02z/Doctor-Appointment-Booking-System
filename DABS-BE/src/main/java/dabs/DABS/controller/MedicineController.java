//package dabs.DABS.controller;
//
//import dabs.DABS.model.Entity.Medicine;
//import dabs.DABS.model.Response.ResponseData;
//import dabs.DABS.model.request.MedicineRequest;
//import dabs.DABS.service.MedicineService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@Controller
//@RequestMapping("/api/medicine")
//public class MedicineController {
//    @Autowired
//    private MedicineService medicineService;
//
//    @PostMapping("/create")
//    public ResponseEntity<ResponseData<Medicine>> createMedicine(@Valid @RequestBody MedicineRequest request) {
//        return medicineService.createRequest(request);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ResponseData<Medicine>> getMedicineById(@PathVariable Long id) {
//        return medicineService.getMedicineById(id);
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<ResponseData<List<Medicine>>> listAllMedicines() {
//        return medicineService.getAllMedicines();
//    }
//
//    @PutMapping("/update/{id}")
//    public ResponseEntity<ResponseData<Medicine>> updateMedicine(@PathVariable Long id, @Valid @RequestBody MedicineRequest request) {
//        return medicineService.updateMedicine(id, request);
//    }
//
//    @GetMapping("/delete/{id}")
//    public ResponseEntity<ResponseData<Void>> deleteMedicine(@PathVariable Long id) {
//        return medicineService.deleteMedicine(id);
//    }
//}
