import { addRoomToHallway } from '../actions/DecisionHallwayActions'
import RoomCreationCardContent from './RoomCreationCard'

function RoomCreation() {
  return (
    <RoomCreationCardContent addRoomToHallway={addRoomToHallway} />
  )
}

export default RoomCreation
