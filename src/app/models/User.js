class User {
  #name

  constructor(name) {
    this.#name = name
  }

  static deserialize(aSerializedUser) {
    return this.named(aSerializedUser.name)
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

  isNamed(anUserName) {
    return this.#name === anUserName
  }
}

export default User
