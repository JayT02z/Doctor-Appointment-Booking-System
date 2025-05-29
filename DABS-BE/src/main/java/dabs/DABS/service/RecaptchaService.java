package dabs.DABS.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class RecaptchaService {
    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean verifyToken(String token) {
        String verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", recaptchaSecret);
        params.add("response", token);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(verifyUrl, request, Map.class);
        Map<String, Object> body = response.getBody();

        return body != null && Boolean.TRUE.equals(body.get("success"));
    }
}
