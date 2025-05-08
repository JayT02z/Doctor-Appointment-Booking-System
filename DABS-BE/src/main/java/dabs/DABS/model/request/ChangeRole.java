package dabs.DABS.model.request;

import dabs.DABS.Enum.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
public class ChangeRole {
    private Long id;
    private Set<Role> role;
}
