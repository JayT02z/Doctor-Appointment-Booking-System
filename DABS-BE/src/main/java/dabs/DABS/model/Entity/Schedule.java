package dabs.DABS.model.Entity;

import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.TimeSlot;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

//    @Enumerated(EnumType.STRING)
//    private DayOfWeek dayOfWeek; // ENUM: MONDAY - SUNDAY

    //Ngày làm việc
    @Column(nullable = false)
    private LocalDate date;

    //Giờ làm việc
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TimeSlot timeSlot;
    @Column(nullable = false)
    private boolean available;
}
