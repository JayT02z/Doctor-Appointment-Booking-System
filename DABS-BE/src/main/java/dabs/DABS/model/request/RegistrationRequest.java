package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {

    @NotBlank(message = "Username is required")  // Đảm bảo không rỗng
    @Size(min = 4, max = 50, message = "Username must be between 4 and 50 characters")  // Đảm bảo độ dài hợp lý
    private String username;

    @NotBlank(message = "Password is required")  // Đảm bảo không rỗng
    @Size(min = 8, message = "Password must be at least 8 characters long")  // Đảm bảo độ dài mật khẩu
    private String password;

    @NotBlank(message = "Email is required")  // Đảm bảo không rỗng
    @Email(message = "Email must be a valid email address")  // Đảm bảo email đúng định dạng
    private String email;

    @NotBlank(message = "Phone number is required")  // Đảm bảo không rỗng
    @Size(min = 10, max = 10, message = "Phone number must be 10 digits long")  // Đảm bảo đúng 10 ký tự
    @Pattern(regexp = "\\d{10}", message = "Phone number must contain only digits")  // Đảm bảo chỉ chứa số
    private String phone;

    @NotBlank(message = "Role is required")  // Đảm bảo không rỗng
    @Pattern(regexp = "^(ADMIN|USER|DOCTOR)$", message = "Role must be either ADMIN, USER, or DOCTOR")  // Đảm bảo role hợp lệ
    private String role;

    // Ma except cho doctor
    @Null(message = "Invitation code is not required for non-doctor roles")  // Đảm bảo mã mời chỉ hợp lệ cho doctor
    private String invitationCode;

    // Validity kiểm tra invitationCode khi role là DOCTOR
    public void validateInvitationCodeIfDoctor() {
        if ("DOCTOR".equalsIgnoreCase(role) && (invitationCode == null || invitationCode.isEmpty())) {
            throw new IllegalArgumentException("Invitation code is required for doctors");
        }
    }
}
