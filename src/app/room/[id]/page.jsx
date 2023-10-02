import DecisionHallway from '@/app/models/DecisionHallway'
import ErrorCardContent from './ErrorCardContent'
import RoomWelcomeCardContent from './RoomWelcomeCardContent'

function RoomCardContent({ params }) {
  const { id } = params
  let room
  try {
    room = DecisionHallway.getInstance().roomAtId(Number(id))
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
