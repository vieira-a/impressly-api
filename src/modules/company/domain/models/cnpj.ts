import { InvalidDocumentException } from '../exceptions/invalid-document.exception'
import { CNPJValidator } from '../validator/cnpj.validator'

export class CNPJ {
  private readonly value: string
  private readonly cnpjValidator: CNPJValidator

  constructor(value: string, cnpjValidator: CNPJValidator) {
    this.value = value
    this.cnpjValidator = cnpjValidator
    this.validate()
  }

  public static create(value: string, cnpjValidator: CNPJValidator): CNPJ {
    return new CNPJ(value, cnpjValidator)
  }

  private validate(): void {
    const normalizedCnpj = this.value.replace(/\D/g, '')

    if (!this.cnpjValidator.validate(normalizedCnpj)) {
      throw new InvalidDocumentException(`CNPJ: ${normalizedCnpj}`)
    }
  }
}
