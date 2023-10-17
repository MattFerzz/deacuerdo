/* eslint-disable no-undef */
import DecisionRoom from '../app/models/DecisionRoom'
import DecisionRoomSettings from '../app/models/DecisionRoomSettings'
import User from '../app/models/User'

describe('DecisionRoom', () => {
  const settings = new DecisionRoomSettings('Fries Toppings', 'Lets decide what to add to our fries', 'Food', 3, 2)
  const room = DecisionRoom.fromSettings(settings)
  const firstUserToAdd = User.named('new')
  const secondtUserToAdd = User.named('new')

  it('should build rooms with autoincremental ids', () => {
    const anotherRoom = DecisionRoom.fromSettings(settings)

    expect(room.identifiedAs(1)).toBeTruthy()
    expect(anotherRoom.identifiedAs(2)).toBeTruthy()
  })

  it('should have a description with rooms id and name', () => {
    expect(room.description()).toBe('1 -> Fries Toppings')
  })

  it('should add users to a selected room', () => {
    room.addUser(firstUserToAdd)
    room.addUser(secondtUserToAdd)

    expect(room.numberOfWaitingUsers()).toBe(2)
  })
})
