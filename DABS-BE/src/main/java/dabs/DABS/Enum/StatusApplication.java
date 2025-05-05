package dabs.DABS.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(force = true)
public enum StatusApplication {
    // Success messages
    SUCCESS(200, "Success"),
    VALID_TOKEN(202, "Valid token"),

    // Error messages
    BAD_REQUEST(400, "Bad Request"),
    UNAUTHORIZED(401, "Unauthorized"),
    FORBIDDEN(403, "Forbidden"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),

    // Validation errors
    VALIDATION_FAILED(422, "Validation Failed");

    private final int code;
    private final String message;

    StatusApplication(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
