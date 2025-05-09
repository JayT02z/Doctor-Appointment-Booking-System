package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
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

    @NotNull(message = "ID người dùng là bắt buộc")  // Đảm bảo không null
    private Long userId;

    @NotBlank(message = "Tên là bắt buộc")  // Đảm bảo trường này không rỗng
    @Size(min = 3, max = 100, message = "Tên phải có độ dài từ 3 đến 100 ký tự")  // Đảm bảo độ dài hợp lý
    private String name;

    @Email(message = "Email không hợp lệ")  // Đảm bảo email có định dạng hợp lệ
    private String email;

    @NotBlank(message = "Số điện thoại là bắt buộc")  // Đảm bảo không rỗng
    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")  // Đảm bảo đúng 10 chữ số
    @Pattern(regexp = "\\d{10}", message = "Số điện thoại chỉ bao gồm các chữ số")  // Đảm bảo số điện thoại chỉ chứa chữ số
    private String phone;

    @NotNull(message = "Ngày sinh là bắt buộc")  // Đảm bảo không null
    private LocalDate dob;

    @NotBlank(message = "Giới tính là bắt buộc")  // Đảm bảo trường này không rỗng
    private String gender;

    @NotBlank(message = "Địa chỉ là bắt buộc")  // Đảm bảo không rỗng
    @Size(min = 3, max = 255, message = "Địa chỉ phải có độ dài từ 3 đến 255 ký tự")  // Đảm bảo độ dài hợp lý
    private String address;

    @NotBlank(message = "Lịch sử bệnh lý là bắt buộc")  // Đảm bảo trường này không rỗng
    @Size(min = 10, message = "Lịch sử bệnh lý phải có độ dài ít nhất 10 ký tự")  // Đảm bảo độ dài hợp lý
    private String medicalHistory;

    private String imgpath;
}
