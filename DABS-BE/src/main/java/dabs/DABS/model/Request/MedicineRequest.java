package dabs.DABS.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicineRequest {
    private String name;
    private String description;
    private String dosage;
}
