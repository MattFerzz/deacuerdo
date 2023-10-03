'use server'

import DecisionHallway from '../models/DecisionHallway'
import DecisionRoom from '../models/DecisionRoom'
import DecisionRoomSettings from '../models/DecisionRoomSettings'

async function addRoomToHallway(formData) {
  const settings = DecisionRoomSettings.fromFormData(formData)
  const room = DecisionRoom.fromSettings(settings)
  DecisionHallway.add(room)
  return room.id()
}

export default addRoomToHallway
