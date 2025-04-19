package dabs.DABS.model.DTO;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import dabs.DABS.model.Entity.Users;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private Role role;
    private LocalDateTime createdAt;
    private Status status;

    public static UserDTO fromEntity(Users user) {
        if (user == null) {
            return null;
        }
        Role role = null;
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            role = user.getRoles().iterator().next();
        }
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(role)
                .createdAt(user.getCreatedAt())
                .status(user.getStatus())
                .build();
    }

    public static Users toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        Users user = new Users();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        if (userDTO.getRole() != null) {
            user.setRoles(Collections.singleton(userDTO.getRole()));
        }
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setStatus(userDTO.getStatus());
        return user;
    }
}
