package dabs.DABS.repository;

import dabs.DABS.model.Entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByNameContainingIgnoreCase(String name);
}
