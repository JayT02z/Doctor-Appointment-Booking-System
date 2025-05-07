package dabs.DABS.model.request;

import dabs.DABS.model.Entity.Schedule;
import dabs.DABS.model.Entity.ServiceEntity;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateServiceForm {
    @NotNull(message = "Không được để trống")
    private Long doctorId;

    @NotEmpty(message = "Danh sách lịch làm việc không được để trống")
    private List<Long> services;
}
