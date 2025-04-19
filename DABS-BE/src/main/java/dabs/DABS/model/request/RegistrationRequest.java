package dabs.DABS.model.request;

import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;

    @NotBlank(message = "Phone number is required") // Đảm bảo không rỗng/chỉ khoảng trắng
    @Size(min = 10, max = 10, message = "Phone number must be 10 digits long") // Đảm bảo đúng 10 ký tự
    @Pattern(regexp = "\\d{10}", message = "Phone number must contain only digits")
    private String phone;
    private String role;

    //Ma except cho doctor
    private String invitationCode;
}
