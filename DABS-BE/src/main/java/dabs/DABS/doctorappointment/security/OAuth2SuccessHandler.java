package dabs.DABS.doctorappointment.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.service.UsersService;
import dabs.DABS.doctorappointment.security.jwt.JwtUtil;
import dabs.DABS.service.GooglePeopleService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UsersService usersService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final GooglePeopleService googlePeopleService;
    private final OAuth2AuthorizedClientService clientService;
    private final ObjectMapper objectMapper;

    public OAuth2SuccessHandler(UsersService usersService,
                                JwtUtil jwtUtil,
                                UserDetailsService userDetailsService,
                                GooglePeopleService googlePeopleService,
                                OAuth2AuthorizedClientService clientService) {
        this.usersService = usersService;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.googlePeopleService = googlePeopleService;
        this.clientService = clientService;
        this.objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String googleId = oauthUser.getAttribute("sub");
        String avatarUrl = oauthUser.getAttribute("picture");
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        System.out.println("GOOGLE ACCESS TOKEN: " + accessToken);

        String phone = googlePeopleService.fetchPrimaryPhone(accessToken);
        Users user = usersService.processOAuthPostLogin(email, name, googleId, avatarUrl, phone);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        Long doctorId = usersService.getDoctorIdByUserId(user.getId());
        Long patientId = usersService.getPatientIdByUserId(user.getId());

        Map<String, Object> body = new HashMap<>();
        body.put("message", "Login with Google thành nhân");
        body.put("token", token);
        body.put("user", UserDTO.fromEntity(user));
        body.put("doctorId", doctorId);
        body.put("patientId", patientId);

        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
        String redirectUri = "http://localhost:5173/oauth2/redirect?token=" + encodedToken + "&userId=" + user.getId();

        response.sendRedirect(redirectUri);


//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
