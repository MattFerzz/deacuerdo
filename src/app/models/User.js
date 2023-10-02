class User {
  #name

  constructor(name) {
    this.#name = name
  }

  static deserialize(aSerializedUser) {
    return new this(aSerializedUser.name)
  }

  serialized() {
    return {
      name: this.#name,
    }
  }

  static named(aName) {
    return new this(aName)
  }

  name() {
    return this.#name
  }
}

export default User
