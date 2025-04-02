package dabs.DABS.model.request;

import dabs.DABS.model.Entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateScheduleRequest {
    private Long doctorId;
    private List<Schedule> schedules;
}
