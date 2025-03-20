package dabs.DABS.model.Entity;

import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.TimeSlot;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek; // ENUM: MONDAY - SUNDAY

    @ElementCollection
    private List<TimeSlot> timeSlots; // Danh sách khung giờ làm việc
}
