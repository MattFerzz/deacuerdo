/* eslint-disable no-debugger */
class DecisionHallway {
  #rooms

  constructor() {
    this.#rooms = []
  }

  add(aRoom) {
    this.#rooms.push(aRoom)
    console.log('add ', JSON.stringify(this.#rooms))
  }

  includes(aRoom) {
    return this.#rooms.includes(aRoom)
  }

  roomAtId(anId) {
    console.log('get ', JSON.stringify(this.#rooms))
    return this.withRoomAtId(
      anId,
      (roomToReturn) => roomToReturn,
      () => { throw new Error('Room not found') },
    )
  }

  withRoomAtId(anId, foundClosure, noneClosure) {
    const foundRoom = this.#rooms.find(
      (room) => room.identifiedAs(anId),
    )

    return foundRoom ? foundClosure(foundRoom) : noneClosure()
  }
}

export default new DecisionHallway()
