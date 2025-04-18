package dabs.DABS.model.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PrescriptionRequest {
    private int dosage;
    private int duration;
    private String frequency;
    private String description;

    private Long appointmentId;
    private Long doctorId;
    private Long patientId;
    private List<String> medicineIds;
}
