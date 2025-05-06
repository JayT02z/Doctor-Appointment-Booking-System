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
public class UpdateDoctorForm {

    @NotBlank(message = "Họ và tên là bắt buộc")  // Đảm bảo trường này không rỗng
    @Size(min = 3, max = 100, message = "Họ và tên phải có độ dài từ 3 đến 100 ký tự")  // Đảm bảo độ dài hợp lý
    private String fullName;

    @NotBlank(message = "Chuyên khoa là bắt buộc")  // Đảm bảo không rỗng
    @Size(min = 3, max = 50, message = "Chuyên khoa phải có độ dài từ 3 đến 50 ký tự")  // Đảm bảo độ dài hợp lý
    private String specialization;

    @Min(value = 0, message = "Kinh nghiệm phải lớn hơn hoặc bằng 0")  // Đảm bảo giá trị hợp lệ cho kinh nghiệm
    @Max(value = 100, message = "Kinh nghiệm không được vượt quá 100 năm")  // Đảm bảo giá trị hợp lý cho kinh nghiệm
    private int experience;

    @NotBlank(message = "Trình độ chuyên môn là bắt buộc")  // Đảm bảo trường này không rỗng
    private String qualification;

    @NotBlank(message = "Bệnh viện là bắt buộc")  // Đảm bảo không rỗng
    @Size(min = 3, max = 100, message = "Tên bệnh viện phải có độ dài từ 3 đến 100 ký tự")  // Đảm bảo độ dài hợp lý
    private String hospital;

//    @DecimalMin(value = "0.0", inclusive = false, message = "Đánh giá phải lớn hơn 0")  // Đảm bảo đánh giá là số dương
//    @DecimalMax(value = "5.0", inclusive = true, message = "Đánh giá không được vượt quá 5")  // Đảm bảo đánh giá không vượt quá 5
    private Double rating;
}
