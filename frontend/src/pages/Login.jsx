import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      // Try real backend first
      const response = await API.post('/auth/login', formData)
      login({ email: formData.email }, response.data.token)
      navigate('/')
    } catch (err) {
      // Fallback fake login for demo
      if (formData.email === 'admin@redteam.com' && 
          formData.password === 'admin123') {
        login(
          { name: 'Admin', email: 'admin@redteam.com' }, 
          'demo-token-123'
        )
        navigate('/')
      } else {
        setApiError('Invalid email or password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            Red Team Manager
          </h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
            {apiError}
          </div>
        )}

        {/* Form */}
        <div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Demo credentials hint */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <p className="text-sm text-gray-600">Email: admin@redteam.com</p>
            <p className="text-sm text-gray-600">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}