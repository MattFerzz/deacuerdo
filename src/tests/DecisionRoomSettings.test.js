/* eslint-disable no-undef */
import DecisionRoomSettings from '../app/models/DecisionRoomSettings'

describe('DecisionRoomSettings', () => {
  const formData = {
    name: 'Fries Toppings',
    description: 'Lets decide what to add to our fries',
    category: 'Food',
    'user-amount': 3,
    'options-per-user': 2,
  }

  it('should create a new instance with the correct properties', () => {
    const settings = new DecisionRoomSettings(
      formData.name,
      formData.description,
      formData.category,
      formData['user-amount'],
      formData['options-per-user'],
    )

    expect(settings.name()).toBe('Fries Toppings')
    expect(settings.description()).toBe('Lets decide what to add to our fries')
    expect(settings.category()).toBe('Food')
    expect(settings.userAmount()).toBe(3)
    expect(settings.optionsPerUser()).toBe(2)
  })

  it('should create a new instance from form data', () => {
    const settings = DecisionRoomSettings.fromFormData(formData)

    expect(settings.name()).toBe('Fries Toppings')
    expect(settings.description()).toBe('Lets decide what to add to our fries')
    expect(settings.category()).toBe('Food')
    expect(settings.userAmount()).toBe(3)
    expect(settings.optionsPerUser()).toBe(2)
  })
})
