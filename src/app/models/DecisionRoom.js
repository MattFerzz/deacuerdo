import DecisionRoomSettings from './DecisionRoomSettings'
import User from './User'

class DecisionRoom {
  #id

  #settings

  #users

  static fromSettings(aDecisionRoomSettings) {
    return new this(0, aDecisionRoomSettings, [])
  }

  static fromDAO(aDAO) {
    return new this(
      aDAO.id,
      DecisionRoomSettings.deserialize(aDAO.settings),
      aDAO.users.map((user) => User.deserialize(user)),
    )
  }

  static deserialize(aSerializedRoom) {
    const settings = DecisionRoomSettings.deserialize(aSerializedRoom.settings)
    const room = new this(aSerializedRoom.id, settings, aSerializedRoom.users)
    return room
  }

  constructor(id, aDecisionRoomSettings, users) {
    this.#id = id
    this.#settings = aDecisionRoomSettings
    this.#users = users
  }

  serialized() {
    return {
      id: this.#id,
      settings: this.#settings.serialized(),
      users: this.#users.map((user) => user.serialize()),
    }
  }

  id() {
    return this.#id
  }

  settings() {
    return this.#settings
  }

  description() {
    return `${this.#id} -> ${this.#settings.name()}`
  }

  name() {
    return this.#settings.name()
  }

  category() {
    return this.#settings.category()
  }

  userAmount() {
    return this.#settings.userAmount()
  }

  optionsPerUser() {
    return this.#settings.optionsPerUser()
  }

  addUser(anUser) {
    this.#users.push(anUser)
  }

  includes(aUser) {
    return this.#users.includes(aUser)
  }

  users() {
    return this.#users
  }

  numberOfWaitingUsers() {
    return this.#users.length
  }
}

export default DecisionRoom
