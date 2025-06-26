package dabs.DABS.model.Entity;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    @Column(nullable = true)
    private String password;

    @Pattern(regexp = "^(0[0-9]{9})$", message = "Số điện thoại không hợp lệ (phải gồm 10 chữ số bắt đầu bằng 0)")
    @Column(unique = true, nullable = true)
    private String phone;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @NotEmpty(message = "Người dùng phải có ít nhất một vai trò")
    private Set<Role> roles;

    private LocalDateTime createdAt;

    private LocalDateTime lastLoginAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "is_oauth2")
    private Boolean isOauth2 = false;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Doctor doctor;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Patient patient;

}
