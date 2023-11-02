import User from './User'

class UserVotation {
  #id

  #user

  #roomId

  #vote

  constructor(id, user, roomId, vote) {
    this.#id = id
    this.#user = user
    this.#roomId = roomId
    this.#vote = vote
  }

  static fromUserVotationInput(user, roomId, userInput) {
    return new this(0, user, roomId, userInput)
  }

  static fromDAO(aDAO) {
    return new this(
      aDAO.id,
      User.named(aDAO.userName),
      aDAO.roomId,
      aDAO.value,
    )
  }

  static deserialize(aSerializedUserVotation) {
    return new this(
      aSerializedUserVotation.id,
      aSerializedUserVotation.user,
      aSerializedUserVotation.roomId,
      aSerializedUserVotation.vote,
    )
  }

  serialized() {
    return {
      id: this.#id,
      user: this.#user.name(),
      roomId: this.#roomId,
      vote: this.#vote,
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

  vote() {
    return this.#vote
  }
}

export default UserVotation
