import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
import DecisionRoom from '@/app/models/DecisionRoom'
import ErrorCardContent from '@/app/components/ErrorCardContent'
import UserSelection from '@/app/models/UserSelection'
import { addVotation } from '@/app/actions/DecisionHallwayActions'
import User from '@/app/models/User'
import VotationContent from './votationContent'

async function Votation({ params }) {
  const { id } = params
  const { user } = params

  let room
  try {
    room = await PersistentDecisionHallway.roomAtId(Number(id))
  } catch (error) {
    return (
      <ErrorCardContent>
        Código incorrecto.
        <br />
        Verifique su número de sala
      </ErrorCardContent>
    )
  }

  let roomSelection
  try {
    roomSelection = await PersistentDecisionHallway.getAllSelections(Number(id))
  } catch (error) {
    return (
      <ErrorCardContent>
        No hay opciones relacionadas a esa sala.
        <br />
        Verifique su número de sala
      </ErrorCardContent>
    )
  }

  const userObject = User.named(user)
  const modelRoom = DecisionRoom.fromDAO(room)
  const modelSelection = roomSelection.map((selection) => UserSelection.fromDAO(selection))

  return (
    <VotationContent
      serializedRoom={modelRoom.serialized()}
      serializedUser={userObject.serialized()}
      serializedroomSelection={modelSelection.map((selection) => selection.serialized())}
      addVotation={addVotation}
    />
  )
}

export default Votation
