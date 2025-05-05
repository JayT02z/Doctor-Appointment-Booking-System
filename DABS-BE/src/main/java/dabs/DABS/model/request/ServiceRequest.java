package dabs.DABS.model.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ServiceRequest {

    @NotBlank(message = "Tên dịch vụ là bắt buộc")  // Đảm bảo tên dịch vụ không rỗng
    @Size(min = 3, max = 100, message = "Tên dịch vụ phải có độ dài từ 3 đến 100 ký tự")  // Đảm bảo độ dài hợp lý
    private String name;

    @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")  // Đảm bảo mô tả không quá 500 ký tự
    private String description;

    @NotNull(message = "Giá dịch vụ là bắt buộc")  // Đảm bảo giá không null
    @Positive(message = "Giá dịch vụ phải là giá trị dương")  // Đảm bảo giá trị dương
    private Double price;

    private Boolean isActive;

    @NotEmpty(message = "Ít nhất phải có một slug ID")  // Đảm bảo danh sách slugId không rỗng
    private List<String> slugIds;
}
