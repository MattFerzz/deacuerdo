'use client'

/* eslint-disable react/no-array-index-key */

import DecisionRoom from '@/app/models/DecisionRoom'
import User from '@/app/models/User'
import UserSelection from '@/app/models/UserSelection'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card, Form, FormGroup,
} from 'react-bootstrap'

function SelectionContent({ serializedRoom, serializedUser, addSelections }) {
  const router = useRouter()

  const room = DecisionRoom.deserialize(serializedRoom)
  const user = User.deserialize(serializedUser)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const selections = Array.from(event.target.elements).reduce((acc, input) => {
      acc.push(UserSelection.fromUserRoomIdInput(user, room.id(), input.value))
      return acc
    }, [])

    console.log(selections.length)
    await addSelections(selections)

    router.push('./waiting')
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
