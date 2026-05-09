import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import API from '../services/api'

const COLORS = ['#1B4F8A', '#f59e0b', '#10b981', '#ef4444']

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    planned: 0,
    inProgress: 0,
    completed: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await API.get('/api/exercises')
      const exercises = response.data
      const total = exercises.length
      const planned = exercises.filter(e => e.status === 'PLANNED').length
      const inProgress = exercises.filter(e => e.status === 'IN_PROGRESS').length
      const completed = exercises.filter(e => e.status === 'COMPLETED').length
      setStats({ total, planned, inProgress, completed })
    } catch (err) {
      // Mock data when backend not ready
      setStats({
        total: 5,
        planned: 2,
        inProgress: 2,
        completed: 1
      })
    } finally {
      setLoading(false)
    }
  }

  const barData = [
    { name: 'Planned', value: stats.planned },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Completed', value: stats.completed },
  ]

  const pieData = [
    { name: 'Planned', value: stats.planned || 1 },
    { name: 'In Progress', value: stats.inProgress || 1 },
    { name: 'Completed', value: stats.completed || 1 },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Dashboard</h2>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-800">
          <p className="text-gray-500 text-sm">Total Exercises</p>
          <p className="text-3xl font-bold text-blue-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-500 text-sm">Planned</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.planned}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-blue-500">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Exercises by Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1B4F8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Quick Actions
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/create')}
            className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
          >
            + New Exercise
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            View All Exercises
          </button>
        </div>
      </div>
    </div>
  )
}