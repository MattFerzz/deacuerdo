class User {
  #name

  constructor(name) {
    this.#name = name
  }

  static named(aName) {
    return new this(aName)
  }

  name() {
    return this.#name
  }
}

export default User
