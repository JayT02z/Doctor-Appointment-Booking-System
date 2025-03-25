package dabs.DABS.model.request;

import java.time.LocalDate;

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
