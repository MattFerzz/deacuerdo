import DecisionHallway from '@/app/models/DecisionHallway'
import ErrorCardContent from './ErrorCardContent'
import RoomWelcomeCardContent from './RoomWelcomeCardContent'

const hallway = DecisionHallway

function RoomCardContent({ params }) {
  const { id } = params
  let room
  try {
    room = hallway.roomAtId(Number(id))
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
    <RoomWelcomeCardContent serializedRoom={room.serialized()} />
  )
}

export default RoomCardContent
