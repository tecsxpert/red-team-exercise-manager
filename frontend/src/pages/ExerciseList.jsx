import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function ExerciseList() {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetchExercises()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters()
    }, 300)
    return () => clearTimeout(timer)
  }, [search, statusFilter, startDate, endDate, exercises])

  const fetchExercises = async () => {
    try {
      setLoading(true)
      const response = await API.get('/api/exercises')
      setExercises(response.data)
      setFiltered(response.data)
    } catch (err) {
      const mockData = [
        { id: 1, title: 'Network Penetration Test', description: 'Testing network security', status: 'IN_PROGRESS', severity: 'HIGH', assignedTo: 'Sandhyarani', createdAt: '2026-04-28T10:00:00' },
        { id: 2, title: 'Social Engineering Test', description: 'Testing social engineering vulnerabilities', status: 'PLANNED', severity: 'MEDIUM', assignedTo: 'Prajwal', createdAt: '2026-04-27T10:00:00' },
        { id: 3, title: 'Web Application Security', description: 'Testing web app vulnerabilities', status: 'COMPLETED', severity: 'CRITICAL', assignedTo: 'Namratha', createdAt: '2026-04-26T10:00:00' },
        { id: 4, title: 'Physical Security Audit', description: 'Testing physical access controls', status: 'PLANNED', severity: 'LOW', assignedTo: 'Santosh', createdAt: '2026-04-25T10:00:00' },
        { id: 5, title: 'Password Policy Review', description: 'Reviewing password policies', status: 'IN_PROGRESS', severity: 'MEDIUM', assignedTo: 'Shreyanka', createdAt: '2026-04-24T10:00:00' },
      ]
      setExercises(mockData)
      setFiltered(mockData)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...exercises]
    if (search.trim()) {
      result = result.filter(e =>
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase()) ||
        e.assignedTo?.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (statusFilter) {
      result = result.filter(e => e.status === statusFilter)
    }
    if (startDate) {
      result = result.filter(e => new Date(e.createdAt) >= new Date(startDate))
    }
    if (endDate) {
      result = result.filter(e => new Date(e.createdAt) <= new Date(endDate))
    }
    setFiltered(result)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
    setStartDate('')
    setEndDate('')
    setFiltered(exercises)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Status', 'Severity', 'Assigned To', 'Created At']
    const rows = filtered.map(e => [
      e.id, e.title, e.status, e.severity,
      e.assignedTo || '-',
      new Date(e.createdAt).toLocaleDateString()
    ])
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'red-team-exercises.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await API.delete(`/api/exercises/${id}`)
        fetchExercises()
      } catch (err) {
        alert('Delete failed — backend not connected')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Red Team Exercises</h2>
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            📥 Export CSV
          </button>
          <button onClick={() => navigate('/create')} className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">
            + New Exercise
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Statuses</option>
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button onClick={clearFilters} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
            Clear Filters
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-3">Showing {filtered.length} of {exercises.length} exercises</p>

      {filtered.length === 0 ? (
        <div className="text-center p-8 text-gray-500 bg-white rounded-lg shadow">
          <p className="text-xl">No exercises found</p>
          <p className="mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Severity</th>
                <th className="px-6 py-3 text-left">Assigned To</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exercise, index) => (
                <tr key={exercise.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium">{exercise.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${exercise.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        exercise.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'}`}>
                      {exercise.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${exercise.severity === 'HIGH' || exercise.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        exercise.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {exercise.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">{exercise.assignedTo || '-'}</td>
                  <td className="px-6 py-4">{new Date(exercise.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => navigate(`/detail/${exercise.id}`)} className="text-green-600 hover:text-green-800 mr-3">View</button>
                    <button onClick={() => navigate(`/edit/${exercise.id}`)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button onClick={() => handleDelete(exercise.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}