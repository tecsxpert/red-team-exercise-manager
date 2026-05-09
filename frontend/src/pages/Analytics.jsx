import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import API from '../services/api'

const COLORS = ['#1B4F8A', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6']

export default function Analytics() {
  const [exercises, setExercises] = useState([])
  const [period, setPeriod] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    try {
      setLoading(true)
      const response = await API.get('/api/exercises')
      setExercises(response.data)
    } catch (err) {
      // Mock data
      setExercises([
        { id: 1, title: 'Network Penetration Test', status: 'IN_PROGRESS', severity: 'HIGH', assignedTo: 'Sandhyarani', createdAt: '2026-04-28T10:00:00' },
        { id: 2, title: 'Social Engineering Test', status: 'PLANNED', severity: 'MEDIUM', assignedTo: 'Prajwal', createdAt: '2026-04-27T10:00:00' },
        { id: 3, title: 'Web Application Security', status: 'COMPLETED', severity: 'CRITICAL', assignedTo: 'Namratha', createdAt: '2026-04-26T10:00:00' },
        { id: 4, title: 'Physical Security Audit', status: 'PLANNED', severity: 'LOW', assignedTo: 'Santosh', createdAt: '2026-04-25T10:00:00' },
        { id: 5, title: 'Password Policy Review', status: 'IN_PROGRESS', severity: 'MEDIUM', assignedTo: 'Shreyanka', createdAt: '2026-04-24T10:00:00' },
        { id: 6, title: 'Firewall Configuration Test', status: 'COMPLETED', severity: 'HIGH', assignedTo: 'Sandhyarani', createdAt: '2026-04-23T10:00:00' },
        { id: 7, title: 'Database Security Audit', status: 'PLANNED', severity: 'CRITICAL', assignedTo: 'Prajwal', createdAt: '2026-04-22T10:00:00' },
        { id: 8, title: 'API Security Test', status: 'IN_PROGRESS', severity: 'HIGH', assignedTo: 'Namratha', createdAt: '2026-04-21T10:00:00' },
        { id: 9, title: 'Cloud Security Review', status: 'COMPLETED', severity: 'MEDIUM', assignedTo: 'Santosh', createdAt: '2026-04-20T10:00:00' },
        { id: 10, title: 'Mobile App Security', status: 'PLANNED', severity: 'LOW', assignedTo: 'Shreyanka', createdAt: '2026-04-19T10:00:00' },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Filter by period
  const getFilteredData = () => {
    const now = new Date()
    if (period === 'week') {
      const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
      return exercises.filter(e => new Date(e.createdAt) >= weekAgo)
    } else if (period === 'month') {
      const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
      return exercises.filter(e => new Date(e.createdAt) >= monthAgo)
    }
    return exercises
  }

  const filtered = getFilteredData()

  // Status data
  const statusData = [
    { name: 'Planned', value: filtered.filter(e => e.status === 'PLANNED').length },
    { name: 'In Progress', value: filtered.filter(e => e.status === 'IN_PROGRESS').length },
    { name: 'Completed', value: filtered.filter(e => e.status === 'COMPLETED').length },
    { name: 'Cancelled', value: filtered.filter(e => e.status === 'CANCELLED').length },
  ].filter(d => d.value > 0)

  // Severity data
  const severityData = [
    { name: 'Critical', value: filtered.filter(e => e.severity === 'CRITICAL').length },
    { name: 'High', value: filtered.filter(e => e.severity === 'HIGH').length },
    { name: 'Medium', value: filtered.filter(e => e.severity === 'MEDIUM').length },
    { name: 'Low', value: filtered.filter(e => e.severity === 'LOW').length },
  ].filter(d => d.value > 0)

  // Assignee data
  const assigneeMap = {}
  filtered.forEach(e => {
    if (e.assignedTo) {
      assigneeMap[e.assignedTo] = (assigneeMap[e.assignedTo] || 0) + 1
    }
  })
  const assigneeData = Object.entries(assigneeMap).map(([name, value]) => ({ name, value }))

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Analytics</h2>

        {/* Period Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'week'
                ? 'bg-blue-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'month'
                ? 'bg-blue-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setPeriod('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === 'all'
                ? 'bg-blue-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-800">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-blue-800">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-500">
            {filtered.filter(e => e.status === 'COMPLETED').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-400">
          <p className="text-gray-500 text-sm">Critical</p>
          <p className="text-2xl font-bold text-red-500">
            {filtered.filter(e => e.severity === 'CRITICAL').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-yellow-500">
            {filtered.filter(e => e.status === 'IN_PROGRESS').length}
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Status Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">By Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1B4F8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">By Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assignee Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Exercises by Team Member
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={assigneeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}