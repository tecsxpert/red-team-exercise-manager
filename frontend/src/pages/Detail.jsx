import { useParams, useNavigate } from "react-router-dom";
import { getExercises, deleteExercise } from "../services/exerciseService";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    const data = await getExercises();
    const found = data.find((item) => item.id == id);
    setExercise(found);
  };

  const handleDelete = async () => {
    await deleteExercise(id);
    navigate("/dashboard");
  };

  if (!exercise) return <p className="p-6">Loading...</p>;

  const score =
    exercise.priority?.toUpperCase() === "HIGH"
      ? 95
      : exercise.priority?.toUpperCase() === "MEDIUM"
      ? 70
      : 40;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>

        <p className="mb-4 text-gray-600">{exercise.description}</p>

        <p className="mb-2">
          Status:
          <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded">
            {exercise.status}
          </span>
        </p>

        <p className="mb-2">
          Priority:
          <span className="ml-2 px-2 py-1 bg-red-500 text-white rounded">
            {exercise.priority}
          </span>
        </p>

        <p className="mb-6">
          Risk Score:
          <span className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full">
            {score}
          </span>
        </p>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default Detail;