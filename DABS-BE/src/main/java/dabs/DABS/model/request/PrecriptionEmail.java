package dabs.DABS.model.request;

import dabs.DABS.model.Entity.Prescription;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PrecriptionEmail {
    private String email;

    private Long prescriptionId;
}
