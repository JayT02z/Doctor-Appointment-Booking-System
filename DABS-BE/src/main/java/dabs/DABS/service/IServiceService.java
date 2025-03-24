package dabs.DABS.service;

import dabs.DABS.model.Request.ServiceRequest;
import dabs.DABS.model.Response.ServiceResponse;

import java.util.List;

public interface IServiceService {
    List<ServiceResponse> getAllServices();
    ServiceResponse getServiceById(Long id);
    ServiceResponse createService(ServiceRequest serviceRequest);
    ServiceResponse updateService(Long id, ServiceRequest serviceRequest);
    void deleteService(Long id);
}
