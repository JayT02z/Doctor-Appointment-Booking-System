package dabs.DABS.doctorappointment.security.config;

import dabs.DABS.Enum.Role;
import dabs.DABS.Enum.Status;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class AdminUserInitializer {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final Environment env;

    public AdminUserInitializer(UsersRepository usersRepository, PasswordEncoder passwordEncoder, Environment env) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.env = env;
    }

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            String adminUsername = env.getProperty("admin.user.username");
            String adminEmail = env.getProperty("admin.user.email");
            String adminPassword = env.getProperty("admin.user.password");

            if (adminUsername == null || adminEmail == null || adminPassword == null) {
                logger.warn("Admin user details are not configured in application.properties/yml. Skipping admin user creation.");
                return;
            }

            Optional<Users> existingAdmin = usersRepository.findByEmail(adminEmail);

            if (existingAdmin.isPresent()) {
                logger.info("Admin user with email {} already exists.", adminEmail);
            } else {
                logger.info("Creating initial Admin user with email: {}", adminEmail);

                Users adminUser = new Users();
                adminUser.setUsername(adminUsername);
                adminUser.setEmail(adminEmail);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));
                adminUser.setPhone("N/A");
                adminUser.setCreatedAt(LocalDateTime.now());
                adminUser.setStatus(Status.ACTIVE);
                adminUser.setRoles(Collections.singleton(Role.ADMIN));

                usersRepository.save(adminUser);
                logger.info("Admin user {} created successfully.", adminUsername);
            }
        };
    }
}
