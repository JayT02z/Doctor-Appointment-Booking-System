package dabs.DABS.model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.TimeSlot;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


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
    @JoinColumn(name = "doctor_id") // Liên kết với Doctor
    @JsonIgnore
    private Doctor doctor;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek; // ENUM: MONDAY - SUNDAY

    //Ngày làm việc
    @Column(nullable = false)
    private LocalDate date;

    //Giờ làm việc
    @ElementCollection(targetClass = TimeSlot.class)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @JsonIgnore
    private Set<TimeSlot> timeSlot;

    @Column(nullable = false)
    private boolean available;
}
