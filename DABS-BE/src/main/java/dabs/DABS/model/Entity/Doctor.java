package dabs.DABS.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotNull(message = "User không được null")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @NotBlank(message = "Chuyên khoa không được để trống")
    @Column(nullable = false)
    private String specialization;

    @Min(value = 0, message = "Số năm kinh nghiệm phải >= 0")
    @Column(nullable = false)
    private int experience;

    @NotBlank(message = "Bằng cấp không được để trống")
    @Column(nullable = false)
    private String qualification;

    @NotBlank(message = "Bệnh viện không được để trống")
    @Column(nullable = false)
    private String hospital;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> availability;

    @ManyToMany
    @JoinTable(
            name = "doctor_service",
            joinColumns = @JoinColumn(name = "doctor_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<ServiceEntity> services;

    private String imgpath;
}
