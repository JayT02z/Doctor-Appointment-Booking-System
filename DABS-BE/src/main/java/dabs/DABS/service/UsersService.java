package dabs.DABS.service;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.request.LoginRequest;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegistrationRequest;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    // Code form application.properties
    @Value("${doctor.invitation.code}")
    private String validInvitationCode;

    public ResponseEntity<ResponseData<UserDTO>> saveUser(RegistrationRequest regRequest) {
        // Checking duplicate email
        Optional<Users> existingByEmail = usersRepository.findByEmail(regRequest.getEmail());
        if (existingByEmail.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.EMAIL_EXISTS.getCode())
                    .Message(ErrorCode.EMAIL_EXISTS.getMessage())
                    .data(null)
                    .build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Checking Phone number
        Optional<Users> existingByPhone = usersRepository.findByPhone(regRequest.getPhone());
        if (existingByPhone.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.PHONE_EXISTS.getCode())
                    .Message(ErrorCode.PHONE_EXISTS.getMessage())
                    .data(null)
                    .build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // If role is DOCTOR, Checking CODE
        if ("DOCTOR".equalsIgnoreCase(regRequest.getRole())) {
            if (regRequest.getInvitationCode() == null ||
                    !validInvitationCode.equals(regRequest.getInvitationCode())) {
                System.out.println("Mã mời nhận được: " + regRequest.getInvitationCode() + ", Code done: " + validInvitationCode);
                ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                        .StatusCode(403)
                        .Message("Code incorrect")
                        .data(null)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
        }

        // Creating newusers from RegistrationRequest
        Users newUser = new Users();
        newUser.setUsername(regRequest.getUsername());
        newUser.setEmail(regRequest.getEmail());
        newUser.setPassword(regRequest.getPassword());
        newUser.setPhone(regRequest.getPhone());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setStatus(Status.ACTIVE);

        // Role default PATIENT
        String roleStr = regRequest.getRole();
        Role role;
        try {
            role = (roleStr != null && !roleStr.isEmpty()) ? Role.valueOf(roleStr.toUpperCase()) : Role.PATIENT;
        } catch (Exception e) {
            role = Role.PATIENT;
        }
        newUser.setRoles(Collections.singleton(role));

        // Save new user
        Users savedUser = usersRepository.save(newUser);
        UserDTO userDTO = UserDTO.fromEntity(savedUser);

        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }

    //Login data accept from model DTO, request
    public ResponseEntity<ResponseData<UserDTO>> loginUser(LoginRequest loginRequest) {
        Optional<Users> optionalUser = usersRepository.findByUsername(loginRequest.getUsername());
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.USER_NOT_FOUND.getCode())
                    .Message(ErrorCode.USER_NOT_FOUND.getMessage())
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users foundUser = optionalUser.get();
        if (!foundUser.getPassword().equals(loginRequest.getPassword())) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.INVALID_CREDENTIAL.getCode())
                    .Message(ErrorCode.INVALID_CREDENTIAL.getMessage())
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
                    .StatusCode(ErrorCode.USER_NOT_FOUND.getCode())
                    .Message(ErrorCode.USER_NOT_FOUND.getMessage())
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

    // update info
    public ResponseEntity<ResponseData<UserDTO>> updateUserInfo(int id, Users updatedUser) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.USER_NOT_FOUND.getCode())
                    .Message(ErrorCode.USER_NOT_FOUND.getMessage())
                    .data(null)
                    .build();
            return ResponseEntity.status(404).body(response);
        }
        Users existingUser = optionalUser.get();
        // Update
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

    // Update done
    public ResponseEntity<ResponseData<UserDTO>> updateUser(int id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                    .StatusCode(ErrorCode.USER_NOT_FOUND.getCode())
                    .Message(ErrorCode.USER_NOT_FOUND.getMessage())
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
