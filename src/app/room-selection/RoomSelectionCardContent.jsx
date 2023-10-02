'use client'

import Link from 'next/link'
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
          <Form.Label id='roomId'>Código de sala</Form.Label>
          <Form.Control placeholder='1X3S2E' id='roomId' />
        </FormGroup>
        <Button as={Link} href='/' className='float-start' variant='danger'>
          Volver
        </Button>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
      </Form>
    </Card.Body>
  )
}

export default RoomSelectionCardContent
