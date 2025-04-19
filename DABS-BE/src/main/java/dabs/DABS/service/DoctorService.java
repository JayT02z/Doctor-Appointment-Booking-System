package dabs.DABS.service;

import dabs.DABS.Enum.StatusApplication;
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

    public ResponseEntity<ResponseData<List<Doctor>>> getAllDoctors() {
       List<Doctor> listAlldoctor = doctorRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                listAlldoctor
        ));
    }

    public ResponseEntity<ResponseData<Doctor>> getDoctorById(long id) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                doctor
        ));
    }

    public ResponseEntity<ResponseData<Doctor>> updateDoctor(Long id, UpdateDoctorForm updateDoctorForm) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);

        doctor.setFullName(updateDoctorForm.getFullName());
        doctor.setSpecialization(updateDoctorForm.getSpecialization());
        doctor.setQualification(updateDoctorForm.getQualification());
        doctor.setExperience(updateDoctorForm.getExperience());
        doctor.setRating(updateDoctorForm.getRating());
        doctor.setHospital(updateDoctorForm.getHospital());

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                updatedDoctor
        ));
    }

    public ResponseEntity<ResponseData<Doctor>> addDoctor(RegisterDoctorForm doctor) {
        Doctor doctors = new Doctor();
        Users users = usersRepository.findById(doctor.getUserId()).orElse(null);

        doctors.setFullName(doctor.getFullName());
        doctors.setUser(users);
        doctors.setSpecialization(doctor.getSpecialization());
        doctors.setExperience(doctor.getExperience());
        doctors.setQualification(doctor.getQualification());
        doctors.setHospital(doctor.getHospital());
//        doctors.setRating(doctor.getRating());

        Doctor responseData = doctorRepository.save(doctors);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                responseData
        ));

    }
}




