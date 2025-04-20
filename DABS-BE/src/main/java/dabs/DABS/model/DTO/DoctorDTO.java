package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Doctor;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private Long id;
    private String fullName;
    private String specialization;
    private int experience;
    private String qualification;
    private String hospital;
    private Long userId;

    public static DoctorDTO fromEntity(Doctor doctor) {
        return DoctorDTO.builder()
                .id(doctor.getId())
                .fullName(doctor.getFullName())
                .specialization(doctor.getSpecialization())
                .experience(doctor.getExperience())
                .qualification(doctor.getQualification())
                .hospital(doctor.getHospital())
                .userId(doctor.getUser() != null ? doctor.getUser().getId() : null)
                .build();
    }
}
