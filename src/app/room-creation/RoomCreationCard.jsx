'use client'

import { useRouter } from 'next/navigation'
import {
  Button,
  Card, Form,
  FormGroup, InputGroup,
} from 'react-bootstrap'
import DecisionRoomSettings from '../models/DecisionRoomSettings'

function RoomCreationCardContent() {
  const router = useRouter()
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = Array.from(event.target.elements).reduce((acc, input) => {
      acc[input.id] = input.value
      return acc
    }, {})
    const settings = DecisionRoomSettings.fromFormData(formData)
    router.push(`/room/${settings.id()}`)
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
        <Button class="btn btn-danger rounded-pill px-3">
          Cancelar
        </Button>
      </Form>
    </Card.Body>

  )
}
export default RoomCreationCardContent
