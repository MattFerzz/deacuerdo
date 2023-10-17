class UserSelection {
  #id

  #user

  #roomId

  #value

  constructor(id, user, roomId, value) {
    this.#id = id
    this.#user = user
    this.#roomId = roomId
    this.#value = value
  }

  static fromUserRoomIdInput(user, roomId, userInput) {
    return new this(0, user, roomId, userInput)
  }

  static deserialize(aSerializedUserSelection) {
    return new this(
      aSerializedUserSelection.id,
      aSerializedUserSelection.user,
      aSerializedUserSelection.roomId,
      aSerializedUserSelection.value,
    )
  }

  serialized() {
    return {
      id: this.#id,
      user: this.#user.name(),
      roomId: this.#roomId,
      value: this.#value,
    }
  }

  id() {
    return this.#id
  }

  user() {
    return this.#user
  }

  userName() {
    return this.#user.name()
  }

  roomId() {
    return this.#roomId
  }

  value() {
    return this.#value
  }
}

export default UserSelection
