package dabs.DABS.controller;

import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.model.Response.ResponseData;
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
}
