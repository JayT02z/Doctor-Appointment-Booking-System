package dabs.DABS.model.request;

import dabs.DABS.Enum.PaymentStatus;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentStatusForm {
    private PaymentStatus status;
}
