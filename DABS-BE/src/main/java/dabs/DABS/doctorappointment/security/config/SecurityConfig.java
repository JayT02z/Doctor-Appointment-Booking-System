package dabs.DABS.doctorappointment.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import dabs.DABS.doctorappointment.security.jwt.JwtRequestFilter;
import dabs.DABS.doctorappointment.security.jwt.JwtUtil;
import dabs.DABS.doctorappointment.security.OAuth2SuccessHandler;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.service.UsersService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    private final UserDetailsService customUserDetailService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter,
                          UserDetailsService customUserDetailService,
                          @Lazy @Autowired OAuth2SuccessHandler oAuth2SuccessHandler) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.customUserDetailService = customUserDetailService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // --- Public Endpoints ---
                        .requestMatchers("/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/logout", "/api/v1/auth/sendOTP", "/api/v1/auth/verifyOTP", "/api/v1/auth/resendOTP").permitAll()
                        .requestMatchers("/login/oauth2/**", "/oauth2/**").permitAll()
                        .requestMatchers("/api/schedules/**",
                                "/api/appointment/**",
                                "/api/medicine/**",
                                "/api/prescription/**",
                                "/api/feedback/**",
                                "/api/payment/**",
                                "/api/patient/create",
                                "/api/patient/get/**",
                                "/api/appointments/doctor/**",
                                "/api/appointments/patient/**",
                                "/api/doctor/user/**",
                                "/api/services/inactive/**",
                                "/api/chatbot/message",
                                "/api/appointment/status/**",
                                "/api/services/doctor/addservice",
                                "/api/services/create",
                                "/api/services/doctor/updateservice",
                                "/api/schedules/doctor/updateschedule",
                                "/api/doctor/service/**",
                                "/api/feedback/**",
                                "/api/schedules/doctor/updateschedule",
                                "/api/services/**",
                                "api/doctor/**",
                                "/api/prescription/mail",
                                "/api/prescription/mail",
                                "/api/doctor/search",
                                "/api/services/search",
                                "/api/patient/get/**",
                                "/api/services/search",
                                "/api/v1/auth/changerole",
                                "/api/v1/auth/forgetpassword",
                                "/api/v1/auth/oauth2/success",
                                "/api/schedules/doctorschedules/**").permitAll()

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // --- Private Endpoints: ADMIN only ---
                        .requestMatchers("/api/doctor/create").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/auth/users/all").hasRole("ADMIN")
                        .requestMatchers("/uploads/**").permitAll()
                        // --- Private Endpoints: PATIENT or ADMIN ---
                        .requestMatchers("/api/patient/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()

                        // --- Private Endpoints: DOCTOR or ADMIN ---

                        // --- Any other requests ---
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2SuccessHandler)
                        .failureUrl("/login?error")
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        // Tuỳ chọn: set serializer để đảm bảo dữ liệu lưu/đọc đúng định dạng
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        return template;
    }

}