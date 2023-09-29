'use client'

import { 
    Card, Form, FormGroup,Button
  } from 'react-bootstrap'

  import { useSearchParams } from 'next/navigation'

function SelectionContent() {
  const searchParams = useSearchParams()
 
  const sala = searchParams.get('name')
  const optionsPerUser = searchParams.get('options')

    return (
        <Card.Body className='text-center'>
        <Card.Title><h2>Bienvenido a sala {sala} por favor genere su selección.Introduzca {optionsPerUser} opciones</h2></Card.Title>
        <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup className='mb-3'>
          <Form.Control placeholder='Ej: introducí tu opcion 1' id='opcion1' />
        </FormGroup>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
      </Form>
      </Card.Body>
    )
}


export default SelectionContent