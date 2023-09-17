'use client'

import Link from 'next/link'
import {
  Button,
  Card,
  Col,
  Row,
} from 'react-bootstrap'

export default function Home() {
  return (
    <Card.Body className='text-center'>
      <Card.Title><h2>Deacuerdo!</h2></Card.Title>
      <Row className='gy-3'>
        <Col md='12'><Button className='w-50' size='lg' as={Link} href='/room-creation'><b>Crear sala</b></Button></Col>
        <Col md='12'><Button className='w-50' size='lg' as={Link} href='/room-selection'><b>Unirme a una sala</b></Button></Col>
      </Row>
    </Card.Body>
  )
}
