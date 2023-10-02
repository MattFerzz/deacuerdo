'use client'

import { useRouter } from 'next/navigation'
import {
  Button, Card, Form, FormGroup,
} from 'react-bootstrap'

function RoomSelectionCardContent() {
  const router = useRouter()
  function handleSubmit(event) {
    event.preventDefault()
    router.push(`/room/${event.target.elements.roomId.value}`)
  }

  return (
    <Card.Body>
      <Card.Title>
        Ingrese el codigo de la sala
      </Card.Title>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup className='mb-3'>
          <Form.Control placeholder='Ej: 2536' id='roomId' />
        </FormGroup>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
      </Form>
    </Card.Body>
  )
}

export default RoomSelectionCardContent
