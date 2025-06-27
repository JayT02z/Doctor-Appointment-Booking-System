package dabs.DABS.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GooglePeopleService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public String fetchPrimaryPhone(String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> resp = restTemplate.exchange(
                "https://people.googleapis.com/v1/people/me?personFields=phoneNumbers",
                HttpMethod.GET,
                entity,
                String.class);
        JsonNode root = objectMapper.readTree(resp.getBody());
        JsonNode phoneArr = root.path("phoneNumbers");
        if (phoneArr.isArray() && phoneArr.size() > 0) {
            return phoneArr.get(0).path("value").asText();
        }
        return null;
    }
}
