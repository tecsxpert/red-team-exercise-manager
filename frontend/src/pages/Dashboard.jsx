import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getExercises,
  addExercise,
  deleteExercise,
  updateExercise,
} from "../services/exerciseService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  const total = exercises.length;
const openCount = exercises.filter(
  (e) => e.status?.toUpperCase() === "OPEN"
).length;
const progressCount = exercises.filter(
  (e) => e.status?.toUpperCase() === "IN_PROGRESS"
).length;
const highCount = exercises.filter(
  (e) => e.priority?.toUpperCase() === "HIGH"
).length;

const chartData = [
  { name: "OPEN", count: openCount },
  { name: "IN_PROGRESS", count: progressCount },
  { name: "HIGH", count: highCount },
];

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

        {/* KPI Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">Total</h3>
    <p className="text-2xl font-bold">{total}</p>
  </div>

  <div className="bg-green-500 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">Open</h3>
    <p className="text-2xl font-bold">{openCount}</p>
  </div>

  <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">In Progress</h3>
    <p className="text-2xl font-bold">{progressCount}</p>
  </div>

  <div className="bg-red-500 text-white p-4 rounded-lg shadow">
    <h3 className="text-sm">High Priority</h3>
    <p className="text-2xl font-bold">{highCount}</p>
  </div>

</div>

{/* Chart */}
<div className="bg-white p-4 rounded-xl shadow mb-6">
  <h2 className="text-lg font-semibold mb-4">Exercise Stats</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  </ResponsiveContainer>
</div>

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

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
>
            <option value="">Select Status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 rounded"
>
            <option value="">Select Priority</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
           </select>

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
                <tr
                    key={ex.id}
                    className="text-center border-t hover:bg-gray-100 transition"
    >
                <td className="p-2">{ex.id}</td>
                <td className="p-2">{ex.title}</td>
                <td className="p-2">
            <span
                className={`px-2 py-1 rounded text-white text-sm ${
                ex.status?.toUpperCase() === "OPEN"
                    ? "bg-green-500"
                    : ex.status?.toUpperCase() === "IN_PROGRESS"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            >
                {ex.status}
            </span>
            </td>

                    <td className="p-2">
            <span
                className={`px-2 py-1 rounded text-white text-sm ${
                ex.priority?.toUpperCase() === "HIGH"
                    ? "bg-red-500"
                    : ex.priority?.toUpperCase() === "MEDIUM"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
            >
                {ex.priority}
            </span>
            </td>

                <td className="p-2 space-x-2">
                

                 <button
                    onClick={() => navigate(`/detail/${ex.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 shadow"
                 >
                    View
                 </button>

                  <button
                    onClick={() => handleEdit(ex)}
                    className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500 shadow"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ex.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 shadow"
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