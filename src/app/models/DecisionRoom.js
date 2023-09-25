class DecisionRoom {
  #id

  #settings

  #users

  static autoIncrementalId = 0

  static nextId() {
    this.autoIncrementalId += 1
    return this.autoIncrementalId
  }

  static fromSettings(aDecisionRoomSettings) {
    return new this(this.nextId(), aDecisionRoomSettings)
  }

  constructor(anId, aDecisionRoomSettings) {
    this.#id = anId
    this.#settings = aDecisionRoomSettings
    this.#users = []
  }

  id() {
    return this.#id
  }

  description() {
    return `${this.#id}-${this.#settings.name()}`
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

  identifiedAs(anId) {
    return this.#id === anId
  }

  addUser(anUser) {
    this.#users.push(anUser)
  }

  numberOfWaitingUsers() {
    return this.#users.length
  }
}

export default DecisionRoom
