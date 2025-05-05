package dabs.DABS.model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Tên thuốc không được để trống")
    @Column(nullable = false, unique = true)
    private String name;

    @Size(max = 5000, message = "Mô tả tối đa 5000 ký tự")
    @Column(length = 2000)
    private String description;

    @NotBlank(message = "Liều lượng không được để trống")
    @Column(nullable = false)
    private String dosage;

    @ManyToMany(mappedBy = "medicines")
    @JsonIgnore
    private List<Prescription> prescriptions;
}
