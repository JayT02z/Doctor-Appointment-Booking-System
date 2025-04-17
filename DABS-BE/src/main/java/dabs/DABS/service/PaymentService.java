package dabs.DABS.service;

import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    public ResponseEntity<ResponseData<Payment>> findByAppointmentById(Long paymentId){
        Payment payment = paymentRepository.findById(paymentId).get();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                payment
        ));
    }

    public ResponseEntity<ResponseData<Payment>> findByAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        Payment payment = appointment.getPayment();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                payment
        ));
    }

    public ResponseEntity<ResponseData<List<Payment>>> getallPayment() {
        List<Payment> payments = paymentRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                payments
        ));
    }
}
