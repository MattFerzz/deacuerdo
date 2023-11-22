'use client'

/* eslint-disable react/no-array-index-key */

import DecisionRoom from '@/app/models/DecisionRoom'
import User from '@/app/models/User'
import UserSelection from '@/app/models/UserSelection'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
  Card, Form, FormGroup, Spinner,
} from 'react-bootstrap'

function SelectionContent({ serializedRoom, serializedUser, addSelection }) {
  const router = useRouter()

  const room = DecisionRoom.deserialize(serializedRoom)
  const user = User.deserialize(serializedUser)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      const selections = Array.from(event.target.elements).reduce((acc, input) => {
        acc.push(UserSelection.fromUserRoomIdInput(user, room.id(), input.value))
        return acc
      }, [])

      /* await selections.map(
        (selection) => addSelection(selection.serialized()),
      ) */
      await Promise.all(
        selections.map((selection) => addSelection(selection.serialized())),
      )

      router.push('./waiting')
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
        <div className='container d-flex justify-content-between'>
          <Button className='btn btn-danger rounded-pill px-3' type='button' onClick={handleCancel}>
            Abandonar sala
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

export default SelectionContent
