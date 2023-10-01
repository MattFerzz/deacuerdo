'use client'

import { 
    Card, Form, FormGroup,Button
  } from 'react-bootstrap'

  import { useSearchParams } from 'next/navigation'

function SelectionContent() {
  const searchParams = useSearchParams()
 
  const sala = searchParams.get('name')
  const optionsPerUser = Number(searchParams.get('options'))

    return (
        <Card.Body className='text-center'>
        <Card.Title>
          <h2>Bienvenido a la sala {sala}.</h2>
          <h2>Por favor genere su selección.</h2>
        </Card.Title>
        <Form onSubmit={(event) => handleSubmit(event)}>
        {Array.from({ length: optionsPerUser }).map((_, i) => (
          <FormGroup className='mb-3' key={i}>
          <Form.Control placeholder={`Opción ${i + 1}`} id={i} />
          </FormGroup>
        ))
        }
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button>
        </Form>
      </Card.Body>
    )
}


export default SelectionContent