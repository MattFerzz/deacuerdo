import DecisionRoomSettings from './DecisionRoomSettings'

class DecisionRoom {
  #settings

  #users

  static fromSettings(aDecisionRoomSettings) {
    return new this(aDecisionRoomSettings, [])
  }

  static deserialize(aSerializedRoom) {
    const settings = DecisionRoomSettings.deserialize(aSerializedRoom.settings)
    const room = new this(settings, aSerializedRoom.users)
    return room
  }

  constructor(aDecisionRoomSettings, users) {
    this.#settings = aDecisionRoomSettings
    this.#users = users
  }

  serialized() {
    return {
      settings: this.#settings.serialized(),
      users: this.#users.map((user) => user.serialize()),
    }
  }

  settings() {
    return this.#settings
  }

  description() {
    return `${this.#settings.name()}`
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

  users() {
    return this.#users
  }

  numberOfWaitingUsers() {
    return this.#users.length
  }
}

export default DecisionRoom
