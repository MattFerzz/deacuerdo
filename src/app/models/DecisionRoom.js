class DecisionRoom {
  #id

  #settings

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
  }

  id() {
    return this.#id
  }

  description() {
    return `${this.#id}-${this.#settings.name()}`
  }

  identifiedAs(anId) {
    return this.#id === anId
  }
}

export default DecisionRoom
