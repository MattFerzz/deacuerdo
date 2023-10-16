'use client'

const { Card } = require('react-bootstrap')

function ErrorCardContent({ children }) {
  return (
    <Card.Body>
      <Card.Title>
        Ocurrió un error
      </Card.Title>
      <br />
      <h4 style={{ color: 'red', textAlign: 'center' }}>{children}</h4>
    </Card.Body>
  )
}

export default ErrorCardContent
