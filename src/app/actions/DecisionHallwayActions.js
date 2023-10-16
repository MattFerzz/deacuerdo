'use server'

import DecisionRoom from '../models/DecisionRoom'
import DecisionRoomSettings from '../models/DecisionRoomSettings'
import PersistentDecisionHallway from '../models/PersistentDecisionHallway'
import User from '../models/User'

async function addRoomToHallway(formData) {
  const settings = DecisionRoomSettings.fromFormData(formData)
  const room = DecisionRoom.fromSettings(settings)
  const createdRoom = await PersistentDecisionHallway.add(room)
  return createdRoom.id
}

// no me gusta mucho estar serializando y deserializando constantemente
// ver posibilidad de ir hacia un modelo totalmente persistido para evitar converciones innecesarias
async function addUserToRoom(serializedUser, serializedRoom) {
  const room = DecisionRoom.deserialize(serializedRoom)
  const user = User.deserialize(serializedUser)
  room.addUser(user)
  const roomToUpdate = await PersistentDecisionHallway.roomAtId(room.id())
  console.log(JSON.stringify(room.users()))
  roomToUpdate.users = room.users()
  return user
}

export { addRoomToHallway, addUserToRoom }
