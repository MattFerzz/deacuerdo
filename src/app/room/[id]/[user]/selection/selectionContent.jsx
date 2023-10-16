'use client'

/* eslint-disable react/no-array-index-key */

import { useRouter } from 'next/navigation'
import {
  Button,
  Card, Form, FormGroup,
} from 'react-bootstrap'
import DecisionRoom from '../../../../models/DecisionRoom'

function SelectionContent({ serializedRoom, serializedUser }) {
  const router = useRouter()

  const room = DecisionRoom.deserialize(serializedRoom)

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(`${serializedRoom.id}/${serializedUser.name}/votation`)
  }
  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        <h2>
          Bienvenido
          {' '}
          {serializedUser.name}
          {' '}
          a la sala
          {' '}
          {room.description()}
        </h2>
        <h3>Por favor genere su selección.</h3>
      </Card.Title>
      <Form onSubmit={(event) => handleSubmit(event)}>
        {Array.from({ length: room.optionsPerUser() }).map((_, i) => (
          <FormGroup className='mb-3' key={i}>
            <Form.Control placeholder={`Opción ${i + 1}`} id={i} />
          </FormGroup>
        ))}
        <Button className='btn btn-danger px-3' type='button' onClick={handleCancel}>
          Abandonar sala
        </Button>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
      </Form>
    </Card.Body>
  )
}

export default SelectionContent
