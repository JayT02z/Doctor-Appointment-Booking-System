package dabs.DABS.controller;


import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.Enum.Status;
import dabs.DABS.model.DTO.PaymentDTO;
import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.PaymentForm;
import dabs.DABS.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getAllPatients() {
        return paymentService.getallPayment();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<ResponseData<Payment>> getPatientById(@PathVariable("id") Long id) {
//        return paymentService.findByAppointment(id);
//    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getPatientById(@PathVariable Long id) {
        return paymentService.getpaymentBypatient(id);
    }

    @PostMapping("/add")
    public ResponseEntity<ResponseData<PaymentDTO>> addPayment(@RequestBody PaymentForm payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/confirmpayment")
    public ResponseEntity<ResponseData<Payment>> confirmPayment(@RequestBody Long paymentId, PaymentStatus status) {
        return paymentService.updatePayment(paymentId, status);
    }
}
