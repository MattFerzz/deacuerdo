'use client'

import DecisionRoom from '@/app/models/DecisionRoom'
import { usePathname, useRouter } from 'next/navigation'
import {
  Button, Card, Form, FormGroup, ListGroup,
} from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import User from '../../models/User'

function RoomWelcomeCardContent({ serializedRoom, addUserToRoom }) {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const room = DecisionRoom.deserialize(serializedRoom)

  const backgroundColorStyle = {
    backgroundColor: '#9696ffb3',
    fontWeight: 'bold',
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = Array.from(event.target.elements).reduce((acc, input) => {
      acc[input.id] = input.value
      return acc
    }, {})

    const user = User.named(formData.userName)
    await addUserToRoom(user.serialized(), room.serialized())
    router.push(`${room.id()}/${user.name()}/selection`)
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        Bienvenido a la sala
        {' '}
        <InputGroup.Text style={backgroundColorStyle}>{`${id}->${room.description()}`}</InputGroup.Text>

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
        <Button className='btn btn-danger rounded-pill px-3' type='button' onClick={handleCancel}>
          Volver
        </Button>
      </Form>
    </Card.Body>
  )
}

export default RoomWelcomeCardContent
