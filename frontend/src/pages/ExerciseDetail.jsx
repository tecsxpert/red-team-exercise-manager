import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AiPanel from '../components/AiPanel'

export default function ExerciseDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExercise()
  }, [id])

  const fetchExercise = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8081/api/exercises/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setExercise(data)
    } catch (err) {
      console.log('Error:', err)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8081/api/exercises/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          alert('Exercise deleted successfully!')
          navigate('/')
        }
      } catch (err) {
        alert('Failed to delete exercise')
      }
    }
  }

  const getScoreBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border border-red-300'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border border-orange-300'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
      case 'LOW': return 'bg-green-100 text-green-800 border border-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'PLANNED': return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  if (!exercise) return null

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Exercise Details</h2>
        <button onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-gray-800">{exercise.title}</h3>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBadge(exercise.severity)}`}>
              {exercise.severity}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(exercise.status)}`}>
              {exercise.status}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
          <p className="text-gray-700">{exercise.description || 'No description provided'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Assigned To</p>
            <p className="text-gray-700">{exercise.assignedTo || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="text-gray-700">
              {exercise.createdAt ? new Date(exercise.createdAt).toLocaleDateString() : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-gray-700">
              {exercise.startDate ? new Date(exercise.startDate).toLocaleDateString() : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">End Date</p>
            <p className="text-gray-700">
              {exercise.endDate ? new Date(exercise.endDate).toLocaleDateString() : '-'}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate(`/edit/${id}`)}
            className="flex-1 py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700">
            Edit Exercise
          </button>
          <button onClick={handleDelete}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Exercise
          </button>
        </div>
      </div>

      <AiPanel exerciseId={id} exerciseTitle={exercise.title} />
    </div>
  )
}
