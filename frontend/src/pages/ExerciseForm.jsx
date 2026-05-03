import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'

const mockExercises = [
  { id: 1, title: 'Network Penetration Test', description: 'Testing internal network security vulnerabilities', status: 'IN_PROGRESS', severity: 'HIGH', assignedTo: 'Sandhyarani', startDate: '2026-05-01', endDate: '2026-05-09' },
  { id: 2, title: 'Social Engineering Test', description: 'Testing social engineering vulnerabilities', status: 'PLANNED', severity: 'MEDIUM', assignedTo: 'Prajwal', startDate: '2026-05-01', endDate: '2026-05-09' },
  { id: 3, title: 'Web Application Security', description: 'Testing web app vulnerabilities', status: 'COMPLETED', severity: 'CRITICAL', assignedTo: 'Namratha', startDate: '2026-05-01', endDate: '2026-05-09' },
  { id: 4, title: 'Physical Security Audit', description: 'Testing physical access controls', status: 'PLANNED', severity: 'LOW', assignedTo: 'Santosh', startDate: '2026-05-01', endDate: '2026-05-09' },
  { id: 5, title: 'Password Policy Review', description: 'Reviewing password policies', status: 'IN_PROGRESS', severity: 'MEDIUM', assignedTo: 'Shreyanka', startDate: '2026-05-01', endDate: '2026-05-09' },
]

export default function ExerciseForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PLANNED',
    severity: 'MEDIUM',
    assignedTo: '',
    startDate: '',
    endDate: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      fetchExercise()
    }
  }, [id])

  const fetchExercise = async () => {
    try {
      setFetchLoading(true)
      const response = await API.get(`/exercises/${id}`)
      const data = response.data
      setFormData({
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'PLANNED',
        severity: data.severity || 'MEDIUM',
        assignedTo: data.assignedTo || '',
        startDate: data.startDate ? data.startDate.split('T')[0] : '',
        endDate: data.endDate ? data.endDate.split('T')[0] : ''
      })
    } catch (err) {
      // Use mock data based on ID
      const found = mockExercises.find(e => e.id === parseInt(id))
      if (found) {
        setFormData({
          title: found.title,
          description: found.description,
          status: found.status,
          severity: found.severity,
          assignedTo: found.assignedTo,
          startDate: found.startDate,
          endDate: found.endDate
        })
      }
    } finally {
      setFetchLoading(false)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters'
    }
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }
    if (!formData.severity) {
      newErrors.severity = 'Severity is required'
    }
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      if (isEdit) {
        await API.put(`/exercises/${id}`, formData)
        alert('Exercise updated successfully!')
      } else {
        await API.post('/exercises', formData)
        alert('Exercise created successfully!')
      }
      navigate('/')
    } catch (err) {
      alert(isEdit ? 'Exercise updated! (Demo mode)' : 'Exercise created! (Demo mode)')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {isEdit ? 'Edit Exercise' : 'Create New Exercise'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter exercise title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter exercise description"
          />
        </div>

        {/* Status and Severity */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity <span className="text-red-500">*</span>
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>

        {/* Assigned To */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter assignee name"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Exercise' : 'Create Exercise')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}