package dabs.DABS.model.request;

import dabs.DABS.Enum.Rating;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {

    private Rating rating;

    @Size(max = 2000, message = "Comment must be less than 2000 characters")
    private String comment;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;
}
