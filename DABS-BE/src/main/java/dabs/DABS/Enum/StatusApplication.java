package dabs.DABS.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@NoArgsConstructor(force = true)
public enum StatusApplication {
    // Success messages
    SUCCESS(200, "Success"),
    VALID_TOKEN(202, "Valid token");

    private final int code;
    private final String message;
//    private final HttpStatus httpStatus;

    StatusApplication(int code, String message) {
        this.code = code;
        this.message = message;
//        this.httpStatus = httpStatus;
    }
}
