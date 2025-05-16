package dabs.DABS.model.Response;

import dabs.DABS.model.DTO.DoctorRecommendation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponse {
    private String message;
    private List<DoctorRecommendation> recommendations;

}
