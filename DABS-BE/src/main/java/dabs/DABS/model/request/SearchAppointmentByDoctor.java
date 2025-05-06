package dabs.DABS.model.request;

import dabs.DABS.Enum.AppointmentStatus;
import jakarta.persistence.Access;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchAppointmentByDoctor {
    @NotNull(message = "Doctor ID cannot be null")
    private Long doctorId;

    @NotNull(message = "Appointment status cannot be null")
    private AppointmentStatus status;
}
