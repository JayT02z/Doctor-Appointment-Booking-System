package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.ServiceEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean isActive;

    public static ServiceDTO fromEntity(ServiceEntity service) {
        return ServiceDTO.builder()
                .id(service.getId())
                .name(service.getName())
                .description(service.getDescription())
                .price(service.getPrice())
                .isActive(service.getIsActive())
                .build();
    }
}
