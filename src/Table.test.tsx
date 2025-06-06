import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import Table from './Table'

describe('Table', () => {
  it('shows no data message when data is empty', () => {
    render(<Table data={[]} />)
    expect(
      screen.getByText(
        'No data available. Please select an endpoint from the button group above.'
      )
    ).toBeInTheDocument()
  })

  it('renders table rows when data is an object', () => {
    const obj = { id: 1, name: 'Alice' }
    render(<Table data={obj} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })
})
