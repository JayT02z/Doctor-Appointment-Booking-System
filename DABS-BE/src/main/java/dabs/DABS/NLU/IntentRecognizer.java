package dabs.DABS.NLU;

import org.springframework.stereotype.Component;

@Component
public class IntentRecognizer {
    public  enum Intent {
        SYMPTOM_ANALYSIS, // Tư vấn triệu chứng
        BOOKING_GUIDE,  // Hướng dẫn đặt lịch
        DOCTOR_LOOKUP, // Tìm bác sĩ
        GENERAL_QUESTION, // Câu hỏi chung
        UNKNOWN
    }
    public Intent recognize(String message) {
        String lower = message.toLowerCase();

        if (lower.contains("triệu chứng") || lower.contains("tôi bị") || lower.contains("đau") || lower.contains("sốt") || lower.contains("mệt")) {
            return Intent.SYMPTOM_ANALYSIS;
        } else if (lower.contains("đặt lịch") || lower.contains("cách đặt") || lower.contains("làm sao để đặt")) {
            return Intent.BOOKING_GUIDE;
        } else if (lower.contains("bác sĩ") || lower.contains("chuyên khoa")) {
            return Intent.DOCTOR_LOOKUP;
        } else if (lower.contains("bảo hiểm") || lower.contains("thanh toán")) {
            return Intent.GENERAL_QUESTION;
        } else {
            return Intent.UNKNOWN;
        }
    }
}
