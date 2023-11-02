'use client'

import {
  Button,
  Card, Form,
} from 'react-bootstrap'
import DecisionRoom from '@/app/models/DecisionRoom'
import CheckboxOption from '@/app/components/CheckBoxOption'
import UserSelection from '@/app/models/UserSelection'
import { useRouter } from 'next/navigation'
import UserVotation from '@/app/models/UserVotation'
import User from '@/app/models/User'

function VotationContent({
  serializedRoom, serializedroomSelection, serializedUser, addVotation,
}) {
  const router = useRouter()
  // const [options,setOptions] = useState([])
  // useEffect(()=>{
  //   setOptions(serializedroomSelection.map(option => {
  //      return UserSelection.deserialize(option)
  //   }))
  // },[serializedroomSelection])
  const room = DecisionRoom.deserialize(serializedRoom)
  const options = serializedroomSelection.map((option) => UserSelection.deserialize(option))
  const user = User.deserialize(serializedUser)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const votes = Array.from(event.target.elements).reduce((acc, input) => {
      if (input.checked) {
        acc.push(UserVotation.fromUserVotationInput(user, room.id(), input.value))
      }
      return acc
    }, [])

    await votes.map(
      (vote) => addVotation(vote.serialized()),
    )

    router.push('./waitingForWinner')
  }
  const handleCancel = () => {
    router.push('/')
  }

  return (
    <Card.Body>
      <Card.Title>
        <h2>{room.name()}</h2>
      </Card.Title>
      <Form onSubmit={(event) => handleSubmit(event)}>
        {options.map((selection) => (
          <CheckboxOption value={selection.value()} key={selection.value()} />
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

export default VotationContent
