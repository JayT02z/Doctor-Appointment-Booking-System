package dabs.DABS.service;

import dabs.DABS.Enum.AppointmentStatus;
import dabs.DABS.Enum.Message;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.PrescriptionDTO;
import dabs.DABS.model.Entity.Appointment;
import dabs.DABS.model.Entity.Prescription;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.OTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.security.SecureRandom;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Service
public class MailSenderService {

    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        return String.valueOf(100000 + random.nextInt(900000));
    }

    public ResponseEntity<ResponseData<String>> sendOtp(String email) throws MessagingException {
        String otp = generateOtp();

        // Lưu OTP vào Redis với thời gian sống 5 phút
        redisTemplate.opsForValue().set("otp:" + email, otp, 5, TimeUnit.MINUTES);

        // Gửi email OTP
        Context context = new Context();
        context.setVariable("otp", otp);
        String emailContent = templateEngine.process("OTPtemplate", context);

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Mã OTP của bạn");
        helper.setText(emailContent, true);
        emailSender.send(message);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                Message.OTP_REQUIRED.getMessage()
        ));
    }

    public ResponseEntity<ResponseData<Boolean>> verifyOtp(String email, String otpInput) {
        String key = "otp:" + email;
        String correctOtp = redisTemplate.opsForValue().get(key);
        Boolean validOTP = otpInput.equals(correctOtp);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                validOTP
        ));

    }

    public ResponseEntity<ResponseData<String>> resendOtp(String email) throws MessagingException {
        redisTemplate.delete("otp:" + email);
        sendOtp(email);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                Message.OTP_REQUIRED.getMessage()
        ));
    }

    public void sendAppointmentConfirmationEmail(String toEmail, Appointment appointment) throws MessagingException {
        // Format ngày và khung giờ
        String formattedDate = appointment.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.forLanguageTag("vi")));
        String formattedTime = appointment.getTimeSlot().getTimeRange();

        // Tạo nội dung Thymeleaf
        Context context = new Context();
        context.setVariable("messageTitle", "Lịch hẹn của bạn đã được xác nhận.");
        context.setVariable("appointmentDate", formattedDate);
        context.setVariable("appointmentTime", formattedTime);

        String htmlContent = templateEngine.process("ConfirmAppointmentTemplate", context);

        // Gửi email
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("Xác nhận lịch hẹn bác ");
        helper.setText(htmlContent, true); // true = HTML

        emailSender.send(message);
    }

    public void sendAppointmentCancellationEmail(String toEmail, Appointment appointment) throws MessagingException {
        // Format ngày và khung giờ
        String formattedDate = appointment.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.forLanguageTag("vi")));
        String formattedTime = appointment.getTimeSlot().getTimeRange();

        // Tạo nội dung Thymeleaf
        Context context = new Context();
        context.setVariable("messageTitle", "Lịch hẹn của bạn đã bị hủy.");
        context.setVariable("appointmentDate", formattedDate);
        context.setVariable("appointmentTime", formattedTime);

        String htmlContent = templateEngine.process("CancelAppointmentTemplate", context);

        // Gửi email
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("Thông báo hủy lịch hẹn");
        helper.setText(htmlContent, true); // true = HTML

        emailSender.send(message);
    }

    public ResponseEntity<ResponseData<Void>> sendPrescriptionEmail(PrescriptionDTO dto, String toEmail) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("Đơn thuốc từ bác sĩ " + dto.getDoctorName());
        helper.setFrom("your-email@gmail.com");

        Context context = new Context();
        context.setVariable("id", dto.getId());
        context.setVariable("dosage", dto.getDosage());
        context.setVariable("duration", dto.getDuration());
        context.setVariable("frequency", dto.getFrequency());
        context.setVariable("description", dto.getDescription());
        context.setVariable("doctorName", dto.getDoctorName());
        context.setVariable("patientName", dto.getPatientName());
        context.setVariable("medicineNames", dto.getMedicineNames());

        String htmlContent = templateEngine.process("PrescriptionTemplate.html", context);
        helper.setText(htmlContent, true);

        emailSender.send(message);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                null
        ));
    }
}


