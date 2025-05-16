package dabs.DABS.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiIntegrationService {
//    @Value(("${gemini.api.url}"))
//    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String apiKey;
    private final WebClient webClient;
    public GeminiIntegrationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
    }

    public String analyzeSymptoms(String symptomsText) {
        String prompt = "Tôi có các triệu chứng sau: " + symptomsText +
                ". Bạn có thể gợi ý chuyên khoa phù hợp để tôi đi khám và một số thông tin liên quan không?";

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        try {
            String response = this.webClient.post()
                    .uri("/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            String adviceText = root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
            return adviceText;

        } catch (WebClientResponseException ex) {
            System.err.println("Status: " + ex.getStatusCode());
            System.err.println("Response Body: " + ex.getResponseBodyAsString());
            ex.printStackTrace();
            return "Xin lỗi, tôi không thể kết nối đến hệ thống phân tích triệu chứng (Gemini).";
        } catch (Exception ex) {
            ex.printStackTrace();
            return "Xin lỗi, hiện tại tôi không thể phân tích triệu chứng. Vui lòng thử lại sau.";
        }

    }
    public Optional<String> extractSpecialty(String geminiResponse) {
        // Ví dụ tìm cụm "chuyên khoa XXX"
        Pattern pattern = Pattern.compile("chuyên khoa ([\\p{L}\\s]+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(geminiResponse);
        if (matcher.find()) {
            return Optional.of(matcher.group(1).trim());
        }
        return Optional.empty();
    }
}
