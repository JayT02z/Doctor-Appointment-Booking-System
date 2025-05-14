package dabs.DABS.controller;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.PaymentMethod;
import dabs.DABS.Enum.PaymentStatus;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.doctorappointment.security.config.VnPayConfig;
import dabs.DABS.model.DTO.PaymentDTO;
import dabs.DABS.model.DTO.TransactionStatusDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Payment;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.AppointmentStatusForm;
import dabs.DABS.model.request.PaymentForm;
import dabs.DABS.model.request.PaymentStatusForm;
import dabs.DABS.repository.AppointmentRepository;
import dabs.DABS.repository.PaymentRepository;
import dabs.DABS.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static dabs.DABS.doctorappointment.security.config.VnPayConfig.vnp_Command;
import static dabs.DABS.doctorappointment.security.config.VnPayConfig.vnp_Version;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VnPayConfig VnPayConfig;

    @GetMapping("")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getAllPatients() {
        return paymentService.getallPayment();
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<ResponseData<List<PaymentDTO>>> getPatientById(@PathVariable Long id) {
        return paymentService.getpaymentBypatient(id);
    }

    @PostMapping("/create_payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentForm paymentForm, HttpServletRequest request) throws UnsupportedEncodingException {

        Long appointmentId = paymentForm.getAppointmentId();
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        Long amount = (long) (appointment.getService().getPrice() * 100);
        String vnp_TxnRef = VnPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VnPayConfig.getIpAddress(request);
        String vnp_TmnCode = VnPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Locale", "vn");
//        if (bankCode != null && !bankCode.isEmpty()) {
//
//        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", "other"); // bắt buộc
        vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_ReturnUrl); // bắt buộc
//        vnp_Params.put("vnp_OrderType", orderType);

//        String locate = req.getParameter("language");
//        if (locate != null && !locate.isEmpty()) {
//            vnp_Params.put("vnp_Locale", locate);
//        } else {
//
//        }
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.UTF_8.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String secretKey = VnPayConfig.secretKey;
        String vnp_SecureHash = VnPayConfig.hmacSHA512(secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + queryUrl;

        Payment payment = new Payment();
        payment.setAppointment(appointment);
        payment.setPaymentMethod(paymentForm.getPaymentMethod());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setAmount(amount / 100.0);
        payment.setTxnRef(vnp_TxnRef);
        paymentRepository.save(payment);

        PaymentDTO paymentDTO = new PaymentDTO(paymentUrl, payment, PaymentStatus.PENDING);
        return ResponseEntity.ok(paymentDTO);
    }

    @GetMapping("/payment_info")
    public ResponseEntity<?> transaction(
            @RequestParam(value = "vnp_Amount") String amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_BankTranNo", required = false) String bankTranNo,
            @RequestParam(value = "vnp_CardType", required = false) String cardType,
            @RequestParam(value = "vnp_OrderInfo") String orderInfo,
            @RequestParam(value = "vnp_PayDate") String payDate,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TmnCode", required = false) String tmnCode,
            @RequestParam(value = "vnp_TransactionNo", required = false) String transactionNo,
            @RequestParam(value = "vnp_TransactionStatus", required = false) String transactionStatus,
            @RequestParam(value = "vnp_TxnRef") String txnRef,
            @RequestParam(value = "vnp_SecureHash", required = false) String secureHash
    ) {
        TransactionStatusDTO transactionStatusDTO = new TransactionStatusDTO();

        // Tìm Payment dựa trên txnRef
        Optional<Payment> optionalPayment = paymentRepository.findByTxnRef(txnRef);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();

            if ("00".equals(responseCode)) {
                payment.setStatus(PaymentStatus.PAID);
                try {
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
                    Date paymentDate = formatter.parse(payDate);
                    payment.setPaymentDate(paymentDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                paymentRepository.save(payment);

                transactionStatusDTO.setStatus("Ok");
                transactionStatusDTO.setMessage("Thanh toán thành công");
            } else {
                transactionStatusDTO.setStatus("No");
                transactionStatusDTO.setMessage("Thanh toán thất bại");
            }
        } else {
            transactionStatusDTO.setStatus("Error");
            transactionStatusDTO.setMessage("Không tìm thấy giao dịch");
        }

        // Populate all VNPAY fields
        transactionStatusDTO.setAmount(amount);
        transactionStatusDTO.setBankCode(bankCode);
        transactionStatusDTO.setBankTranNo(bankTranNo);
        transactionStatusDTO.setCardType(cardType);
        transactionStatusDTO.setOrderInfo(orderInfo);
        transactionStatusDTO.setPayDate(payDate);
        transactionStatusDTO.setResponseCode(responseCode);
        transactionStatusDTO.setTmnCode(tmnCode);
        transactionStatusDTO.setTransactionNo(transactionNo);
        transactionStatusDTO.setTransactionStatus(transactionStatus);
        transactionStatusDTO.setTxnRef(txnRef);
        transactionStatusDTO.setSecureHash(secureHash);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                transactionStatusDTO
        ));
    }


        @PostMapping("/add")
    public ResponseEntity<ResponseData<PaymentDTO>> addPayment(@Valid @RequestBody PaymentForm payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/confirmpayment/{id}")
    public ResponseEntity<ResponseData<PaymentDTO>> confirmPayment(@PathVariable Long id,@RequestBody PaymentStatusForm payment) {
        return paymentService.updatePayment(id,payment.getStatus());
    }
}
