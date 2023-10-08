'use server'

import DecisionRoom from '../models/DecisionRoom'
import DecisionRoomSettings from '../models/DecisionRoomSettings'
import PersistentDecisionHallway from '../models/PersistentDecisionHallway'

async function addRoomToHallway(formData) {
  const settings = DecisionRoomSettings.fromFormData(formData)
  const room = DecisionRoom.fromSettings(settings)
  const createdRoom = await PersistentDecisionHallway.add(room)
  return createdRoom.id
}

export default addRoomToHallway
