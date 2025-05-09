package dabs.DABS.service;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.doctorappointment.security.jwt.JwtUtil;
import dabs.DABS.exception.ErrorCode;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.AuthResponse;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.ChangeRole;
import dabs.DABS.model.request.ForgetPasswordForm;
import dabs.DABS.model.request.LoginRequest;
import dabs.DABS.model.request.RegistrationRequest;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersService {

    private static final Logger log = LoggerFactory.getLogger(UsersService.class);

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @Value("${doctor.invitation.code}")
    private String validInvitationCode;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;


    public ResponseEntity<ResponseData<AuthResponse>> loginUser(LoginRequest loginRequest) {
        Optional<Users> optionalUser = usersRepository.findByUsername(loginRequest.getUsername());
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(404).body(new ResponseData<>(
                    ErrorCode.USER_NOT_FOUND.getCode(),
                    ErrorCode.USER_NOT_FOUND.getMessage(),
                    null
            ));
        }

        Users foundUser = optionalUser.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
            return ResponseEntity.status(401).body(new ResponseData<>(
                    ErrorCode.INVALID_CREDENTIAL.getCode(),
                    ErrorCode.INVALID_CREDENTIAL.getMessage(),
                    null
            ));
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        foundUser.setLastLoginAt(LocalDateTime.now());
        usersRepository.save(foundUser);

        Long userId = foundUser.getId();

        // Tìm doctorId và patientId theo userId
        Long doctorId = doctorRepository.findByUserId(userId).map(Doctor::getId).orElse(null);
        Long patientId = patientRepository.findByUserId(userId).map(Patient::getId).orElse(null);

        AuthResponse authResponse = new AuthResponse(token, userId, doctorId, patientId);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                authResponse
        ));
    }


    //register user
    //check dup mail
    public ResponseEntity<ResponseData<UserDTO>> saveUser(RegistrationRequest regRequest) {
        if (usersRepository.findByEmail(regRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseData<>(
                    ErrorCode.EMAIL_EXISTS.getCode(),
                    ErrorCode.EMAIL_EXISTS.getMessage(),
                    null
            ));
        }
        //check dup phone
        if (usersRepository.findByPhone(regRequest.getPhone()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseData<>(
                    ErrorCode.PHONE_EXISTS.getCode(),
                    ErrorCode.PHONE_EXISTS.getMessage(),
                    null
            ));
        }
        //check code if correct -> user is doctor
        if ("DOCTOR".equalsIgnoreCase(regRequest.getRole()) &&
                (regRequest.getInvitationCode() == null || !validInvitationCode.equals(regRequest.getInvitationCode()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseData<>(
                    403, "Code incorrect", null
            ));
        }
//tao user moi
        Users newUser = new Users();
        newUser.setUsername(regRequest.getUsername());
        newUser.setEmail(regRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(regRequest.getPassword()));
        newUser.setPhone(regRequest.getPhone());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setStatus(Status.ACTIVE);

        Role role = Optional.ofNullable(regRequest.getRole())
                .map(r -> Role.valueOf(r.toUpperCase()))
                .orElse(Role.PATIENT);
        newUser.setRoles(Collections.singleton(role));

        Users savedUser = usersRepository.save(newUser);
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                UserDTO.fromEntity(savedUser)
        ));
    }

    // get info fowllow id
    public ResponseEntity<ResponseData<UserDTO>> getUserById(Long id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseData<>(
                    ErrorCode.USER_NOT_FOUND.getCode(),
                    ErrorCode.USER_NOT_FOUND.getMessage(),
                    null
            ));
        }

        UserDTO userDTO = UserDTO.fromEntity(optionalUser.get());
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                userDTO
        ));
    }

    //update status acc
    public ResponseEntity<ResponseData<UserDTO>> updateUser(Long id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseData<>(
                    ErrorCode.USER_NOT_FOUND.getCode(),
                    ErrorCode.USER_NOT_FOUND.getMessage(),
                    null
            ));
        }

        Users user = optionalUser.get();
        user.setStatus(Status.INACTIVE);
        Users savedUser = usersRepository.save(user);

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                UserDTO.fromEntity(savedUser)
        ));
    }

    //update info user
    public ResponseEntity<ResponseData<UserDTO>> updateUserInfo(Long id, Users updatedUser) {
        Users existingUser = usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        Users savedUser = usersRepository.save(existingUser);
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                UserDTO.fromEntity(savedUser)
        ));
    }

    public ResponseEntity<ResponseData<List<UserDTO>>> getAllUsers() {
        List<Users> usersList = usersRepository.findAll();
        List<UserDTO> userDTOs = usersList.stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                userDTOs
        ));
    }

    public ResponseEntity<ResponseData<UserDTO>> changeRole(ChangeRole role){
        Users user = usersRepository.findById(role.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRoles(role.getRole());
        usersRepository.save(user);

        UserDTO userDTO = UserDTO.fromEntity(user);
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                userDTO
        ));

    }

    public ResponseEntity<ResponseData<Void>> forgetPassword(ForgetPasswordForm form) {
        Users optionalUser = usersRepository.findByEmail(form.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        optionalUser.setPassword(passwordEncoder.encode(form.getPassword()));

        usersRepository.save(optionalUser);
        return ResponseEntity.ok(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                null
        ));


    }

}
