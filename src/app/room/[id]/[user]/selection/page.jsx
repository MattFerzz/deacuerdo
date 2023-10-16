import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
import ErrorCardContent from '../../../../components/ErrorCardContent'
import User from '../../../../models/User'
import SelectionContent from './selectionContent'

async function Selection({ params }) {
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
  const userObject = User.named(user)
  room.includes(user)

  return (
    <SelectionContent serializedRoom={room.serialized()} serializedUser={userObject.serialized()} />
  )
}

export default Selection
