package dabs.DABS.model.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import dabs.DABS.model.DTO.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.ALWAYS)
public class OAuth2LoginResponse {
    private String message;
    private UserDTO user;
    private String token;
    private Long doctorId;
    private Long patientId;
}
