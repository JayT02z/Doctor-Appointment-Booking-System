package dabs.DABS.doctorappointment.security.config;

import dabs.DABS.doctorappointment.security.jwt.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    private final UserDetailsService customUserDetailService;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter, UserDetailsService customUserDetailService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.customUserDetailService = customUserDetailService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // --- Public Endpoints ---
                        .requestMatchers("/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/logout","/api/v1/auth/sendOTP","/api/v1/auth/verifyOTP","/api/v1/auth/resendOTP").permitAll()
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
                                "/api/appointment/status/**",
                                "/api/services/doctor/addservice",
                                "/api/services/create",
                                "/api/services/doctor/updateservice",
                                "/api/schedules/doctor/updateschedule",
                                "/api/doctor/service/**",
                                "/api/feedback/**",
                                "/api/prescription/mail",
                                "/api/doctor/search",
                                "/api/services/search",
                                "/api/v1/auth/changerole").permitAll()

                        // --- Private Endpoints: ADMIN only ---
                        .requestMatchers("/api/doctor/create").permitAll()
                        .requestMatchers("/api/services/all").hasRole("ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/auth/users/all").hasRole("ADMIN")

                        // --- Private Endpoints: PATIENT or ADMIN ---
                        .requestMatchers("/api/patient/**").hasAnyRole("PATIENT", "ADMIN")

                        // --- Private Endpoints: DOCTOR or ADMIN ---
                        .requestMatchers("/api/doctor/**").hasAnyRole("DOCTOR", "ADMIN")

                        // --- Any other requests ---
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
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
