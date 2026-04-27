import { useEffect, useState } from "react";
import {
  getExercises,
  addExercise,
  deleteExercise,
  updateExercise,
} from "../services/exerciseService";

function Dashboard() {
  const [exercises, setExercises] = useState([]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  const loadExercises = async () => {
    const data = await getExercises();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await updateExercise(form.id, form);
    } else {
      await addExercise(form);
    }

    loadExercises();

    setForm({
      id: null,
      title: "",
      description: "",
      status: "",
      priority: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteExercise(id);
    loadExercises();
  };

  const handleEdit = (ex) => {
    setForm(ex);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Red Team Manager
        </h1>

        <h2 className="text-lg font-semibold mb-2">
          {form.id ? "Edit Exercise" : "Add Exercise"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-3 mb-6">

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="priority"
            placeholder="Priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {form.id ? "Update" : "Add"}
          </button>

        </form>

        {/* TABLE */}
        <h2 className="text-lg font-semibold mb-2">
          Exercises List
        </h2>

        <table className="w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {exercises.map((ex) => (
              <tr key={ex.id} className="text-center border-t">
                <td className="p-2">{ex.id}</td>
                <td className="p-2">{ex.title}</td>
                <td className="p-2">{ex.status}</td>
                <td className="p-2">{ex.priority}</td>

                <td className="p-2 space-x-2">

                  <button
                    onClick={() => handleEdit(ex)}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ex.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Dashboard;