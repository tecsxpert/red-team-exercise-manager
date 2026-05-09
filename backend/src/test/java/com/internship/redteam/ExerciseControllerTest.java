package com.internship.redteam;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // Test 1 - GET all exercises returns 200
    @Test
    public void testGetAllExercises() throws Exception {
        mockMvc.perform(get("/exercises")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Test 2 - GET exercise by invalid ID returns 404
    @Test
    public void testGetExerciseByInvalidId() throws Exception {
        mockMvc.perform(get("/exercises/99999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    // Test 3 - POST create exercise returns 201
    @Test
    public void testCreateExercise() throws Exception {
        String json = """
                {
                    "title": "Test Exercise",
                    "description": "Test Description",
                    "status": "PLANNED",
                    "severity": "MEDIUM"
                }
                """;
        mockMvc.perform(post("/exercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated());
    }

    // Test 4 - POST with empty title returns 400
    @Test
    public void testCreateExerciseWithEmptyTitle() throws Exception {
        String json = """
                {
                    "title": "",
                    "status": "PLANNED"
                }
                """;
        mockMvc.perform(post("/exercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());
    }

    // Test 5 - PUT update exercise returns 200
    @Test
    public void testUpdateExercise() throws Exception {
        String json = """
                {
                    "title": "Updated Exercise",
                    "status": "IN_PROGRESS",
                    "severity": "HIGH"
                }
                """;
        mockMvc.perform(put("/exercises/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
    }

    // Test 6 - DELETE exercise returns 200
    @Test
    public void testDeleteExercise() throws Exception {
        mockMvc.perform(delete("/exercises/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Test 7 - GET search exercises returns 200
    @Test
    public void testSearchExercises() throws Exception {
        mockMvc.perform(get("/exercises/search?q=test")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    // Test 8 - GET without auth returns 401
    @Test
    public void testGetExercisesWithoutAuth() throws Exception {
        mockMvc.perform(get("/exercises")
                .header("Authorization", ""))
                .andExpect(status().isUnauthorized());
    }

    // Test 9 - POST with invalid JSON returns 400
    @Test
    public void testCreateExerciseWithInvalidJson() throws Exception {
        mockMvc.perform(post("/exercises")
                .contentType(MediaType.APPLICATION_JSON)
                .content("invalid json"))
                .andExpect(status().isBadRequest());
    }

    // Test 10 - GET all users returns 200
    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}