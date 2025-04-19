package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long id;
    private String username;
    private LocalDate dob;
    private String gender;
    private String address;
    private String medicalHistory;

    public PatientDTO(Patient patient) {
        this.id = patient.getId();
        this.username = patient.getUser().getUsername();
        this.dob = patient.getDob();
        this.gender = patient.getGender();
        this.address = patient.getAddress();
        this.medicalHistory = patient.getMedicalHistory();
    }
}

