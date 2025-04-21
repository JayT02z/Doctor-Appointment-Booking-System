package dabs.DABS.repository;

import dabs.DABS.model.Entity.Slug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlugRepository extends JpaRepository<Slug, String> {
}
