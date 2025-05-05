package dabs.DABS.model.request;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.TimeSlot;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentForm {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Date must be today or in the future")
    private LocalDate date;

    @NotNull(message = "Time slot is required")
    private TimeSlot timeSlot;

    @Size(max = 2000, message = "Notes must be at most 2000 characters")
    private String notes;

    private AppointmentStatus status;
}
