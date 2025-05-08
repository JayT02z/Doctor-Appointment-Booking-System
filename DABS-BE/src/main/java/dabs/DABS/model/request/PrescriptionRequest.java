package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PrescriptionRequest {

    @NotNull(message = "Dosage không được để trống")
    @Min(value = 1, message = "Dosage phải lớn hơn 0")
    private int dosage;

    @NotNull(message = "Duration không được để trống")
    @Min(value = 1, message = "Duration phải lớn hơn 0")
    private int duration;

    @NotNull(message = "Frequency không được để trống")
    @Size(min = 1, message = "Frequency không thể trống")
    private String frequency;

    @Size(max = 2000, message = "Description không được vượt quá 2000 ký tự")
    private String description;

    @NotNull(message = "Appointment ID không được để trống")
    private Long appointmentId;

    @NotNull(message = "Doctor ID không được để trống")
    private Long doctorId;

    @NotNull(message = "Patient ID không được để trống")
    private Long patientId;

    @NotEmpty(message = "Danh sách medicine IDs không được để trống")
    private List<Long> medicineIds;
}
