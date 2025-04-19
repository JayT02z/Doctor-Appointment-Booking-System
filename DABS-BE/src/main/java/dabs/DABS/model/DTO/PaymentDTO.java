package dabs.DABS.model.DTO;

import dabs.DABS.Enum.PaymentMethod;
import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.model.Entity.Payment;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PaymentDTO {
    private AppointmentDTO appointment;
    private Double amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;

    public PaymentDTO(Payment payment) {
        this.appointment = new AppointmentDTO(payment.getAppointment());
        this.amount = payment.getAmount();
        this.paymentMethod = payment.getPaymentMethod();
        this.status = payment.getStatus();
    }
}
