package dabs.DABS.service;

import dabs.DABS.NLU.IntentRecognizer;
import dabs.DABS.model.DTO.DoctorRecommendation;
import dabs.DABS.model.Response.ChatMessageResponse;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.ChatMessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    private static final Map<String, Long> specialtyToServiceIdMap = Map.of(
        "da liễu", 1L,
        "nội thần kinh", 2L,
        "tim mạch", 3L,
        "tai mũi họng", 4L
    );

    @Autowired
    private IntentRecognizer intentRecognizer;

    @Autowired
    private GeminiIntegrationService geminiIntegrationService;

    @Autowired
    private DoctorService DoctorService;

    public ChatMessageResponse handleMessage(ChatMessageRequest request) {
        String userMessage = request.getMessage();
        IntentRecognizer.Intent intent = intentRecognizer.recognize(userMessage);

        ChatMessageResponse response = new ChatMessageResponse();

        switch (intent) {
            case BOOKING_GUIDE:
                response.setMessage("Bạn có thể đặt lịch bằng cách chọn bác sĩ, chọn thời gian và điền thông tin cá nhân. Bạn cần mình hướng dẫn cụ thể bước nào?");
                break;
            case SYMPTOM_ANALYSIS:
                if (userMessage.length() < 20) { // quá ngắn, không đủ mô tả triệu chứng
                    response.setMessage("Vui lòng mô tả các triệu chứng bạn đang gặp. Ví dụ: 'Tôi bị đau đầu, chóng mặt trong 3 ngày qua...'");
                } else {
                    String geminiResponse = geminiIntegrationService.analyzeSymptoms(userMessage);
                    response.setMessage("Phân tích từ AI:\n" + geminiResponse);
                    geminiIntegrationService.extractSpecialty(geminiResponse).ifPresent(specialty -> {
                        Long serviceId = specialtyToServiceIdMap.get(specialty);
                        List<DoctorRecommendation> doctors = null;
                        if (serviceId != null) {
                            ResponseEntity<ResponseData<List<dabs.DABS.model.DTO.DoctorDTO>>> responseEntity = DoctorService.getDoctorByServiceId(serviceId);
                            if (responseEntity.getBody() != null && responseEntity.getBody().getData() != null) {
                                doctors = responseEntity.getBody().getData().stream()
                                    .map(dto -> new DoctorRecommendation(
                                        dto.getFullName(),
                                        dto.getSpecialization(),
                                        null
                                    ))
                                    .toList();
                            }
                        }
                        response.setRecommendations(doctors);
                    });

                }
                break;
            case DOCTOR_LOOKUP:
                response.setMessage("Bạn muốn tìm bác sĩ thuộc chuyên khoa nào? Ví dụ: da liễu, nội thần kinh...");
                break;
            case GENERAL_QUESTION:
                response.setMessage("Bạn có thể hỏi mình về hủy lịch, thanh toán, hoặc chính sách bảo hiểm. Bạn muốn biết điều gì?");
                break;
            case UNKNOWN:
            default:
                response.setMessage("Mình chưa hiểu rõ câu hỏi của bạn. Bạn có thể diễn đạt lại hoặc chọn một trong các chức năng: đặt lịch, tư vấn triệu chứng, tìm bác sĩ.");
                break;
        }

        return response;
    }
}
