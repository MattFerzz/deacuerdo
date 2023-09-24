/* eslint-disable no-undef */
import DecisionRoom from '../app/models/DecisionRoom'
import DecisionRoomSettings from '../app/models/DecisionRoomSettings'

describe('DecisionRoom', () => {
  const settings = new DecisionRoomSettings('Fries Toppings', 'Lets decide what to add to our fries', 'Food', 3, 2)
  const room = DecisionRoom.fromSettings(settings)

  it('should build rooms with autoincremental ids', () => {
    const anotherRoom = DecisionRoom.fromSettings(settings)

    expect(room.identifiedAs(1)).toBeTruthy()
    expect(anotherRoom.identifiedAs(2)).toBeTruthy()
  })

  it('asd', () => {
    expect(room.description()).toBe('1-Fries Toppings')
  })
})
