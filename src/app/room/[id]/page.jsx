import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
import { addUserToRoom } from '../../actions/DecisionHallwayActions'
import ErrorCardContent from './ErrorCardContent'
import RoomWelcomeCardContent from './RoomWelcomeCardContent'

async function RoomCardContent({ params }) {
  const { id } = params
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

  return (
    <RoomWelcomeCardContent serializedRoom={room.serialized()} addUserToRoom={addUserToRoom} />
  )
}

export default RoomCardContent
