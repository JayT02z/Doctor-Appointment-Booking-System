package dabs.DABS.service;

import dabs.DABS.dto.ServiceRequest;
import dabs.DABS.dto.ServiceResponse;
import dabs.DABS.exception.ResourceNotFoundException;
import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService implements IServiceService {

    private final ServiceRepository serviceRepository;

    @Override
    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceResponse getServiceById(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        return mapToResponse(service);
    }

    @Override
    public ServiceResponse createService(ServiceRequest serviceRequest) {
        ServiceEntity service = new ServiceEntity();
        service.setName(serviceRequest.getName());
        service.setDescription(serviceRequest.getDescription());
        service.setPrice(serviceRequest.getPrice());
        service.setIsActive(serviceRequest.getIsActive());

        ServiceEntity savedService = serviceRepository.save(service);
        return mapToResponse(savedService);
    }

    @Override
    public ServiceResponse updateService(Long id, ServiceRequest serviceRequest) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        service.setName(serviceRequest.getName());
        service.setDescription(serviceRequest.getDescription());
        service.setPrice(serviceRequest.getPrice());
        service.setIsActive(serviceRequest.getIsActive());

        ServiceEntity updatedService = serviceRepository.save(service);
        return mapToResponse(updatedService);
    }

    @Override
    public void deleteService(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        serviceRepository.delete(service);
    }

    private ServiceResponse mapToResponse(ServiceEntity service) {
        return new ServiceResponse(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getPrice(),
                service.getIsActive()
        );
    }
}
