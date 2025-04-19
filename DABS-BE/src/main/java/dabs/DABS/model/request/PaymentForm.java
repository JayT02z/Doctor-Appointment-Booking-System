package dabs.DABS.model.request;

import dabs.DABS.Enum.PaymentMethod;
import dabs.DABS.Enum.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentForm {
    private Long appointmentId;
    private Double amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
}
