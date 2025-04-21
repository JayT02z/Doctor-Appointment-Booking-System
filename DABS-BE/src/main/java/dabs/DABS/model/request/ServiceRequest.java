package dabs.DABS.model.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ServiceRequest {
    private String name;
    private String description;
    private Double price;
    private Boolean isActive;
    private List<String> slugIds;
}
