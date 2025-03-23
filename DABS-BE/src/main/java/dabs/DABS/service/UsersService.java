package dabs.DABS.service;

import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.request.LoginRequest;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public ResponseEntity<ResponseData<UserDTO>> saveUser(Users user) {
        // Kiểm tra xem email đã tồn tại hay chưa
        Optional<Users> existingUser = usersRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(409)
                    .Message("Email đã tồn tại!")
                    .data(null)
                    .build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Nếu email chưa tồn tại, tiến hành đăng ký người dùng mới
        Users newUser = new Users();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setPhone(user.getPhone());
        newUser.setCreatedAt(user.getCreatedAt() != null ? user.getCreatedAt() : LocalDateTime.now());
        newUser.setStatus(Status.ACTIVE);
        newUser.setRoles(user.getRoles());

        Users savedUser = usersRepository.save(newUser);
        UserDTO userDTO = UserDTO.fromEntity(savedUser);

        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseData<UserDTO>> loginUser(LoginRequest loginRequest) {
        Optional<Users> optionalUser = usersRepository.findByUsername(loginRequest.getUsername());
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(404)
                    .Message("User not found")
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users foundUser = optionalUser.get();
        if (!foundUser.getPassword().equals(loginRequest.getPassword())) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(401)
                    .Message("Invalid credentials")
                    .data(null)
                    .build();
            return ResponseEntity.status(401).body(response);
        }
        UserDTO userDTO = UserDTO.fromEntity(foundUser);
        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseData<UserDTO>> getUserById(int id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(404)
                    .Message("User not found")
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users user = optionalUser.get();
        UserDTO userDTO = UserDTO.fromEntity(user);
        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }

    // Cập nhật thông tin người dùng (updateUserInfo)
    public ResponseEntity<ResponseData<UserDTO>> updateUserInfo(int id, Users updatedUser) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(404)
                    .Message("User not found")
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users existingUser = optionalUser.get();
        // Cập nhật các trường cho phép: email, phone, password (nếu được cung cấp) và roles
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getRoles() != null && !updatedUser.getRoles().isEmpty()) {
            existingUser.setRoles(updatedUser.getRoles());
        }
        Users savedUser = usersRepository.save(existingUser);
        UserDTO userDTO = UserDTO.fromEntity(savedUser);
        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }

    // Cập nhật trạng thái người dùng (updateUser): Ví dụ, set status INACTIVE
    public ResponseEntity<ResponseData<UserDTO>> updateUser(int id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(404)
                    .Message("User not found")
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users findUser = optionalUser.get();
        findUser.setStatus(Status.INACTIVE);
        Users savedUser = usersRepository.save(findUser);
        UserDTO userDTO = UserDTO.fromEntity(savedUser);
        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }
}
