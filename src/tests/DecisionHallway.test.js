/* eslint-disable no-undef */
import DecisionHallway from '../app/models/DecisionHallway'
import DecisionRoom from '../app/models/DecisionRoom'
import DecisionRoomSettings from '../app/models/DecisionRoomSettings'

describe('DecisionHallway', () => {
  const settings = new DecisionRoomSettings('Fries Toppings', 'Lets decide what to add to our fries', 'Food', 3, 2)
  const room = DecisionRoom.fromSettings(settings)

  it('should not include a room at beggining', () => {
    const hallwaySystem = new DecisionHallway()

    expect(hallwaySystem.includes(room)).toBeFalsy()
  })

  it('should include a room after adding it', () => {
    const hallwaySystem = new DecisionHallway()
    hallwaySystem.add(room)

    expect(hallwaySystem.includes(room)).toBeTruthy()
  })

  it('should return a room identified with a given id', () => {
    const hallwaySystem = new DecisionHallway()
    hallwaySystem.add(room)

    expect(hallwaySystem.roomAtId(1)).toBe(room)
  })

  it('should thow an error when try to find a room with a given id that does not include', () => {
    const hallwaySystem = new DecisionHallway()

    expect(() => hallwaySystem.roomAtId(0)).toThrow('Room not found')
  })
})
