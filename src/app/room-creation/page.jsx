import DecisionHallwayActions from '../actions/DecisionHallwayActions'
import RoomCreationCardContent from './RoomCreationCard'

function RoomCreation() {
  return (
    <RoomCreationCardContent addRoomToHallway={DecisionHallwayActions.addRoomToHallway} />
  )
}

export default RoomCreation
