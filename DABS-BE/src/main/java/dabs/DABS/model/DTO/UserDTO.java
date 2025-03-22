package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Users;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
    private Status status;
    private Role role;

    // Static method for mapping from entity to DTO
    public static UserDTO fromEntity(Users user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .name(user.getUserName())
                .email(user.getEmail())
                .phone(user.getPhoneNumber())
                .address(user.getAddress())
                .status(user.getUserStatus())
                .role(user.getRole())
                .build();
    }

    // Optional: Static method for mapping from DTO to entity
    public static Users toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        Users user = new Users();
        user.setUserName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhone());
        user.setAddress(userDTO.getAddress());
        user.setUserStatus(userDTO.getStatus());
        user.setRole(userDTO.getRole());
        return user;
    }
}
