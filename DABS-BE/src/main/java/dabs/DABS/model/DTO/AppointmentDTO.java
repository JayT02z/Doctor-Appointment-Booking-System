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
    private String serviceName;
    private LocalDate date;
    private String timeSlot;
    private String status;
    private String notes;

    public AppointmentDTO(Appointment appointment) {
        this.id = appointment.getId();
        this.patientName = appointment.getPatient() != null && appointment.getPatient().getUser() != null ? appointment.getPatient().getUser().getUsername() : "N/A";
        this.doctorName = appointment.getDoctor() != null && appointment.getDoctor().getUser() != null ? appointment.getDoctor().getUser().getUsername() : "N/A";
        this.specialization = appointment.getDoctor() != null ? appointment.getDoctor().getSpecialization() : "N/A";
        this.serviceName = appointment.getService() != null ? appointment.getService().getName() : "N/A";
        this.date = appointment.getDate();
        this.timeSlot = appointment.getTimeSlot() != null ? appointment.getTimeSlot().toString() : "N/A";
        this.status = appointment.getStatus() != null ? appointment.getStatus().toString() : "N/A";
        this.notes = appointment.getNotes() != null ? appointment.getNotes() : "N/A";
    }

}
