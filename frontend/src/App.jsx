import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ExerciseList from './pages/ExerciseList'
import ExerciseForm from './pages/ExerciseForm'
import ExerciseDetail from './pages/ExerciseDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import FileUpload from './pages/FileUpload'
import Analytics from './pages/Analytics'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => { navigate('/'); setMenuOpen(false) }}
        >
          Red Team Manager
        </h1>

        {/* Hamburger Menu Button - shows on mobile */}
        {token && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden px-2 py-1 bg-blue-700 rounded"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Desktop Menu - hidden on mobile */}
        {token && (
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm"
            >
              Exercises
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm"
            >
              Analytics
            </button>
            <button
              onClick={() => navigate('/upload')}
              className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm"
            >
              Upload
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 bg-white text-blue-800 rounded hover:bg-gray-100 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu - shows when hamburger clicked */}
      {token && menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2">
          <button
            onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm text-left"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => { navigate('/'); setMenuOpen(false) }}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm text-left"
          >
            📋 Exercises
          </button>
          <button
            onClick={() => { navigate('/analytics'); setMenuOpen(false) }}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm text-left"
          >
            📈 Analytics
          </button>
          <button
            onClick={() => { navigate('/upload'); setMenuOpen(false) }}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm text-left"
          >
            📤 Upload
          </button>
          <button
            onClick={() => { logout(); setMenuOpen(false) }}
            className="px-3 py-2 bg-white text-blue-800 rounded hover:bg-gray-100 text-sm text-left font-medium"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <ExerciseList />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <ExerciseForm />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <ExerciseForm />
              </ProtectedRoute>
            } />
            <Route path="/detail/:id" element={
              <ProtectedRoute>
                <ExerciseDetail />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <FileUpload />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App