package dabs.DABS.model.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;

    //Ma except cho doctor
    private String invitationCode;
}
