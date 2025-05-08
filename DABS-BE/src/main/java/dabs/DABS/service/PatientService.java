package dabs.DABS.service;

import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.DTO.PatientDTO;
import dabs.DABS.model.DTO.UserDTO;
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

    public ResponseEntity<ResponseData<List<PatientDTO>>> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDTO> patientDTOs = patients.stream()
                .map(PatientDTO::new)
                .toList();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patientDTOs
        ));
    }

    public ResponseEntity<ResponseData<PatientDTO>> getPatientById(Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        PatientDTO patientDTO = new PatientDTO(patient);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patientDTO
        ));
    }

    public ResponseEntity<ResponseData<PatientDTO>> addPatient(RegisterPatientForm patient) {
        Patient patients = new Patient();


        Users user = usersRepository.findById(patient.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        patients.setUser(user);
        patients.setFullName(patient.getFullName());
        patients.setDob(patient.getDob());
        patients.setGender(patient.getGender());
        patients.setAddress(patient.getAddress());
        patients.setMedicalHistory(patient.getMedicalHistory());

        patientRepository.save(patients);

        PatientDTO patientDTO = new PatientDTO(patients);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patientDTO
        ));
    }

    public ResponseEntity<ResponseData<Patient>> updatePatient(Long id, UpdatePatientrForm patientForm) {

        Patient patients = patientRepository.findById(id).orElseThrow();
        Users users = usersRepository.findById(patientForm.getUserId()).orElseThrow();

        patients.setFullName(patientForm.getName());
        patients.setDob(patientForm.getDob());
        patients.setGender(patientForm.getGender());
        patients.setAddress(patientForm.getAddress());
        patients.setMedicalHistory(patientForm.getMedicalHistory());

        users.setEmail(patientForm.getEmail());
        users.setPhone(patientForm.getPhone());
        users.setUsername(patientForm.getName());

        usersRepository.save(users);
        patientRepository.save(patients);


        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                patients));
    }

    public ResponseEntity<ResponseData<Patient>> deletePatient(Long id) {
        Patient patients = patientRepository.findById(id).orElseThrow();
        Users users = usersRepository.findById(patients.getUser().getId()).orElseThrow();
        users.setStatus(Status.INACTIVE);
        usersRepository.save(users);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                null
        ));

    }
}
