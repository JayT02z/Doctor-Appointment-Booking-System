package dabs.DABS.service;

import dabs.DABS.model.DTO.PrescriptionDTO;
import dabs.DABS.model.Entity.*;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.repository.PrescriptionRepository;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.Enum.Frequency;
import dabs.DABS.model.request.PrescriptionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;
    


    public ResponseEntity<ResponseData<PrescriptionDTO>> createRequest(PrescriptionRequest request) {
        if (prescriptionRepository.existsByAppointment_Id(request.getAppointmentId())) {
            throw new RuntimeException("Appointment already has a prescription");
        }

        Prescription prescription = new Prescription();

        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setFrequency(Frequency.valueOf(request.getFrequency()));
        prescription.setDescription(request.getDescription());

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        prescription.setAppointment(appointment);
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);

        // Lấy danh sách tên thuốc từ request và gán
        prescription.setMedicineNames(request.getMedicineIds());

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                PrescriptionDTO.mapToDTO(savedPrescription)
        ));
    }


    public ResponseEntity<ResponseData<PrescriptionDTO>> updatePrescription(Long id, PrescriptionRequest request) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setFrequency(Frequency.valueOf(request.getFrequency()));
        prescription.setDescription(request.getDescription());
        prescription.setMedicineNames(request.getMedicineIds()); // chỉ còn 1 tên thuốc

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        prescription.setAppointment(appointment);
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);

        Prescription updatedPrescription = prescriptionRepository.save(prescription);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                PrescriptionDTO.mapToDTO(updatedPrescription)
        ));
    }


    public ResponseEntity<ResponseData<List<PrescriptionDTO>>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionRepository.findAll();
        List<PrescriptionDTO> dtos = prescriptions.stream()
            .map(PrescriptionDTO::mapToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            dtos
        ));
    }

    public ResponseEntity<ResponseData<PrescriptionDTO>> getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                PrescriptionDTO.mapToDTO(prescription)
        ));
    }

    public ResponseEntity<ResponseData<Void>> deletePrescription(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescriptionRepository.delete(prescription);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            null
        ));
    }
}
