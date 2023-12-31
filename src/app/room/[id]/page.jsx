import { addUserToRoom } from '@/app/actions/DecisionHallwayActions'
import ErrorCardContent from '@/app/components/ErrorCardContent'
import DecisionRoom from '@/app/models/DecisionRoom'
import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
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

  const modelRoom = DecisionRoom.fromDAO(room)
  if (modelRoom.full()) {
    return (
      <ErrorCardContent>
        La sala a la que desea ingresar se encuentra llena.
        <br />
        Cree una nueva sala para comenzar
      </ErrorCardContent>
    )
  }

  return (
    <RoomWelcomeCardContent serializedRoom={modelRoom.serialized()} addUserToRoom={addUserToRoom} />
  )
}

export default RoomCardContent
