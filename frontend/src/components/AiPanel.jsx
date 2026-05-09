import { useState } from 'react'

const AI_URL = 'http://localhost:5000'

export default function AiPanel({ exerciseId, exerciseTitle }) {
  const [aiDescription, setAiDescription] = useState('')
  const [aiRecommendation, setAiRecommendation] = useState('')
  const [aiReport, setAiReport] = useState('')
  const [loadingDesc, setLoadingDesc] = useState(false)
  const [loadingRec, setLoadingRec] = useState(false)
  const [loadingReport, setLoadingReport] = useState(false)

  const getDescription = async () => {
    try {
      setLoadingDesc(true)
      setAiDescription('')
      const response = await fetch(`${AI_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Describe this red team exercise: ${exerciseTitle}` })
      })
      const data = await response.json()
      setAiDescription(data.report || 'No description available')
    } catch (err) {
      setAiDescription('AI service not connected. Please start the AI service on port 5000.')
    } finally {
      setLoadingDesc(false)
    }
  }

  const getRecommendation = async () => {
    try {
      setLoadingRec(true)
      setAiRecommendation('')
      const response = await fetch(`${AI_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Provide 3 security recommendations for this red team exercise: ${exerciseTitle}` })
      })
      const data = await response.json()
      setAiRecommendation(data.report || 'No recommendations available')
    } catch (err) {
      setAiRecommendation('AI service not connected. Please start the AI service on port 5000.')
    } finally {
      setLoadingRec(false)
    }
  }

  const generateReport = async () => {
    try {
      setLoadingReport(true)
      setAiReport('')
      const response = await fetch(`${AI_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Generate a full security report for this red team exercise: ${exerciseTitle}` })
      })
      const data = await response.json()
      setAiReport(data.report || 'No report available')
    } catch (err) {
      setAiReport('AI service not connected. Please start the AI service on port 5000.')
    } finally {
      setLoadingReport(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-lg font-bold text-blue-800 mb-4">
        🤖 AI Assistant
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={getDescription}
          disabled={loadingDesc}
          className="py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingDesc ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '🔍 Describe'}
        </button>

        <button
          onClick={getRecommendation}
          disabled={loadingRec}
          className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loadingRec ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '💡 Recommend'}
        </button>

        <button
          onClick={generateReport}
          disabled={loadingReport}
          className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loadingReport ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '📄 Generate Report'}
        </button>
      </div>

      {aiDescription && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-blue-800 mb-2">🔍 AI Description</p>
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiDescription}</p>
        </div>
      )}

      {aiRecommendation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-green-800 mb-2">💡 AI Recommendation</p>
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiRecommendation}</p>
        </div>
      )}

      {aiReport && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-purple-800 mb-2">📄 AI Report</p>
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiReport}</p>
        </div>
      )}
    </div>
  )
}
