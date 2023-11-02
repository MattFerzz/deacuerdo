'use client'

import DecisionRoom from '@/app/models/DecisionRoom'
/* eslint-disable react/no-array-index-key */

import User from '@/app/models/User'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  Button,
  Card,
} from 'react-bootstrap'

function WaitingForWinnerContent({ serializedUser, waitForWinner, serializedRoom }) {
  const router = useRouter()

  const user = User.deserialize(serializedUser)
  const room = DecisionRoom.deserialize(serializedRoom)

  const handleCancel = () => {
    router.push('/')
  }

  useEffect(() => {
    waitForWinner(room.id(), room.userAmount()).then(() => {
      router.push('./winner')
    })
  })

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>
            {user.name()}
            {', '}
            se esta cerrando la votación.
          </h2>
          <h3>
            En instantes verá la opcion ganadora.
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src='/homer-2.gif'
              width={500}
              height={500}
              alt='Waiting gift'
            />
          </div>
        </Card.Title>
        <Button className='btn btn-danger px-3' type='button' onClick={handleCancel}>
          Abandonar sala
        </Button>
      </Card.Body>
    </Card>
  )
}

export default WaitingForWinnerContent
