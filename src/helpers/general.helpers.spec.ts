import GeneralHelpers from './general.helpers'

describe('General Helpers', () => {
  it('should generate a number string with 8 characters', () => {
    expect(GeneralHelpers.generateRandomNumberString(8)).toHaveLength(8)
  })
})
