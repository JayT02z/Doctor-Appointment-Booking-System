package dabs.DABS.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "services")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Size(max = 255, message = "Tên dịch vụ không được vượt quá 255 ký tự")
    @Column(nullable = false, unique = true)
    private String name;

    @Size(max = 500, message = "Mô tả dịch vụ không được vượt quá 500 ký tự")
    @Column(length = 500)
    private String description;

    @NotNull(message = "Giá dịch vụ không được để trống")
    @Positive(message = "Giá dịch vụ phải lớn hơn 0")
    @Column(nullable = false)
    private Double price;

    @NotNull(message = "Trạng thái hoạt động không được để trống")
    @Column(nullable = false)
    private Boolean isActive = true;
}
