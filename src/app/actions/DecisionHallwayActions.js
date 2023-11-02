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

async function addSelection(serializeSelection) {
  await PersistentDecisionHallway.addSelection(serializeSelection)
  return serializeSelection
}

async function areSelectionsReady(roomID, totalSelections) {
  const selectionsAmount = await PersistentDecisionHallway.countSelectionsIn(roomID)
  return selectionsAmount === totalSelections
}

async function waitForSelections(roomID, totalSelections) {
  return new Promise((resolve) => {
    const checkReady = async () => {
      if (await areSelectionsReady(roomID, totalSelections)) {
        resolve()
      } else {
        setTimeout(checkReady, 15000) // Retry every 15s
      }
    }

    checkReady()
  })
}

async function addVotation(serializedVotation) {
  await PersistentDecisionHallway.addVotation(serializedVotation)
  return serializedVotation
}

async function isWinnerReady(roomID, totalUsers) {
  const diferentselectionsAmount = await PersistentDecisionHallway.countDifferentVotationsIn(roomID)
  return diferentselectionsAmount === totalUsers
}

async function waitForWinner(roomID, totalUsers) {
  return new Promise((resolve) => {
    const checkReady = async () => {
      if (await isWinnerReady(roomID, totalUsers)) {
        resolve()
      } else {
        setTimeout(checkReady, 15000) // Retry every 15s
      }
    }

    checkReady()
  })
}

export {
  addRoomToHallway, addSelection, addUserToRoom, waitForSelections, addVotation, waitForWinner,
}
