package dabs.DABS.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ServiceRequest {
    private String name;
    private String description;
    private Double price;
    private Boolean isActive;
}
