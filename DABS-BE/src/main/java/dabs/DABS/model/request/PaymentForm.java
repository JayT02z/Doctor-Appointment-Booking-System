package dabs.DABS.model.request;

import dabs.DABS.Enum.PaymentMethod;
import dabs.DABS.Enum.PaymentStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentForm {

    @NotNull(message = "Appointment ID không được để trống")
    private Long appointmentId;

    @NotNull(message = "Số tiền không được để trống")
    @Min(value = 0, message = "Số tiền phải lớn hơn hoặc bằng 0")
    private Double amount;

    @NotNull(message = "Phương thức thanh toán không được để trống")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Trạng thái thanh toán không được để trống")
    private PaymentStatus status;
}
