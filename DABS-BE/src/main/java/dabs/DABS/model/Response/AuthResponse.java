package dabs.DABS.model.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;
    private Long doctorId;   // null nếu không phải bác sĩ
    private Long patientId;  // null nếu không phải bệnh nhân
}
