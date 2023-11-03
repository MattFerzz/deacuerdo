'use client'

const { Card } = require('react-bootstrap')

function AppBaseCard({ children }) {
  const cardStyles = {
    overflow: 'auto',
  }
  return (
    <Card className='w-50  h-75' style={cardStyles}>
      { children }
    </Card>

  )
}

export default AppBaseCard
