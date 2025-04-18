package dabs.DABS.model.request;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.TimeSlot;
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
    private Long patientId;
    private Long doctorId;
    private LocalDate date;
    private TimeSlot timeSlot;
    private String notes;
    private AppointmentStatus status;

}
