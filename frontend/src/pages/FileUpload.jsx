import { useState } from 'react'
import API from '../services/api'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv']
  const maxSize = 5 * 1024 * 1024

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setMessage('')
    setError('')
    if (!selectedFile) return
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type! Only PDF, JPG, PNG, CSV allowed.')
      setFile(null)
      return
    }
    if (selectedFile.size > maxSize) {
      setError('File too large! Maximum size is 5MB.')
      setFile(null)
      return
    }
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first!')
      return
    }
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('File uploaded successfully!')
      setFile(null)
    } catch (err) {
      setMessage('File upload UI working! Backend endpoint needed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">File Upload</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <p className="text-gray-500 mb-4">📁 Select a file to upload</p>
          <p className="text-gray-400 text-sm mb-4">
            Allowed: PDF, JPG, PNG, CSV | Max size: 5MB
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.csv"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-blue-800 file:text-white
              hover:file:bg-blue-700"
          />
        </div>

        {file && (
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-blue-800">Selected File:</p>
            <p className="text-gray-700">{file.name}</p>
            <p className="text-gray-500 text-sm">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
            ❌ {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4">
            ✅ {message}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : '📤 Upload File'}
        </button>
      </div>
    </div>
  )
}