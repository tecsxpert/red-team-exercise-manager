import api from "./api";

export const getExercises = async () => {
  const response = await api.get("/exercises");
  return response.data;
};

export const addExercise = async (exercise) => {
  const response = await api.post("/exercises", exercise);
  return response.data;
};

// ✅ DELETE
export const deleteExercise = async (id) => {
  await api.delete(`/exercises/${id}`);
};

// ✅ UPDATE
export const updateExercise = async (id, exercise) => {
  const response = await api.put(`/exercises/${id}`, exercise);
  return response.data;
};