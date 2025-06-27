package dabs.DABS.model.DTO;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ConversationDTO {
    private Long id;
    private String type;
    private List<ParticipantDto> participants;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @Data
    public static class ParticipantDto {
        private Long userId;
        private String role;
        private String userName;
    }
}

