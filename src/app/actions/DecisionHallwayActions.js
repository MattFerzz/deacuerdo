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

async function addUserToRoom(serializedUser, serializedRoom) {
  const room = DecisionRoom.deserialize(serializedRoom)
  const user = User.deserialize(serializedUser)
  room.addUser(user)
  const roomToUpdate = await PersistentDecisionHallway.roomAtId(room.id())
  await roomToUpdate.update({ users: room.users().map((anUser) => anUser.serialized()) })
  return user
}

async function addSelections(selections) {
  await PersistentDecisionHallway.addSelections(selections)
  return selections
}

export { addRoomToHallway, addSelections, addUserToRoom }
