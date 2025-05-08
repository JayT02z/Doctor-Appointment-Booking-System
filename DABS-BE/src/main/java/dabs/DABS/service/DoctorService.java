package dabs.DABS.service;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.DTO.DoctorDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegisterDoctorForm;
import dabs.DABS.model.request.UpdateDoctorForm;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.List;
import java.util.Optional;


@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ServiceService serviceService;

    public ResponseEntity<ResponseData<List<DoctorDTO>>> getAllDoctors() {
   List<Doctor> listAllDoctor = doctorRepository.findAll();
    List<DoctorDTO> dtoList = listAllDoctor.stream()
            .map(DoctorDTO::fromEntity)
            .toList();
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            dtoList
    ));
    }

    public ResponseEntity<ResponseData<DoctorDTO>> getDoctorById(long id) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);

        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseData<>(
                    ErrorCode.USER_NOT_FOUND.getCode(),
                    "Doctor not found",
                    null
            ));
        }

        DoctorDTO doctorDTO = DoctorDTO.fromEntity(doctor);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                doctorDTO
        ));
    }

    public ResponseEntity<ResponseData<DoctorDTO>> updateDoctor(Long id, UpdateDoctorForm updateDoctorForm) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);

        doctor.setFullName(updateDoctorForm.getFullName());
        doctor.setSpecialization(updateDoctorForm.getSpecialization());
        doctor.setQualification(updateDoctorForm.getQualification());
        doctor.setExperience(updateDoctorForm.getExperience());
//        doctor.setRating(updateDoctorForm.getRating());
        doctor.setHospital(updateDoctorForm.getHospital());
        DoctorDTO doctorDTO = DoctorDTO.fromEntity(doctor);

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                doctorDTO
        ));
    }

//    public ResponseEntity<ResponseData<Doctor>> addDoctor(RegisterDoctorForm doctor) {
//        Doctor doctors = new Doctor();
//        Users users = usersRepository.findById(doctor.getUserId()).orElse(null);
//
//        doctors.setFullName(doctor.getFullName());
//        doctors.setUser(users);
//        doctors.setSpecialization(doctor.getSpecialization());
//        doctors.setExperience(doctor.getExperience());
//        doctors.setQualification(doctor.getQualification());
//        doctors.setHospital(doctor.getHospital());
////        doctors.setRating(doctor.getRating());
//
//        Doctor responseData = doctorRepository.save(doctors);
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
//                StatusApplication.SUCCESS.getCode(),
//                StatusApplication.SUCCESS.getMessage(),
//                responseData
//        ));
//
//    }
public ResponseEntity<ResponseData<Doctor>> addDoctor(RegisterDoctorForm doctorForm) {
    Users user = usersRepository.findById(doctorForm.getUserId()).orElse(null);

    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseData<>(
                ErrorCode.USER_NOT_FOUND.getCode(),
                ErrorCode.USER_NOT_FOUND.getMessage(),
                null
        ));
    }

    // Kiểm tra và nâng cấp từ PATIENT lên DOCTOR
    if (!user.getRoles().contains(Role.DOCTOR)) {
        user.getRoles().add(Role.DOCTOR);  // Thêm role DOCTOR
        user.getRoles().remove(Role.PATIENT); // Xóa role PATIENT nếu có
        usersRepository.save(user);
    }

    // Tiến hành tạo thông tin bác sĩ
    Doctor doctor = new Doctor();
    doctor.setFullName(doctorForm.getFullName());
    doctor.setSpecialization(doctorForm.getSpecialization());
    doctor.setExperience(doctorForm.getExperience());
    doctor.setQualification(doctorForm.getQualification());
    doctor.setHospital(doctorForm.getHospital());
    doctor.setUser(user);

    // Lưu vào DB
    Doctor savedDoctor = doctorRepository.save(doctor);

    return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            savedDoctor
    ));
}
    public ResponseEntity<ResponseData<DoctorDTO>> getDoctorByUserId(long id) {
        Doctor doctor = doctorRepository.findDoctorByUserId(id).get();

        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseData<>(
                    ErrorCode.USER_NOT_FOUND.getCode(),
                    "Doctor not found",
                    null
            ));
        }

        DoctorDTO doctorDTO = DoctorDTO.fromEntity(doctor);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                doctorDTO
        ));
    }

    public  ResponseEntity<ResponseData<List<DoctorDTO>>> getDoctorByServiceId(Long id) {
        List<Doctor> doctor = doctorRepository.findAllByServiceId(id);
        List<DoctorDTO> dtoList = doctor.stream()
                .map(DoctorDTO::fromEntity)
                .toList();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                dtoList
        ));
    }

    public  ResponseEntity<ResponseData<List<DoctorDTO>>> SearchDoctorbyFullname(String keyword) {
        List<Doctor> doctors = doctorRepository.findByFullNameContainingIgnoreCase(keyword);
        List<DoctorDTO> dtoList = doctors.stream()
                .map(DoctorDTO::fromEntity)
                .toList();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                dtoList
        ));
    }
}
