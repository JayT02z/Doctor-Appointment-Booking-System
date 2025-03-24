package dabs.DABS.service;

import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.repository.DoctorRepository;
import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Optional<Doctor> getDoctorById(long id) {
        return doctorRepository.findById(id);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Search none: " + id));
        // update info
        doctor.setFullName(updatedDoctor.getFullName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setHospital(updatedDoctor.getHospital());
        doctor.setRating(updatedDoctor.getRating());

        return doctorRepository.save(doctor);
    }
}




