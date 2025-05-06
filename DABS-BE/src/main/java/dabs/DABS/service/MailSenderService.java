package dabs.DABS.service;

import dabs.DABS.Enum.Message;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.PrescriptionDTO;
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


}

