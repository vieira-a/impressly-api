import { InvalidCompanyParamException } from '../../exceptions'
import { ID } from '../id'

describe('ID', () => {
  it('should throw an InvalidCompanyParamException if ID is empty', () => {
    expect(() => ID.from('')).toThrow(InvalidCompanyParamException)
  })

  it('should throw an InvalidCompanyParamException if ID is undefined', () => {
    expect(() => ID.from(undefined as unknown as string)).toThrow(
      InvalidCompanyParamException,
    )
  })

  it('should throw InvalidCompanyParamException if ID is invalid', () => {
    expect(() => ID.from('not-a-uuid')).toThrow(InvalidCompanyParamException)
  })
})
