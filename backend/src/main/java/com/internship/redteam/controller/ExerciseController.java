package com.internship.redteam.controller;

import com.internship.redteam.entity.Exercise;
import com.internship.redteam.service.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    // GET all exercises
    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    // GET paginated exercises
    @GetMapping("/paginated")
    public ResponseEntity<Page<Exercise>> getAllExercisesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(exerciseService.getAllExercisesPaginated(page, size));
    }

    // GET exercise by ID
    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(exerciseService.getExerciseById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST create exercise
    @PostMapping
    public ResponseEntity<Exercise> createExercise(@Valid @RequestBody Exercise exercise) {
        return ResponseEntity.status(201).body(exerciseService.createExercise(exercise));
    }

    // PUT update exercise
    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(
            @PathVariable Long id,
            @Valid @RequestBody Exercise exercise) {
        try {
            return ResponseEntity.ok(exerciseService.updateExercise(id, exercise));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE soft delete exercise
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteExercise(@PathVariable Long id) {
        try {
            exerciseService.deleteExercise(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Exercise deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET search exercises
    @GetMapping("/search")
    public ResponseEntity<List<Exercise>> searchExercises(@RequestParam String q) {
        return ResponseEntity.ok(exerciseService.searchExercises(q));
    }

    // GET stats for dashboard
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", exerciseService.getTotalCount());
        stats.put("planned", exerciseService.countByStatus("PLANNED"));
        stats.put("inProgress", exerciseService.countByStatus("IN_PROGRESS"));
        stats.put("completed", exerciseService.countByStatus("COMPLETED"));
        return ResponseEntity.ok(stats);
    }
}