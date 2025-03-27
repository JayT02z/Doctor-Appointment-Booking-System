package dabs.DABS.service;

import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterPatientForm;
import dabs.DABS.model.request.UpdatePatientrForm;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UsersService usersService;

    public ResponseEntity<ResponseData<List<Patient>>> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patients
        ));
    }

    public ResponseEntity<ResponseData<Optional<Patient>>> getPatientById(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patient
        ));
    }

    public ResponseEntity<ResponseData<Patient>> addPatient(RegisterPatientForm patient) {
        Patient patients = new Patient();


        Users user = usersRepository.findById(patient.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        patients.setUser(user);
        patients.setDob(patient.getDob());
        patients.setGender(patient.getGender());
        patients.setAddress(patient.getAddress());
        patients.setMedicalHistory(patient.getMedicalHistory());

        patientRepository.save(patients);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patients
        ));
    }

    public ResponseEntity<ResponseData<Patient>> updatePatient(Long id, UpdatePatientrForm patientForm) {

        Patient patients = patientRepository.findById(id).orElseThrow();
        Users users = usersRepository.findById(patientForm.getUserId()).orElseThrow();

        patients.setDob(patientForm.getDob());
        patients.setGender(patientForm.getGender());
        patients.setAddress(patientForm.getAddress());
        patients.setMedicalHistory(patientForm.getMedicalHistory());

        users.setEmail(patientForm.getEmail());
        users.setPhone(patientForm.getPhone());
        users.setUsername(patientForm.getName());

        usersRepository.save(users);
        patientRepository.save(patients);

        ResponseData<Patient> responseData = new ResponseData<>(StatusApplication.SUCCESS.getCode(),StatusApplication.SUCCESS.getMessage(), patients);
        return ResponseEntity.ok(responseData);
    }
}
