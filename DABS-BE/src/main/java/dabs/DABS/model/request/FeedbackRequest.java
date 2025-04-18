package dabs.DABS.model.request;

import dabs.DABS.Enum.Rating;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {
    private Rating rating;
    private String comment;

    private Long patientId;
    private Long doctorId;

    private Long appointmentId;
}
