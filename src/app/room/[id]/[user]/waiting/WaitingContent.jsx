'use client'

/* eslint-disable react/no-array-index-key */

import DecisionRoom from '@/app/models/DecisionRoom'
import User from '@/app/models/User'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
} from 'react-bootstrap'

function WaitingContent({ serializedRoom, serializedUser }) {
  const router = useRouter()

  const room = DecisionRoom.deserialize(serializedRoom)
  const user = User.deserialize(serializedUser)

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push('./votation')
  }
  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        <h2>
          Esperando que otros usuarios terminen sus selecciones para votar en la sala:
          {' '}
          {room.description()}
        </h2>
        <h3>
          Por favor aguarde
          {' '}
          {user.name()}
          .
        </h3>
        <div>
          <Image
            src='/th-simpsons-homer.gif'
            width={500}
            height={500}
            alt='Waiting gift'
          />
        </div>
      </Card.Title>
      <Button className='btn btn-danger px-3' type='button' onClick={handleCancel}>
        Abandonar sala
      </Button>
      <Button className='float-end' variant='primary' type='submit' onClick={handleSubmit}>
        Continuar
      </Button>
    </Card.Body>
  )
}

export default WaitingContent
