package dabs.DABS.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import dabs.DABS.Enum.Role;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Doctor;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.AuthResponse;
import dabs.DABS.model.Response.OAuth2LoginResponse;
import dabs.DABS.repository.DoctorRepository;
import dabs.DABS.repository.PatientRepository;
import dabs.DABS.service.GooglePeopleService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import java.util.HashMap;
import java.util.Map;

import dabs.DABS.doctorappointment.security.jwt.JwtUtil;
import dabs.DABS.doctorappointment.security.jwt.TokenBlacklistService;
import dabs.DABS.model.request.LoginRequest;
import dabs.DABS.model.request.OTP;
import dabs.DABS.model.request.OTPVerificationRequest;
import dabs.DABS.service.MailSenderService;
import dabs.DABS.service.UsersService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid; // ✅ Import thêm
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UsersService usersService;
    private final TokenBlacklistService tokenBlackListService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsService userDetailsService, UsersService usersService, TokenBlacklistService tokenBlacklistService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.usersService = usersService;
        this.tokenBlackListService = tokenBlacklistService;
    }

    @Autowired
    private OAuth2AuthorizedClientService clientService;

    @Autowired
    private GooglePeopleService googlePeopleService;

    @Autowired
    private MailSenderService mailSenderService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        return usersService.loginUser(loginRequest, request);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlackListService.blacklistToken(token);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid Authorization header");
    }

    @PostMapping("/sendOTP")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody OTP request) throws MessagingException {
        return mailSenderService.sendOtp(request.getEmail());
    }

    @PostMapping("/verifyOTP")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OTPVerificationRequest request) {
        return mailSenderService.verifyOtp(request.getEmail(), request.getOtp());
    }

    @PostMapping("/resendOTP")
    public ResponseEntity<?> resendOtp(@Valid @RequestBody OTP request) throws MessagingException {
        return mailSenderService.resendOtp(request.getEmail());
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<?> handleGoogleOAuth2Success(OAuth2AuthenticationToken authentication) throws JsonProcessingException {
        OAuth2User oauthUser = authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String googleId = oauthUser.getAttribute("sub");
        String avatarUrl = oauthUser.getAttribute("picture");


        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                authentication.getAuthorizedClientRegistrationId(),
                authentication.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        String phone = googlePeopleService.fetchPrimaryPhone(accessToken);
        Users user = usersService.processOAuthPostLogin(email, name, googleId, avatarUrl, phone);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        Long userId = user.getId();
        Long doctorId = usersService.getDoctorIdByUserId(userId);
        Long patientId = usersService.getPatientIdByUserId(userId);

        // Tự động tạo Doctor/Patient nếu thiếu
        if (patientId == null && user.getRoles().contains(Role.PATIENT)) {
            Patient newPatient = new Patient();
            newPatient.setUser(user);
            patientRepository.save(newPatient);
            patientId = newPatient.getId();
        }

        if (doctorId == null && user.getRoles().contains(Role.DOCTOR)) {
            Doctor newDoctor = new Doctor();
            newDoctor.setUser(user);
            doctorRepository.save(newDoctor);
            doctorId = newDoctor.getId();
        }

        Map<String, Object> body = new HashMap<>();
        body.put("message", "Login with Google thành công");
        body.put("user", UserDTO.fromEntity(user));
        body.put("token", token);
        body.put("doctorId", doctorId);
        body.put("patientId", patientId);

        return ResponseEntity.ok(body);
    }



}
