package dabs.DABS.model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dabs.DABS.Enum.DayOfWeek;
import dabs.DABS.Enum.TimeSlot;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

    @JsonIgnore
    @NotNull(message = "Bác sĩ không được để trống")
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @NotNull(message = "Thứ trong tuần không được để trống")
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @NotNull(message = "Ngày làm việc không được để trống")
    @FutureOrPresent(message = "Ngày làm việc phải là hôm nay hoặc tương lai")
    @Column(nullable = false)
    private LocalDate date;

    @NotEmpty(message = "Phải chọn ít nhất một khung giờ")
    @ElementCollection(targetClass = TimeSlot.class)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<TimeSlot> timeSlot;

    @Column(nullable = false)
    private boolean available;
}
