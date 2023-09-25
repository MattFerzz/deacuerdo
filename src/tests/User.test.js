/* eslint-disable no-undef */
import User from '../app/models/User'

describe('DecisionRoom', () => {
  it('should create a new user with given name', () => {
    const user = User.named('Jose Perez')

    expect(user.name()).toBe('Jose Perez')
  })
})
