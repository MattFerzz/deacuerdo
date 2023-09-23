class DecisionRoomSettings {
  #name;

  #description;

  #category;

  #userAmount;

  #optionsPerUser;

  #id;

  constructor(name, description, category, userAmount, optionsPerUser) {
    this.#name = name
    this.#description = description
    this.#category = category
    this.#userAmount = userAmount
    this.#optionsPerUser = optionsPerUser
    // TODO: This is just a mockup, we need to generate a real id and save it in a system
    this.#id = (Math.random() + 1).toString(36).substring(2)
  }

  static fromFormData(formData) {
    return new DecisionRoomSettings(
      formData.name,
      formData.description,
      formData.category,
      formData['user-amount'],
      formData['options-per-user'],
    )
  }

  name() {
    return this.#name
  }

  description() {
    return this.#description
  }

  category() {
    return this.#category
  }

  userAmount() {
    return this.#userAmount
  }

  optionsPerUser() {
    return this.#optionsPerUser
  }

  id() {
    return this.#id
  }
}

export default DecisionRoomSettings
