package dabs.DABS.service;

import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.AppointmentDTO;
import dabs.DABS.model.DTO.PaymentDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.PaymentForm;
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

    public ResponseEntity<ResponseData<PaymentDTO>> findByAppointmentById(Long paymentId){
        Payment payment = paymentRepository.findById(paymentId).get();
        PaymentDTO paymentDTO = new PaymentDTO(payment);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                paymentDTO
        ));
    }

//    public ResponseEntity<ResponseData<Payment>> findByAppointment(Long appointmentId) {
//        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
//        Payment payment = appointment.getPayment();
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
//                StatusApplication.SUCCESS.getCode(),
//                StatusApplication.SUCCESS.getMessage(),
//                payment
//        ));
//    }

    public ResponseEntity<ResponseData<List<PaymentDTO>>> getallPayment() {
        List<Payment> payments = paymentRepository.findAll();
        List<PaymentDTO> paymentDTOs = payments.stream()
                .map(PaymentDTO::new)
                .toList();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                paymentDTOs
        ));
    }

    public ResponseEntity<ResponseData<List<PaymentDTO>>> getpaymentBypatient(Long patientId) {
        List<Payment> payments = paymentRepository.findAllByPatientId(patientId);
        List<PaymentDTO> paymentDTOs = payments.stream()
                .map(PaymentDTO::new)
                .toList();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                paymentDTOs
        ));
    }

    public ResponseEntity<ResponseData<PaymentDTO>> addPayment(PaymentForm paymentForm) {
        Payment payment = new Payment();
        Appointment appointment = appointmentRepository.findById(paymentForm.getAppointmentId()).get();
        payment.setAppointment(appointment);
        payment.setPaymentMethod(paymentForm.getPaymentMethod());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setAmount(paymentForm.getAmount());
        paymentRepository.save(payment);

        PaymentDTO paymentDTO = new PaymentDTO(payment);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                paymentDTO
        ));

    }

    public ResponseEntity<ResponseData<Payment>> updatePayment(Long id,PaymentStatus status) {
        Payment payment = paymentRepository.findById(id).orElseThrow();
        payment.setStatus(status);
        paymentRepository.save(payment);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                payment
        ));
    }
}
