package dabs.DABS.model.Entity;

import dabs.DABS.Enum.Rating;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull(message = "Đánh giá không được để trống")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rating rating;

    @NotNull(message = "Bệnh nhân không được để trống")
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @NotNull(message = "Bác sĩ không được để trống")
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @NotNull(message = "Lịch hẹn không được để trống")
    @ManyToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @Size(max = 2000, message = "Bình luận tối đa 2000 ký tự")
    @Column(nullable = true, length = 2000)
    private String comment;
}
