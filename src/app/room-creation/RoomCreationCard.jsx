'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
  Card, Form,
  FormGroup, InputGroup, Modal,
} from 'react-bootstrap'
import DecisionHallway from '../models/DecisionHallway'
import DecisionRoom from '../models/DecisionRoom'
import DecisionRoomSettings from '../models/DecisionRoomSettings'

function RoomCreationCardContent() {
  const router = useRouter()
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = Array.from(event.target.elements).reduce((acc, input) => {
      acc[input.id] = input.value
      return acc
    }, {})

    const userAmount = parseInt(formData['user-amount'], 10)
    const optionsPerUser = parseInt(formData['options-per-user'], 10)

    if (userAmount < 0 || optionsPerUser < 0) {
      setErrorMessage('La cantidad de participantes o de opciones por participante no pueden ser negativas.')
      setErrorModalVisible(true)
    } else {
      const settings = DecisionRoomSettings.fromFormData(formData)
      const room = DecisionRoom.fromSettings(settings)
      DecisionHallway.decisionHallway.add(room)
      router.push(`/room/${room.id()}`)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>Configuración de la sala</Card.Title>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup className='mb-3'>
          <Form.Label id='name'>
            Nombre
          </Form.Label>
          <Form.Control placeholder='Ej: Peli para mirar' id='name' />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label id='category'>
            Categoría
          </Form.Label>
          <Form.Control placeholder='Ej: Entretenimiento' id='category' />
        </FormGroup>
        <FormGroup className='mb-3'>
          <Form.Label id='user-amount'>
            Cantidad de Participantes
          </Form.Label>
          <Form.Control placeholder='Ej: 4' id='user-amount' type='number' />
        </FormGroup>
        <Form.Label>Cantidad de Opciones</Form.Label>
        <InputGroup className='mb-3'>
          <Form.Control id='options-per-user' placeholder='Ej: 5' type='number' />
          <InputGroup.Text id='options-per-user'>
            por participante
          </InputGroup.Text>
        </InputGroup>
        <Button className='float-end rounded-pill px-3' variant='primary' type='submit'>
          Continuar
        </Button>
        <Button className='btn btn-danger rounded-pill px-3' type='button' onClick={handleCancel}>
          Cancelar
        </Button>
      </Form>

      <Modal
        show={errorModalVisible}
        onHide={() => setErrorModalVisible(false)}
        style={{ backgroundColor: 'rgb(234,234,255)' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-secondary rounded-pill px-3' variant='secondary' onClick={() => setErrorModalVisible(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Card.Body>

  )
}
export default RoomCreationCardContent
