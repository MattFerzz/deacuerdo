import DecisionHallway from '@/app/models/DecisionHallway'
import RoomWelcomeCardContent from './RoomWelcomeCardContent'

function RoomCardContent({ params }) {
  const { id } = params
  const room = DecisionHallway.getInstance().roomAtId(Number(id))
  return (
    <RoomWelcomeCardContent serializedRoom={room.serialized()} />
  )
}

export default RoomCardContent
