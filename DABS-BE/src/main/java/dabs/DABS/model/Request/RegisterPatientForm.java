package dabs.DABS.model.request;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterPatientForm {
    private Long userId;
    private LocalDate dob;
    private String gender;
    private String address;
    private String medicalHistory;
}
