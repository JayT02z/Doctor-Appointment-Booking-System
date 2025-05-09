package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Prescription;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PrescriptionDTO {
    private Long id;
    private int dosage;
    private int duration;
    private String frequency;
    private String description;
    private Long appointmentId;
    private String appointmentSummary;
    private Long doctorId;
    private String doctorName;
    private Long patientId;
    private String patientName;
    private List<String> medicineNames;

    public static PrescriptionDTO mapToDTO(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setDosage(prescription.getDosage());
        dto.setDuration(prescription.getDuration());
        dto.setFrequency(prescription.getFrequency().getDescription());
        dto.setDescription(prescription.getDescription());

        dto.setAppointmentId(prescription.getAppointment().getId());
        dto.setAppointmentSummary(prescription.getAppointment().toString());

        dto.setDoctorId(prescription.getDoctor().getId());
        dto.setDoctorName(prescription.getDoctor().getFullName());

        dto.setPatientId(prescription.getPatient().getId());
        dto.setPatientName(prescription.getPatient().getFullName());

        // Sửa chỗ này: giờ prescription chỉ có List<String> medicineNames
        dto.setMedicineNames(prescription.getMedicineNames());

        return dto;
    }
}

