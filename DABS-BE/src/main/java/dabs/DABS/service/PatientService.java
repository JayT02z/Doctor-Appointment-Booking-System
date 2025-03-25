package dabs.DABS.service;

import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterPatientForm;
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

//    public ResponseEntity<ResponseData<Patient>> updatePatient(Long id, RegisterPatientForm patient) {
//        // Tìm bệnh nhân theo ID
//        Patient patient = patientRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
//
//        // Cập nhật thông tin từ DTO
//        if (patientForm.getDob() != null) patient.setDob(patientForm.getDob());
//        if (patientForm.getGender() != null) patient.setGender(patientForm.getGender());
//        if (patientForm.getAddress() != null) patient.setAddress(patientForm.getAddress());
//        if (patientForm.getMedicalHistory() != null) patient.setMedicalHistory(patientForm.getMedicalHistory());
//
//        // Cập nhật thông tin User nếu cần
//        Users user = patient.getUser();
//        if (patientForm.getName() != null) user.setName(patientForm.getName());
//        if (patientForm.getEmail() != null) user.setEmail(patientForm.getEmail());
//        if (patientForm.getPhone() != null) user.setPhone(patientForm.getPhone());
//
//        // Lưu thay đổi vào database
//        userRepository.save(user);
//        Patient updatedPatient = patientRepository.save(patient);
//
//        // Trả về dữ liệu thành công
//        ResponseData<Patient> responseData = new ResponseData<>(true, "Patient updated successfully", updatedPatient);
//        return ResponseEntity.ok(responseData);
//
//    }
}
