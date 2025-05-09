package dabs.DABS.model.Entity;

import dabs.DABS.Enum.Frequency;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1, message = "Liều dùng phải lớn hơn hoặc bằng 1")
    @Column(nullable = false)
    private int dosage;

    @Min(value = 1, message = "Thời gian sử dụng phải lớn hơn hoặc bằng 1 ngày")
    @Column(nullable = false)
    private int duration;

    @NotNull(message = "Tần suất sử dụng không được để trống")
    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    @Size(max = 2000, message = "Mô tả tối đa 2000 ký tự")
    @Column(length = 2000)
    private String description;

    @NotNull(message = "Lịch hẹn không được để trống")
    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @NotNull(message = "Bác sĩ không được để trống")
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @NotNull(message = "Bệnh nhân không được để trống")
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ElementCollection
    @CollectionTable(name = "prescription_medicine_names", joinColumns = @JoinColumn(name = "prescription_id"))
    @Column(name = "medicine_name")
    private List<String> medicineNames;

}
