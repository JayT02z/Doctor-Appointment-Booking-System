package dabs.DABS.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordForm {
    private String email;
    private String password;
}
