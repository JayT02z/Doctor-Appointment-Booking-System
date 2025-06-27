package dabs.DABS.model.DTO;

import dabs.DABS.Enum.PaymentMethod;
import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.model.Entity.Payment;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@Setter
public class PaymentDTO implements Serializable {
    private final String url;
    private Long id;
    private AppointmentDTO appointment;
    private Double amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private String URL;
    private String txnRef;
    private LocalDateTime paymentDate;
    public PaymentDTO() {
        this.url = null; // bắt buộc gán vì 'final'
    }

//    public PaymentDTO(String url, Payment payment, PaymentStatus status) {
//        this.url = url;
//        this.id = payment.getId();
//        this.appointment = new AppointmentDTO(payment.getAppointment());
//        this.amount = payment.getAmount();
//        this.paymentMethod = payment.getPaymentMethod();
//        this.status = payment.getStatus();
//        this.status = status;
//    }
public PaymentDTO(String url, Payment payment, PaymentStatus status) {
    this.url = url;
    this.id = payment.getId();

    if (payment.getAppointment() != null) {
        this.appointment = new AppointmentDTO(payment.getAppointment());
    } else {
        this.appointment = null;
    }

    this.amount = payment.getAmount();
    this.paymentMethod = payment.getPaymentMethod();
    this.status = payment.getStatus(); // optional
    this.status = status; // override
    this.paymentDate = payment.getPaymentDate();
}
}
