import RoomWelcomeCardContent from './RoomWelcomeCardContent'

function RoomCardContent({ params }) {
  const { id } = params
  return (
    <RoomWelcomeCardContent id={id} />
  )
}

export default RoomCardContent
