'use client'

const { Card } = require('react-bootstrap')

function AppBaseCard({ children }) {
  return (
    <Card className='w-50 h-75'>
      { children }
    </Card>

  )
}

export default AppBaseCard
