package dabs.DABS.service;

import dabs.DABS.model.request.OTP;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.security.SecureRandom;

@Service
public class MailSenderService {

    private static final String OTP_EMAIL_SUBJECT = "Mã OTP của bạn";

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public MailSenderService(JavaMailSender emailSender, TemplateEngine templateEngine) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
    }

    // Tạo mã OTP ngẫu nhiên gồm 6 chữ số
    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    // Gửi OTP qua email và trả về mã OTP
    public String sendOtpAndReturn(OTP recipientEmail) throws MessagingException {
        // Tạo mã OTP
        String otp = generateOtp();

        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("otp", otp);  // Thêm giá trị OTP vào context

        // Tạo nội dung email từ template
        String emailContent = templateEngine.process("OTPtemplate", context);

        // Cấu hình email
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("anhoa1794@gmail.com");
        helper.setTo(recipientEmail.getEmail());
        helper.setSubject(OTP_EMAIL_SUBJECT);
        helper.setText(emailContent, true);  // true = HTML content

        // Gửi email
        emailSender.send(mimeMessage);
        System.out.println("Đã gửi OTP: " + otp + " đến email: " + recipientEmail.getEmail());

        // Trả về mã OTP để dùng tiếp (ví dụ lưu vào database hoặc gửi về frontend nếu cần)
        return otp;
    }
}

