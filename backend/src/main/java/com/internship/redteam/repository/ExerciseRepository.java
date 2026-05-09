package com.internship.redteam.repository;

import com.internship.redteam.entity.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    // Get all non-deleted exercises
    List<Exercise> findByIsDeletedFalse();

    // Get paginated non-deleted exercises
    Page<Exercise> findByIsDeletedFalse(Pageable pageable);

    // Find by ID and not deleted
    Optional<Exercise> findByIdAndIsDeletedFalse(Long id);

    // Search by title or description
    @Query("SELECT e FROM Exercise e WHERE e.isDeleted = false AND " +
           "(LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Exercise> searchExercises(@Param("query") String query);

    // Count by status
    long countByStatusAndIsDeletedFalse(String status);
}