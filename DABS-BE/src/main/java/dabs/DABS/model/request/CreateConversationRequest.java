package dabs.DABS.model.request;

import lombok.Data;
import java.util.List;

@Data
public class CreateConversationRequest {
    private List<Long> userIds;
    private List<String> roles;
    private String type;
}

