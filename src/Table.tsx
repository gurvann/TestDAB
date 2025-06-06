import React from 'react'

interface JsonData {
  [key: string]: any
}

export default function Table({ data }: { data: JsonData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available. Please select an endpoint from the button group above.</p>
      </div>
    )
  }

  // Extract column headers from the first item
  const columns = Object.keys(data[0] || {})
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row: JsonData, rowIndex: number) => (
            <tr 
              key={rowIndex} 
              className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              {columns.map((column) => (
                <td 
                  key={column} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {typeof row[column] === 'object' && row[column] !== null ? (
                    <div className="text-blue-600 cursor-pointer hover:underline">
                      {JSON.stringify(row[column], null, 2).substring(0, 50)}...
                    </div>
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
