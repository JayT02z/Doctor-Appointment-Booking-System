package dabs.DABS.model.DTO;

import dabs.DABS.model.Entity.Medicine;
import dabs.DABS.model.Entity.Prescription;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PrescriptionDTO {
    private String id;
    private int dosage;
    private int duration;
    private String frequency;
    private String description;
    private Long appointmentId;
    private String appointmentSummary; // Newly added field
    private Long doctorId;
    private String doctorName; // Newly added field
    private Long patientId;
    private String patientName; // Newly added field
    private List<String> medicineIds;
    private List<String> medicineNames; // Newly added field
    public static PrescriptionDTO mapToDTO(Prescription prescription) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(prescription.getId());
        dto.setDosage(prescription.getDosage());
        dto.setDuration(prescription.getDuration());
        dto.setFrequency(prescription.getFrequency().name());
        dto.setDescription(prescription.getDescription());

        dto.setAppointmentId(prescription.getAppointment().getId());
        dto.setAppointmentSummary(prescription.getAppointment().toString());

        dto.setDoctorId(prescription.getDoctor().getId());
//        dto.setDoctorName(prescription.getDoctor().getName());

        dto.setPatientId(prescription.getPatient().getId());
//        dto.setPatientName(prescription.getPatient().getName());

        dto.setMedicineIds(
                prescription.getMedicines().stream().map(Medicine::getId).toList()
        );

        dto.setMedicineNames(
                prescription.getMedicines().stream().map(Medicine::getName).toList()
        );

        return dto;
    }
}
