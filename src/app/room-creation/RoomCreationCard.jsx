'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
  Card, Form,
  FormGroup, InputGroup, Modal, Image, Spinner,
} from 'react-bootstrap'

function RoomCreationCardContent({ addRoomToHallway }) {
  const router = useRouter()
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

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
        const id = await addRoomToHallway(formData)
        router.push(`/room/${id}`)
      }
    } finally {
      setLoading(false)
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src='/deformito2.jpg'
              width={150}
              height={150}
              alt='warning gift'
              style={{ marginTop: '10px' }}
            />
          </div>
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
