package dabs.DABS.model.DTO;

import dabs.DABS.Enum.Rating;
import dabs.DABS.model.Entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private Long id;
    private String feedbackText;
    private Rating rating;
    private Long patientId;
    private Long doctorId;

    public FeedbackDTO(Feedback feedback) {
        this.id = feedback.getId();
        this.feedbackText = feedback.getComment();
        this.rating = feedback.getRating();
        this.patientId = (feedback.getPatient() != null)
            ? feedback.getPatient().getId()
            : null;
        this.doctorId = (feedback.getDoctor() != null) ? feedback.getDoctor().getId() : null;
    }

}
