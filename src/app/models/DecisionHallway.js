class DecisionHallway {
  #rooms

  constructor() {
    this.#rooms = []
  }

  add(aRoom) {
    this.#rooms.push(aRoom)
  }

  includes(aRoom) {
    return this.#rooms.includes(aRoom)
  }

  roomAtId(anId) {
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

    if (foundRoom === undefined) { return noneClosure() }
    return foundClosure(foundRoom)
  }
}

export default DecisionHallway
