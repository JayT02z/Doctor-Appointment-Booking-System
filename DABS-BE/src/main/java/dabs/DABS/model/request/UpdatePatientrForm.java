package dabs.DABS.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePatientrForm {
    private Long userId;  // Chỉ cần ID của user, không truyền cả object Users
    private String name;
    private String email;
    private String phone;
    private LocalDate dob;
    private String gender;
    private String address;
    private String medicalHistory;
}
