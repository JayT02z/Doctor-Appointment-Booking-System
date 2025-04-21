package dabs.DABS.service;
import dabs.DABS.repository.ServiceRepository;
import dabs.DABS.model.request.ServiceRequest;
import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.Entity.Slug;
import dabs.DABS.repository.SlugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SlugRepository slugRepository;

    public ResponseEntity<ResponseData<ServiceEntity>> createRequest(ServiceRequest request) {
        ServiceEntity service = new ServiceEntity();

        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());

        List<String> slugIds = request.getSlugIds();
        Set<Slug> slugEntities = slugIds.stream()
            .map(id -> slugRepository.findById(id).orElseThrow(() -> new RuntimeException("Slug not found: " + id)))
            .collect(Collectors.toSet());
        service.setSlugs(slugEntities);

        ServiceEntity savedService = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            savedService
        ));
    }

    public ResponseEntity<ResponseData<List<ServiceEntity>>> getAllServices() {
        List<ServiceEntity> services = serviceRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            services
        ));
    }

    public ResponseEntity<ResponseData<ServiceEntity>> getServiceById(String id) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            service
        ));
    }

    public ResponseEntity<ResponseData<ServiceEntity>> updateService(String id, ServiceRequest request) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );

        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());
        service.setIsActive(request.getIsActive());

        List<String> slugIds = request.getSlugIds();
        Set<Slug> slugEntities = slugIds.stream()
            .map(slugId -> slugRepository.findById(slugId).orElseThrow(() -> new RuntimeException("Slug not found: " + slugId)))
            .collect(Collectors.toSet());
        service.setSlugs(slugEntities);

        ServiceEntity updatedService = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            updatedService
        ));
    }

    public ResponseEntity<ResponseData<Void>> deleteService(String id) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );

        serviceRepository.delete(service);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            null
        ));
    }
}
