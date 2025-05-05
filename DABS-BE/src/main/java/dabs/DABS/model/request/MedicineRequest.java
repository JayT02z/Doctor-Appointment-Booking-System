package dabs.DABS.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicineRequest {

    @NotBlank(message = "Tên thuốc không được để trống")
    @Size(max = 255, message = "Tên thuốc không được dài quá 255 ký tự")
    private String name;

    @Size(max = 2000, message = "Mô tả thuốc không được dài quá 2000 ký tự")
    private String description;

    @NotBlank(message = "Liều dùng không được để trống")
    @Size(max = 255, message = "Liều dùng không được dài quá 255 ký tự")
    private String dosage;
}
