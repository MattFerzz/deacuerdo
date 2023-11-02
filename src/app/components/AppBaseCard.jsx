'use client'

const { Card } = require('react-bootstrap')

function AppBaseCard({ children }) {
  const cardStyles = {
    // minWidth: '40em',
    // minHeight: '10em', min-vh-100
  }
  return (
    <Card className='w-50  h-75' style={cardStyles}>
      { children }
    </Card>

  )
}

export default AppBaseCard
