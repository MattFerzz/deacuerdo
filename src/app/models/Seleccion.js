class Selection {
  #id;

  #options;

  constructor() {
    // TODO: This is just a mockup, we need to generate a real id and save it in a system
    this.#id = (Math.random() + 1).toString(36).substring(2)
    this.#options = []
  }

  id() {
    return this.#id
  }

  options() {
    return this.#options
  }

  addOption(option) {
    this.#options.push(option)
  }
}

export default Selection
