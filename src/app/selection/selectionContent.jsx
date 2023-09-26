'use client'

import { 
    Card, Form, FormGroup,Button
  } from 'react-bootstrap'

function SelectionContent() {
    return (
        <Card.Body className='text-center'>
        <Card.Title><h2>Crea tu selección</h2></Card.Title>
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