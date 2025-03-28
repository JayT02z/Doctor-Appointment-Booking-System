package dabs.DABS.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDoctorForm {
    private String fullName;
    private Long userId;
    private String specialization;
    private int experience;
    private String qualification;
    private String hospital;
    private Double rating;
}
