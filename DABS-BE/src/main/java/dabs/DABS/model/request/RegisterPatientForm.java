package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterPatientForm {

    @NotNull(message = "User ID không được để trống")
    private Long userId;

    @NotNull(message = "Full Name không được để trống")
    @Size(min = 3, max = 100, message = "Full Name phải có độ dài từ 3 đến 100 ký tự")
    private String fullName;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
    private LocalDate dob;

    @NotNull(message = "Giới tính không được để trống")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "Giới tính phải là Male, Female hoặc Other")
    private String gender;

    @NotNull(message = "Địa chỉ không được để trống")
    @Size(min = 5, max = 255, message = "Địa chỉ phải có độ dài từ 5 đến 255 ký tự")
    private String address;

    @Size(max = 2000, message = "Lịch sử bệnh không được vượt quá 2000 ký tự")
    private String medicalHistory;

    private String imgpath;
}
