package dabs.DABS.service;

import dabs.DABS.NLU.IntentRecognizer;
import dabs.DABS.model.DTO.DoctorRecommendation;
import dabs.DABS.model.Response.ChatMessageResponse;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.ChatMessageRequest;
import dabs.DABS.model.Entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    private static final Map<String, Long> specialtyToServiceIdMap = Map.of(
            "trị đau đầu", 1L,
            "thần kinh", 1L,
            "trị đau tim", 2L,
            "tim mạch", 2L,
            "da liễu", 3L
    );

    @Autowired
    private IntentRecognizer intentRecognizer;

    @Autowired
    private GeminiIntegrationService geminiIntegrationService;

    @Autowired
    private DoctorService DoctorService;

    @Autowired
    private ScheduleService scheduleService;

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
                    geminiIntegrationService.extractServiceFromAdvice(geminiResponse).ifPresent(rawServiceName -> {
                        System.out.println(">> Trích dịch vụ từ Gemini: " + rawServiceName);
                        // Sửa đoạn trích tên dịch vụ: chỉ lấy phần đầu tiên trước dấu chấm hoặc dấu phẩy để tránh lấy cả câu dài
                        String truncatedRawServiceName = rawServiceName.split("[.,]")[0];
                        String serviceName = normalizeServiceName(truncatedRawServiceName);
                        System.out.println(">> Tên dịch vụ sau chuẩn hóa: " + serviceName);
                        Long serviceId = specialtyToServiceIdMap.get(serviceName);
                        System.out.println(">> serviceId tra được: " + serviceId);
                        if (serviceId != null) {
                            ResponseEntity<ResponseData<List<dabs.DABS.model.DTO.DoctorDTO>>> responseEntity = DoctorService.getDoctorByServiceId(serviceId);
                            List<DoctorRecommendation> doctors = null;
                            if (responseEntity.getBody() != null && responseEntity.getBody().getData() != null) {
                                doctors = responseEntity.getBody().getData().stream()
                                    .filter(dto -> dto.getServices().stream().anyMatch(s -> s.getId().equals(serviceId)))
                                    .map(dto -> {
                                        List<String> availableTimes = List.of();
                                        ResponseEntity<ResponseData<List<Schedule>>> scheduleResponse = scheduleService.getSchedulesDoctor(dto.getId());
                                        List<Schedule> schedules = scheduleResponse.getBody() != null ? scheduleResponse.getBody().getData() : List.of();
                                        availableTimes = schedules.stream()
                                            .filter(Schedule::isAvailable)
                                            .flatMap(schedule -> schedule.getTimeSlot().stream()
                                                .map(slot -> schedule.getDate().toString() + " " + slot.toString()))
                                            .collect(Collectors.toList());
                                        if (availableTimes.isEmpty()) {
                                            availableTimes = List.of("Chưa có lịch trống");
                                        }
                                        return new DoctorRecommendation(
                                            dto.getFullName(),
                                            dto.getSpecialization(),
                                            availableTimes
                                        );
                                    })
                                    .toList();
                            }
                            response.setRecommendations(doctors);
                        } else {
                            // Fallback: lấy toàn bộ danh sách bác sĩ nếu không tìm được serviceId
                            ResponseEntity<ResponseData<List<dabs.DABS.model.DTO.DoctorDTO>>> responseEntity = DoctorService.getAllDoctors();
                            List<DoctorRecommendation> doctors = null;
                            if (responseEntity.getBody() != null && responseEntity.getBody().getData() != null) {
                                doctors = responseEntity.getBody().getData().stream()
                                        .map(dto -> {
                                            List<String> availableTimes = List.of();
                                            ResponseEntity<ResponseData<List<Schedule>>> scheduleResponse = scheduleService.getSchedulesDoctor(dto.getId());
                                            List<Schedule> schedules = scheduleResponse.getBody() != null ? scheduleResponse.getBody().getData() : List.of();
                                            availableTimes = schedules.stream()
                                                    .filter(Schedule::isAvailable)
                                                    .flatMap(schedule -> schedule.getTimeSlot().stream()
                                                        .map(slot -> schedule.getDate().toString() + " " + slot.toString()))
                                                    .collect(Collectors.toList());
                                            if (availableTimes.isEmpty()) {
                                                availableTimes = List.of("Chưa có lịch trống");
                                            }
                                            return new DoctorRecommendation(
                                                    dto.getFullName(),
                                                    dto.getSpecialization(),
                                                    availableTimes
                                            );
                                        })
                                        .toList();
                            }
                            response.setRecommendations(doctors);
                        }
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

    private String normalizeServiceName(String raw) {
        if (raw == null) {
            return null;
        }
        return raw.trim().toLowerCase();
    }
}
