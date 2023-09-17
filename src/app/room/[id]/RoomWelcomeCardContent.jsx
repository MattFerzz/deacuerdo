'use client'

import { Card } from 'react-bootstrap'

function RoomWelcomeCardContent({ id }) {
  return (
    <Card.Body>
      <Card.Title>
        Bienvenido a la sala
        {' '}
        {id}
      </Card.Title>
    </Card.Body>
  )
}

export default RoomWelcomeCardContent
