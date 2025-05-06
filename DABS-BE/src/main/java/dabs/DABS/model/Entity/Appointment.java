package dabs.DABS.model.Entity;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.TimeSlot;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Bệnh nhân không được để trống")
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @NotNull(message = "Bác sĩ không được để trống")
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @NotNull(message = "Dịch vụ không được để trống")
    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceEntity service;

    @NotNull(message = "Ngày khám không được để trống")
    @FutureOrPresent(message = "Ngày khám phải là hiện tại hoặc tương lai")
    private LocalDate date;

    @NotNull(message = "Khung giờ không được để trống")
    @Enumerated(EnumType.STRING)
    private TimeSlot timeSlot;

    @NotNull(message = "Trạng thái không được để trống")
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AppointmentStatus status;

    @Size(max = 1000, message = "Ghi chú tối đa 1000 ký tự")
    @Column(columnDefinition = "TEXT")
    private String notes;
}
