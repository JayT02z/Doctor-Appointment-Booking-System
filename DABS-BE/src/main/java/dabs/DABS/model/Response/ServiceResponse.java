package dabs.DABS.model.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean isActive;
}
