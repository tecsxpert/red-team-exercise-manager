package com.internship.redteam.service;

import com.internship.redteam.entity.Exercise;
import com.internship.redteam.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    // Get all exercises
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findByIsDeletedFalse();
    }

    // Get paginated exercises
    public Page<Exercise> getAllExercisesPaginated(int page, int size) {
        return exerciseRepository.findByIsDeletedFalse(PageRequest.of(page, size));
    }

    // Get exercise by ID
    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
    }

    // Create exercise
    public Exercise createExercise(Exercise exercise) {
        exercise.setIsDeleted(false);
        return exerciseRepository.save(exercise);
    }

    // Update exercise
    public Exercise updateExercise(Long id, Exercise exerciseDetails) {
        Exercise exercise = getExerciseById(id);
        exercise.setTitle(exerciseDetails.getTitle());
        exercise.setDescription(exerciseDetails.getDescription());
        exercise.setStatus(exerciseDetails.getStatus());
        exercise.setSeverity(exerciseDetails.getSeverity());
        exercise.setAssignedTo(exerciseDetails.getAssignedTo());
        exercise.setStartDate(exerciseDetails.getStartDate());
        exercise.setEndDate(exerciseDetails.getEndDate());
        return exerciseRepository.save(exercise);
    }

    // Soft delete exercise
    public void deleteExercise(Long id) {
        Exercise exercise = getExerciseById(id);
        exercise.setIsDeleted(true);
        exerciseRepository.save(exercise);
    }

    // Search exercises
    public List<Exercise> searchExercises(String query) {
        return exerciseRepository.searchExercises(query);
    }

    // Get stats
    public long countByStatus(String status) {
        return exerciseRepository.countByStatusAndIsDeletedFalse(status);
    }

    // Get total count
    public long getTotalCount() {
        return exerciseRepository.findByIsDeletedFalse().size();
    }
}