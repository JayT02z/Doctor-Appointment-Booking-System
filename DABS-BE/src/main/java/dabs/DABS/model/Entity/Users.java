package dabs.DABS.model.Entity;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createdAt;

<<<<<<< HEAD
    private Status status;
=======
    public void setUserName(String name) {
    }
>>>>>>> 99bcdaaa2054b4d20455878c13ec62e1d1ddb0b0
}
