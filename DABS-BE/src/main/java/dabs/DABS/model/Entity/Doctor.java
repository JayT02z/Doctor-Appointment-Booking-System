package dabs.DABS.model.Entity;

import jakarta.persistence.*;
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

    @Column(name ="full_name", nullable = false)
    private String fullName;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private int experience;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private String hospital;

//    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Long> serviceId;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> availability;


//    private Double rating;
}
