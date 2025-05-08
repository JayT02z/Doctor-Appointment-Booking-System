package dabs.DABS.controller;

import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.DTO.ServiceDTO;
import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.CreateServiceForm;
import dabs.DABS.model.request.ServiceRequest;
import dabs.DABS.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<ServiceEntity>> createRequest(@Valid @RequestBody ServiceRequest request) {
        return serviceService.createRequest(request);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseData<ServiceEntity>> updateService(@PathVariable Long id, @Valid @RequestBody ServiceRequest request) {
        return serviceService.updateService(id, request);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseData<List<ServiceEntity>>> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<ServiceEntity>> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }

    @PutMapping("/inactive/{id}")
    public ResponseEntity<ResponseData<Void>> inactiveService(@PathVariable Long id) {
        return serviceService.deleteService(id);
    }

    @PostMapping("/doctor/addservice")
    public ResponseEntity<ResponseData<DoctorDTO>> addServicetoDoctor(@Valid @RequestBody CreateServiceForm request) {
        return  serviceService.addServicesToDoctor(request);
    }

    @PostMapping("/doctor/updateservice")
    public ResponseEntity<ResponseData<DoctorDTO>> updateServicetoDoctor(@Valid @RequestBody CreateServiceForm request) {
        return  serviceService.updateDoctorServices(request);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseData<List<ServiceDTO>>> searchService(@RequestParam String keyword) {
        return serviceService.searchServices(keyword);
    }
}
