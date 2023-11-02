'use client'

import {
  Button, Card,
} from 'react-bootstrap'

import { useRouter } from 'next/navigation'

function WinnerContent({
  winnerOption,
}) {
  const router = useRouter()

  const backgroundColorStyle = {
    backgroundColor: '#01D28E',
    color: 'white',
    fontWeight: 'bold',
  }

  const backgroundSuccess = {
    backgroundColor: '#9EF5CF',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

  }
  const handleHome = () => {
    router.push('/')
  }

  return (

    <Card
      className='w-100 h-100 text-center'
    >
      <Card.Header style={backgroundColorStyle}>DeAcuerdo!</Card.Header>
      <Card.Body style={backgroundSuccess}>
        <Card.Title className='fs-2'>
          LLegamos a un acuerdo
        </Card.Title>
        <Card.Text className='fs-1'>
          La mejor opción es
          {' '}
          {winnerOption}
        </Card.Text>
        <Button variant='primary' type='button' onClick={handleHome}>
          Iniciar nuevamente
        </Button>
      </Card.Body>
      <Card.Footer style={backgroundColorStyle}>DeAcuerdo!</Card.Footer>
    </Card>

  )
}

export default WinnerContent
