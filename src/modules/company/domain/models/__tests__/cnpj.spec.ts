import { InvalidDocumentException } from '../../exceptions/invalid-document.exception'
import { CNPJValidator } from '../../validator/cnpj.validator'
import { CNPJ } from '../cnpj'

describe('CNPJ', () => {
  it('should throw InvalidDocumentException for invalid CNPJ', () => {
    const invalidCNPJ = '12345678910111'
    const spy = jest
      .spyOn(CNPJValidator.prototype, 'validate')
      .mockReturnValue(false)

    expect(() => CNPJ.create(invalidCNPJ)).toThrow(InvalidDocumentException)
    expect(spy).toHaveBeenCalledWith(invalidCNPJ)
  })

  it('should throw InvalidDocumentException if CNPJ has no numeric digits', () => {
    const nonNumericCnpj = 'non-numeric-digits'
    const spy = jest
      .spyOn(CNPJValidator.prototype, 'validate')
      .mockReturnValue(false)

    expect(() => CNPJ.create(nonNumericCnpj)).toThrow(InvalidDocumentException)
    expect(spy).toHaveBeenCalledWith('')
  })

  it('should throw InvalidDocumentException if CNPJ has less than 14 numeric digits', () => {
    const invalidCnpj = '12345678910'

    const spy = jest
      .spyOn(CNPJValidator.prototype, 'validate')
      .mockReturnValue(false)

    expect(() => CNPJ.create(invalidCnpj)).toThrow(InvalidDocumentException)
    expect(spy).toHaveBeenCalledWith(invalidCnpj)
  })
})
