package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDoctorForm {

    @NotNull(message = "Full Name không được để trống")
    @Size(min = 3, max = 100, message = "Full Name phải có độ dài từ 3 đến 100 ký tự")
    private String fullName;

    @NotNull(message = "User ID không được để trống")
    private Long userId;

    @NotNull(message = "Specialization không được để trống")
    @Size(min = 3, max = 100, message = "Specialization phải có độ dài từ 3 đến 100 ký tự")
    private String specialization;

    @Min(value = 1, message = "Experience phải lớn hơn hoặc bằng 1 năm")
    private int experience;

    @NotNull(message = "Qualification không được để trống")
    @Size(min = 3, max = 200, message = "Qualification phải có độ dài từ 3 đến 200 ký tự")
    private String qualification;

    @NotNull(message = "Hospital không được để trống")
    @Size(min = 3, max = 200, message = "Hospital phải có độ dài từ 3 đến 200 ký tự")
    private String hospital;

//    @Min(value = 0, message = "Rating phải lớn hơn hoặc bằng 0")
//    @Max(value = 5, message = "Rating không thể lớn hơn 5")
//    private Double rating;
}
