import React, { useState } from 'react'
import ButtonGroup from './ButtonGroup'
import Table from './Table'

export default function App() {
  const [jsonData, setJsonData] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          JSON API Client
        </h1>
        
        <ButtonGroup onFetch={setJsonData} />
        <Table data={jsonData} />
      </div>
    </div>
  )
}
