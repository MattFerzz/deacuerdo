'use client'

import DecisionRoom from '@/app/models/DecisionRoom'
import User from '@/app/models/User'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button, Card, Form, FormGroup, ListGroup, Spinner,
} from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'

function RoomWelcomeCardContent({ serializedRoom, addUserToRoom }) {
  const router = useRouter()
  const room = DecisionRoom.deserialize(serializedRoom)
  const [loading, setLoading] = useState(false)

  const backgroundColorStyle = {
    backgroundColor: '#9696ffb3',
    fontWeight: 'bold',
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const formData = Array.from(event.target.elements).reduce((acc, input) => {
        acc[input.id] = input.value
        return acc
      }, {})

      const user = User.named(formData.userName)
      await addUserToRoom(user.serialized(), room.serialized())
      router.push(`${room.id()}/${user.name()}/selection`)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        Bienvenido a la sala
        {' '}
        <InputGroup.Text style={backgroundColorStyle}>{room.description()}</InputGroup.Text>

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
        <div className='container d-flex justify-content-between'>
          <Button className='btn btn-danger rounded-pill px-3' type='button' onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className='btn btn-primary rounded-pill px-3' type='submit' disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span className='ms-2'>Loading...</span>
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </Form>
    </Card.Body>
  )
}

export default RoomWelcomeCardContent
