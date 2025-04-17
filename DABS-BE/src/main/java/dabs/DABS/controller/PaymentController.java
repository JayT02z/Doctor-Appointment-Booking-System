package dabs.DABS.controller;


import dabs.DABS.model.Entity.Patient;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
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
    public ResponseEntity<ResponseData<List<Payment>>> getAllPatients() {
        return paymentService.getallPayment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<Payment>> getPatientById(@PathVariable("id") Long id) {
        return paymentService.findByAppointment(id);
    }
}
