package dabs.DABS.model.DTO;

<<<<<<< HEAD
import dabs.DABS.Enum.Status;
=======
import ch.qos.logback.core.status.Status;
import dabs.DABS.model.Entity.Users;
>>>>>>> 99bcdaaa2054b4d20455878c13ec62e1d1ddb0b0
import lombok.*;
import dabs.DABS.Enum.Role;
import dabs.DABS.model.Entity.Users;
import java.time.LocalDateTime;

import javax.management.relation.Role;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String name;
    private String email;
    private String phone;
    private Role role;
    private LocalDateTime createdAt;
    private Status status;

    // Static method for mapping from entity to DTO
    public static UserDTO fromEntity(Users user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .status(user.getStatus())
                .build();
    }

    // Optional: Static method for mapping from DTO to entity
    public static Users toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        Users user = new Users();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setStatus(userDTO.getStatus());
        return user;
    }
}
