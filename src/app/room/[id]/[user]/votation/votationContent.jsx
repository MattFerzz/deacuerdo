'use client'

import {
  Card, Form,
} from 'react-bootstrap'
import DecisionRoom from '@/app/models/DecisionRoom'
import CheckboxOption from '@/app/components/CheckBoxOption'
import UserSelection from '@/app/models/UserSelection'

function VotationContent({ serializedRoom, serializedroomSelection }) {
  // const [options,setOptions] = useState([])
  // useEffect(()=>{
  //   setOptions(serializedroomSelection.map(option => {
  //      return UserSelection.deserialize(option)
  //   }))
  // },[serializedroomSelection])
  const room = DecisionRoom.deserialize(serializedRoom)
  const options = serializedroomSelection.map((option) => UserSelection.deserialize(option))

  return (
    <Card.Body>
      <Card.Title>
        <h2>{room.name()}</h2>
      </Card.Title>
      <Form>
        {options.map((selection) => (
          <CheckboxOption label={selection.value()} key={selection.value()} />
        ))}
        {/* <Button className='btn btn-danger px-3' type='button'>
          Abandonar sala
        </Button>
        <Button className='float-end' variant='primary' type='submit'>
          Continuar
        </Button> */}
      </Form>
    </Card.Body>
  )
}

export default VotationContent
