'use client'

import React, { useState } from 'react'
import {
  Button,
  Card, Form, Modal, Image, Spinner,
} from 'react-bootstrap'
import DecisionRoom from '@/app/models/DecisionRoom'
import CheckboxOption from '@/app/components/CheckBoxOption'
import UserSelection from '@/app/models/UserSelection'
import { useRouter } from 'next/navigation'
import UserVotation from '@/app/models/UserVotation'
import User from '@/app/models/User'

function VotationContent({
  serializedRoom, serializedroomSelection, serializedUser, addVotation,
}) {
  const router = useRouter()
  // const [options,setOptions] = useState([])
  // useEffect(()=>{
  //   setOptions(serializedroomSelection.map(option => {
  //      return UserSelection.deserialize(option)
  //   }))
  // },[serializedroomSelection])
  const room = DecisionRoom.deserialize(serializedRoom)
  const options = serializedroomSelection.map((option) => UserSelection.deserialize(option))
  const user = User.deserialize(serializedUser)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)

      const checkedInputs = Array.from(event.target.elements).filter((input) => input.checked)

      if (checkedInputs.length === 0) {
        setShowModal(true)
        return
      }

      const votes = Array.from(event.target.elements).reduce((acc, input) => {
        if (input.checked) {
          acc.push(UserVotation.fromUserVotationInput(user, room.id(), input.value))
        }
        return acc
      }, [])

      await Promise.all(
        votes.map((vote) => addVotation(vote.serialized())),
      )
      router.push('./waitingForWinner')
    } finally {
      setLoading(false)
    }
  }
  const handleCancel = () => {
    router.push('/')
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <Card.Body>
      <Card.Title>
        <h2>{room.name()}</h2>
      </Card.Title>
      <Form onSubmit={(event) => handleSubmit(event)}>
        {options.map((selection) => (
          <CheckboxOption value={selection.value()} key={selection.value()} />
        ))}
        <div className='container d-flex justify-content-between'>
          <Button className='bbtn btn-danger rounded-pill px-3' type='button' onClick={handleCancel}>
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
      <Modal show={showModal} onHide={handleModalClose} style={{ backgroundColor: 'rgb(234,234,255)' }}>
        <Modal.Header closeButton />
        <Modal.Title style={{ textAlign: 'center' }}>Aviso</Modal.Title>
        <Modal.Body>
          Debes seleccionar al menos una opción antes de continuar.
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src='/deformito.jpg'
              width={150}
              height={150}
              alt='warning gift'
              style={{ marginTop: '10px' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-secondary rounded-pill px-3' variant='primary' onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Card.Body>
  )
}

export default VotationContent
