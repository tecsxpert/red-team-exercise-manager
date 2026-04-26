package tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tool.entity.Exercise;
import tool.repository.ExerciseRepository;

import java.util.List;

@RestController
@RequestMapping("/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    // GET
    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    // POST
    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Integer id) {
        exerciseRepository.deleteById(id);
    }

    // ✅ UPDATE (NEW)
    @PutMapping("/{id}")
    public Exercise updateExercise(@PathVariable Integer id, @RequestBody Exercise updatedExercise) {
        Exercise ex = exerciseRepository.findById(id).orElseThrow();

        ex.setTitle(updatedExercise.getTitle());
        ex.setDescription(updatedExercise.getDescription());
        ex.setStatus(updatedExercise.getStatus());
        ex.setPriority(updatedExercise.getPriority());

        return exerciseRepository.save(ex);
    }
}