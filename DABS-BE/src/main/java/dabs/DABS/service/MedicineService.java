package dabs.DABS.service;

import dabs.DABS.model.Entity.Medicine;
import dabs.DABS.model.request.MedicineRequest;
import dabs.DABS.repository.MedicineRepository;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.Response.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public ResponseEntity<ResponseData<Medicine>> createRequest(MedicineRequest request){
        Medicine medicine = new Medicine();

        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setDosage(request.getDosage());

        Medicine savedMedicine = medicineRepository.save(medicine);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            savedMedicine
        ));
    }

    public ResponseEntity<ResponseData<Medicine>> updateMedicine(String id, MedicineRequest request) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Medicine not found")
        );

        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setDosage(request.getDosage());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            updatedMedicine
        ));
    }

    public ResponseEntity<ResponseData<Void>> deleteMedicine(String id) {
        Medicine medicine = medicineRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Medicine not found")
        );

        medicineRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            null
        ));
    }

    public ResponseEntity<ResponseData<Medicine>> getMedicineById(String id) {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                medicine.orElse(null)
        ));
    }

    public ResponseEntity<ResponseData<List<Medicine>>> getAllMedicines() {
        List<Medicine> medicines = medicineRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            medicines
        ));
    }
}
