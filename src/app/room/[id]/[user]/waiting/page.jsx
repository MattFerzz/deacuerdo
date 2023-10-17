import ErrorCardContent from '@/app/components/ErrorCardContent'
import DecisionRoom from '@/app/models/DecisionRoom'
import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
import User from '@/app/models/User'
import WaitingContent from './WaitingContent'

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
  const modelRoom = DecisionRoom.fromDAO(room)

  if (!modelRoom.includesUserNamed(user)) {
    return (
      <ErrorCardContent>
        El usuario no pertenece a la sala.
        <br />
        Verifique el nombre de usuario o unase para poder participar.
      </ErrorCardContent>
    )
  }

  return (
    // eslint-disable-next-line max-len
    <WaitingContent serializedRoom={modelRoom.serialized()} serializedUser={userObject.serialized()} />
  )
}

export default Selection
