package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
    private String patientName;
    private String doctorName;
    private String specialization;
    private LocalDate date;
    private String timeSlot;
    private String status;
    private String notes;

    public AppointmentDTO(Appointment appointment) {
        this.id = appointment.getId();
        this.patientName = appointment.getPatient().getUser().getUsername();
        this.doctorName = appointment.getDoctor().getUser().getUsername();
        this.specialization = appointment.getDoctor().getSpecialization();
        this.date = appointment.getDate();
        this.timeSlot = appointment.getTimeSlot().toString();
        this.status = appointment.getStatus().toString();
        this.notes = appointment.getNotes().toString();
    }

}

