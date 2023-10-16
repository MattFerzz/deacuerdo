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
    const users = aSerializedRoom.users.map((anUser) => User.deserialize(anUser))
    const room = new this(aSerializedRoom.id, settings, users)
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
      users: this.#users.map((anUser) => anUser.serialized()),
    }
  }

  // this.#users.map((elem) => console.log(JSON.stringify(elem.serialized())))
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

  includesUserNamed(anUserName) {
    return this.#users.some((anUser) => anUser.isNamed(anUserName))
  }

  users() {
    return this.#users
  }

  numberOfWaitingUsers() {
    return this.#users.length
  }
}

export default DecisionRoom
