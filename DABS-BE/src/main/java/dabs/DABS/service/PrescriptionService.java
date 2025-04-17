package dabs.DABS.service;

import dabs.DABS.model.Entity.*;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.repository.PrescriptionRepository;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.repository.MedicineRepository;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.request.PrescriptionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Autowired
    private MedicineRepository medicineRepository;

    public ResponseEntity<ResponseData<Prescription>> createRequest(PrescriptionRequest request){
        Prescription prescription = new Prescription();

        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setFrequency(request.getFrequency());
        prescription.setDescription(request.getDescription());

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        List<Medicine> medicines = medicineRepository.findAllById(request.getMedicineIds());

        prescription.setAppointment(appointment);
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setMedicines(medicines);

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            savedPrescription
        ));
    }

    public ResponseEntity<ResponseData<Prescription>> updatePrescription(String id, PrescriptionRequest request) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setFrequency(request.getFrequency());
        prescription.setDescription(request.getDescription());

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        List<Medicine> medicines = medicineRepository.findAllById(request.getMedicineIds());

        prescription.setAppointment(appointment);
        prescription.setDoctor(doctor);
        prescription.setPatient(patient);
        prescription.setMedicines(medicines);

        Prescription updatedPrescription = prescriptionRepository.save(prescription);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            updatedPrescription
        ));
    }

    public ResponseEntity<ResponseData<List<Prescription>>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            prescriptions
        ));
    }

    public ResponseEntity<ResponseData<Prescription>> getPrescriptionById(String id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                prescription
        ));
    }

    public ResponseEntity<ResponseData<Void>> deletePrescription(String id) {
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
