'use client'

/* eslint-disable react/no-array-index-key */

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Button,
  Card, Form, FormGroup,
} from 'react-bootstrap'

function SelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sala = searchParams.get('name')
  const optionsPerUser = Number(searchParams.get('options'))

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push('/votation')
  }
  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        <h2>
          Bienvenido a la sala
          {' '}
          {'->'}
          {' '}
          {sala}
          .
        </h2>
        <h3>Por favor genere su selección.</h3>
      </Card.Title>
      <Form onSubmit={(event) => handleSubmit(event)}>
        {Array.from({ length: optionsPerUser }).map((_, i) => (
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
