/* eslint-disable no-undef */
import DecisionRoom from '../app/models/DecisionRoom'
import DecisionRoomSettings from '../app/models/DecisionRoomSettings'
import User from '../app/models/User'

describe('DecisionRoom', () => {
  const settings = new DecisionRoomSettings('Fries Toppings', 'Lets decide what to add to our fries', 'Food', 3, 2)
  const room = DecisionRoom.fromSettings(settings)
  const firstUserToAdd = User.named('new')
  const secondtUserToAdd = User.named('new')

  it('should have a description with rooms id and name', () => {
    expect(room.description()).toBe('Fries Toppings')
  })

  it('should add users to a selected room', () => {
    room.addUser(firstUserToAdd)
    room.addUser(secondtUserToAdd)

    expect(room.numberOfWaitingUsers()).toBe(2)
  })
})
