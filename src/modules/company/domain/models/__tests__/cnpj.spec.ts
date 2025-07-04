import { InvalidDocumentException } from '../../exceptions/invalid-document.exception'
import { CNPJValidator } from '../../validator/cnpj.validator'
import { CNPJ } from '../cnpj'

describe('CNPJ', () => {
  it('should throw InvalidDocumentException for invalid CNPJ', () => {
    const invalidCNPJ = '12345678910111'

    const validateMock = jest.fn().mockReturnValue(false)
    const mockValidator: CNPJValidator = {
      validate: validateMock,
    }

    expect(() => CNPJ.create(invalidCNPJ, mockValidator)).toThrow(
      InvalidDocumentException,
    )
    expect(validateMock).toHaveBeenCalledWith(invalidCNPJ)
  })

  it('should throw InvalidDocumentException if CNPJ has no numeric digits', () => {
    const nonNumericCnpj = 'non-numeric-digits'

    const validateMock = jest.fn().mockReturnValue(false)
    const mockValidator: CNPJValidator = {
      validate: validateMock,
    }

    expect(() => CNPJ.create(nonNumericCnpj, mockValidator)).toThrow(
      InvalidDocumentException,
    )
    expect(validateMock).toHaveBeenCalledWith('')
  })

  it('should throw InvalidDocumentException if CNPJ has less than 14 numeric digits', () => {
    const invalidCnpj = '12345678910'

    const validateMock = jest.fn().mockReturnValue(false)
    const mockValidator: CNPJValidator = {
      validate: validateMock,
    }

    expect(() => CNPJ.create(invalidCnpj, mockValidator)).toThrow(
      InvalidDocumentException,
    )
    expect(validateMock).toHaveBeenCalledWith(invalidCnpj)
  })
})
