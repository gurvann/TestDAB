import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface Endpoint {
  id: string
  label: string
  url: string
}

const ENDPOINTS: Endpoint[] = [
  { id: 'book', label: 'Books', url: 'http://localhost:5001/api/Book' },
  { id: 'user', label: 'Users', url: 'http://localhost:5001/api/User' },
  { id: 'author', label: 'Authors', url: 'http://localhost:5001/api/Author' },
  { id: 'genre', label: 'Genres', url: 'http://localhost:5001/api/Genre' },
]

export default function ButtonGroup({
  onFetch,
}: {
  onFetch?: (data: any) => void
}) {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [jsonData, setJsonData] = useState<any>(null)

  const handleFetch = async (endpoint: Endpoint) => {
    setActiveEndpoint(endpoint)
    setError(null)
    setLoading(true)
    setJsonData(null)
    
    try {
      const response = await fetch(endpoint.url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setJsonData(data)
      if (onFetch) {
        onFetch(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 mb-6">
        {ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.id}
            onClick={() => handleFetch(endpoint)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeEndpoint?.id === endpoint.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>{endpoint.label}</span>
          </button>
        ))}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading data...</p>
        </div>
      )}
      
      {jsonData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Preview:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto max-h-60">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
