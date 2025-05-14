package dabs.DABS.controller;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.model.DTO.PaymentDTO;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentStatusForm;
import dabs.DABS.model.request.PaymentForm;
import dabs.DABS.model.request.PaymentStatusForm;
import dabs.DABS.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getAllPatients() {
        return paymentService.getallPayment();
    }

    @GetMapping("/appointment/{id}")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getAppointmentById(@PathVariable Long id) {
        return paymentService.getpaymentByAppId(id);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getPatientById(@PathVariable Long id) {
        return paymentService.getPaymentbyPatientID(id);
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseData<PaymentDTO>> addPayment(@Valid @RequestBody PaymentForm payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/confirmpayment/{id}")
    public ResponseEntity<ResponseData<PaymentDTO>> confirmPayment(@PathVariable Long id,@RequestBody PaymentStatusForm payment) {
        return paymentService.updatePayment(id,payment.getStatus());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseData<PaymentDTO>> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentbyId(id);
    }
}
