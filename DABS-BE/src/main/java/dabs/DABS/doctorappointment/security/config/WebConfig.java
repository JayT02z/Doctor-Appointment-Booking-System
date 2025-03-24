package dabs.DABS.doctorappointment.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // ✅ Cho phép tất cả API
                        .allowedOriginPatterns("*") // ✅ Sửa lỗi CORS (dùng allowedOriginPatterns)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                        .allowedHeaders("*")  // ✅ Cho phép mọi header
                        .allowCredentials(true);  // ✅ Nếu có dùng authentication (JWT, Cookie, v.v.)
            }
        };
    }
}
