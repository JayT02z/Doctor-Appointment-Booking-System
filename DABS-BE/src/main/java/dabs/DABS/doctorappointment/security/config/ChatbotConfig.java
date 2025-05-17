package dabs.DABS.doctorappointment.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class ChatbotConfig {
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public String getGeminiApiKey() {
        return geminiApiKey;
    }
}
