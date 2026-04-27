package tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tool.entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}