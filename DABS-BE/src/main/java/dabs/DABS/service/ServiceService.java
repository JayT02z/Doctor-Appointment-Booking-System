package dabs.DABS.service;
import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.request.CreateServiceForm;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.ServiceRepository;
import dabs.DABS.model.request.ServiceRequest;
import dabs.DABS.model.Entity.ServiceEntity;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.Enum.StatusApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public ResponseEntity<ResponseData<ServiceEntity>> createRequest(ServiceRequest request) {
        ServiceEntity service = new ServiceEntity();

        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());

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

    public ResponseEntity<ResponseData<ServiceEntity>> getServiceById(Long id) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            service
        ));
    }

    public ResponseEntity<ResponseData<ServiceEntity>> updateService(Long id, ServiceRequest request) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );

        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());
        service.setIsActive(request.getIsActive());

        ServiceEntity updatedService = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            updatedService
        ));
    }

    public ResponseEntity<ResponseData<Void>> deleteService(Long id) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Service not found")
        );
        service.setIsActive(false);
        serviceRepository.save(service);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            null
        ));
    }

    public ResponseEntity<ResponseData<DoctorDTO>> addServicesToDoctor(CreateServiceForm request) {
        // Tìm doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Lấy danh sách service từ serviceIds
        List<ServiceEntity> services = serviceRepository.findAllById(request.getServices());

        if (services.isEmpty()) {
            throw new RuntimeException("Không tìm thấy dịch vụ nào phù hợp với danh sách ID đã cung cấp");
        }
        doctor.setService(services);
        doctorRepository.save(doctor);
        DoctorDTO dto = DoctorDTO.fromEntity(doctor);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                "Thêm dịch vụ thành công",
                dto
        ));
    }

    public ResponseEntity<ResponseData<DoctorDTO>> updateDoctorServices(CreateServiceForm request) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bác sĩ với ID: " + request.getDoctorId()));
        List<ServiceEntity> newServices = serviceRepository.findAllById(request.getServices());
        newServices.forEach(service -> service.setDoctor(doctor));
        List<ServiceEntity> currentServices = doctor.getService();
        if (currentServices != null) {
            currentServices.forEach(service -> service.setDoctor(null));
        }

        doctor.setService(newServices);

        doctorRepository.save(doctor);

        return ResponseEntity.ok(
                new ResponseData<>(
                        StatusApplication.SUCCESS.getCode(),
                        "Cập nhật dịch vụ cho bác sĩ thành công",
                        DoctorDTO.fromEntity(doctor)
                )
        );
    }


}
