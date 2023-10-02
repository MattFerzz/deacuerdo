'use client'

import { useRouter } from 'next/navigation'
import {
  Button, Card, Form, FormGroup, ListGroup,
} from 'react-bootstrap'
import DecisionRoom from '@/app/models/DecisionRoom'
import User from '../../models/User'

function RoomWelcomeCardContent({ serializedRoom }) {
  const room = DecisionRoom.deserialize(serializedRoom)
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = Array.from(event.target.elements).reduce((acc, input) => {
      acc[input.id] = input.value
      return acc
    }, {})

    const user = User.named(formData.userName)
    room.addUser(user)
    router.push(`/selection?name=${room.description()}&options=${room.optionsPerUser()}`)
  }

  return (
    <Card.Body>
      <Card.Title>
        Bienvenido a la sala
        {' '}
        {room.description()}
      </Card.Title>
      <Card.Header>Configuraciones de sala</Card.Header>
      <ListGroup flush>
        <ListGroup.Item>{room.name()}</ListGroup.Item>
        <ListGroup.Item>{room.category()}</ListGroup.Item>
        <ListGroup.Item>{room.userAmount()}</ListGroup.Item>
        <ListGroup.Item>{room.optionsPerUser()}</ListGroup.Item>
      </ListGroup>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup className='mb-3'>
          <Form.Label id='userName'>
            Nombre
          </Form.Label>
          <Form.Control placeholder='Ej: Jose Perez' id='userName' />
        </FormGroup>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
      </Form>
    </Card.Body>
  )
}

export default RoomWelcomeCardContent
